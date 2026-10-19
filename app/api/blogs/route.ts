// app/api/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from '@/lib/cloudinary';
import { blogValidationSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // If you want to keep filtering, you can keep this logic, but ignore pagination
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    // Build filter object
    const filter: any = {};
    if (status) filter.status = status;
    if (category) filter.category = new RegExp(category, 'i');
    if (featured !== null) filter.featured = featured === 'true';

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { 'sections.heading': { $regex: search, $options: 'i' } }
      ];
    }

    // Fetch all blogs at once (no pagination)
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: blogs,
      totalBlogs: blogs.length
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching blogs' },
      { status: 500 }
    );
  }
}

function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

function isImageFile(file: File): boolean {
  if (file.type && file.type.startsWith('image/')) return true;
  const ext = file.name ? file.name.split('.').pop()?.toLowerCase() : '';
  return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'avif'].includes(ext || '');
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const blogDataRaw = formData.get('blogData') || formData.get('json');

    if (!blogDataRaw) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing blog payload. Neither "blogData" nor "json" field was provided.',
          error: 'MISSING_BLOG_DATA'
        },
        { status: 400 }
      );
    }

    let blogData: any;
    try {
      blogData = typeof blogDataRaw === 'string' ? JSON.parse(blogDataRaw) : blogDataRaw;
    } catch (parseError: any) {
      return NextResponse.json(
        {
          success: false,
          message: `Malformed JSON in blogData: ${parseError.message}`,
          error: 'INVALID_JSON_PAYLOAD'
        },
        { status: 400 }
      );
    }

    // Validate blog data
    const { error, value } = blogValidationSchema.validate(blogData);
    if (error) {
      console.warn('⚠️ Validation failed for new blog:', error.details[0].message);
      return NextResponse.json(
        {
          success: false,
          message: `Validation Error: ${error.details[0].message}`,
          details: error.details.map(d => d.message),
          error: 'VALIDATION_FAILED'
        },
        { status: 400 }
      );
    }

    // Check for duplicate URL slug before proceeding
    if (value.slug) {
      const existingBlog = await Blog.findOne({ slug: value.slug });
      if (existingBlog) {
        return NextResponse.json(
          {
            success: false,
            message: `A blog post with the URL slug "${value.slug}" already exists. Please customize the slug to make it unique.`,
            error: 'DUPLICATE_SLUG'
          },
          { status: 409 }
        );
      }
    }

    // Handle main image upload or string
    const mainImage = formData.get('mainImage') || formData.get('mainImageUrl');
    if (mainImage) {
      if (typeof mainImage === 'string') {
        value.image = {
          url: mainImage,
          publicId: '',
          alt: value.imageAlt || value.title || ''
        };
      } else if (mainImage instanceof File) {
        // Validate that uploaded file is an image
        if (!isImageFile(mainImage)) {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid Featured Cover Image: "${mainImage.name}" is not an image file (detected type: ${mainImage.type || 'unknown'}). Please upload a JPG, PNG, or WebP image instead of a .${mainImage.name.split('.').pop() || 'non-image'} file.`,
              error: 'INVALID_IMAGE_FILE_TYPE'
            },
            { status: 400 }
          );
        }

        // Validate Cloudinary environment configuration
        if (!isCloudinaryConfigured()) {
          console.error('❌ Cloudinary upload requested but credentials are missing in environment variables.');
          return NextResponse.json(
            {
              success: false,
              message: `Cannot upload cover image "${mainImage.name}": Cloudinary credentials (NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are missing or blank in .env.local.`,
              error: 'CLOUDINARY_NOT_CONFIGURED',
              hint: 'Fill in your Cloudinary keys in .env.local, or select an existing image from the Media Library.'
            },
            { status: 500 }
          );
        }

        const bytes = await mainImage.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'blog_uploads',
              transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }]
            },
            (err, result) => {
              if (err) {
                console.error('❌ Cloudinary stream upload error for cover image:', err);
                reject(err);
              } else {
                resolve(result);
              }
            }
          ).end(buffer);
        }).catch((err: any) => {
          throw new Error(`Cloudinary upload failed for cover image "${mainImage.name}": ${err?.message || JSON.stringify(err)}`);
        });

        value.image = {
          url: (uploadResult as any).secure_url,
          publicId: (uploadResult as any).public_id,
          alt: value.imageAlt || value.title || ''
        };
      }
    }

    // Handle section images (File or string)
    if (Array.isArray(value.sections)) {
      for (let i = 0; i < value.sections.length; i++) {
        const sectionImage = formData.get(`sectionImage_${i}`) || formData.get(`sectionImageUrl_${i}`);
        if (sectionImage) {
          if (typeof sectionImage === 'string') {
            value.sections[i].image = {
              url: sectionImage,
              publicId: '',
              alt: value.sections[i].heading || ''
            };
          } else if (sectionImage instanceof File) {
            if (!isImageFile(sectionImage)) {
              return NextResponse.json(
                {
                  success: false,
                  message: `Invalid graphic for Chapter #${i + 1}: "${sectionImage.name}" is not an image file. Please upload a JPG, PNG, or WebP image.`,
                  error: 'INVALID_IMAGE_FILE_TYPE'
                },
                { status: 400 }
              );
            }

            if (!isCloudinaryConfigured()) {
              return NextResponse.json(
                {
                  success: false,
                  message: `Cannot upload Chapter #${i + 1} graphic "${sectionImage.name}": Cloudinary credentials are missing in .env.local.`,
                  error: 'CLOUDINARY_NOT_CONFIGURED'
                },
                { status: 500 }
              );
            }

            const bytes = await sectionImage.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                {
                  folder: 'blog_uploads/sections',
                  transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }]
                },
                (err, result) => {
                  if (err) {
                    console.error(`❌ Cloudinary error for Chapter #${i + 1}:`, err);
                    reject(err);
                  } else {
                    resolve(result);
                  }
                }
              ).end(buffer);
            }).catch((err: any) => {
              throw new Error(`Cloudinary upload failed for Chapter #${i + 1} graphic "${sectionImage.name}": ${err?.message || JSON.stringify(err)}`);
            });

            value.sections[i].image = {
              url: (uploadResult as any).secure_url,
              publicId: (uploadResult as any).public_id,
              alt: value.sections[i].heading || ''
            };
          }
        }
      }
    }

    const blog = await Blog.create(value);

    return NextResponse.json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    }, { status: 201 });
  } catch (error: any) {
    console.error('❌ [POST /api/blogs] Error creating blog:', {
      message: error?.message,
      name: error?.name,
      code: error?.code,
      keyPattern: error?.keyPattern,
      keyValue: error?.keyValue,
      stack: error?.stack,
    });

    if (error?.code === 11000) {
      const field = error?.keyPattern ? Object.keys(error.keyPattern)[0] : 'field';
      const val = error?.keyValue ? error.keyValue[field] : '';
      return NextResponse.json(
        {
          success: false,
          message: `Duplicate entry error: An article with ${field} "${val}" already exists. Please choose a unique value.`,
          error: 'DUPLICATE_KEY',
          details: error.message
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Error creating blog',
        error: error?.message || 'Unknown server error',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}
