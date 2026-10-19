// app/api/blogs/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import cloudinary from '@/lib/cloudinary';

// GET blog by id or slug
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    // Check if id is MongoDB ObjectId or slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    const query = isObjectId ? { _id: id } : { slug: id };

    const blog = await Blog.findOne(query);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Increment view count
    blog.views += 1;
    await blog.save();

    return NextResponse.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching blog' },
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

// PUT update blog by id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const formData = await req.formData();
    const blogDataRaw = formData.get('blogData') || formData.get('json');

    if (!blogDataRaw) {
      return NextResponse.json(
        { success: false, message: 'Missing blog payload to update.', error: 'MISSING_DATA' },
        { status: 400 }
      );
    }

    let blogData: any;
    try {
      blogData = typeof blogDataRaw === 'string' ? JSON.parse(blogDataRaw) : blogDataRaw;
    } catch (parseError: any) {
      return NextResponse.json(
        { success: false, message: `Malformed JSON in update payload: ${parseError.message}`, error: 'INVALID_JSON' },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: `Blog with ID "${id}" not found.`, error: 'NOT_FOUND' },
        { status: 404 }
      );
    }

    // Check if new slug conflicts with another existing blog
    if (blogData.slug && blogData.slug !== blog.slug) {
      const duplicate = await Blog.findOne({ slug: blogData.slug, _id: { $ne: id } });
      if (duplicate) {
        return NextResponse.json(
          {
            success: false,
            message: `A blog with the slug "${blogData.slug}" already exists. Please choose a different URL slug.`,
            error: 'DUPLICATE_SLUG'
          },
          { status: 409 }
        );
      }
    }

    // Handle main image update (file or string)
    const mainImage = formData.get('mainImage') || formData.get('mainImageUrl');
    if (mainImage) {
      if (typeof mainImage === 'string') {
        blogData.image = {
          url: mainImage,
          publicId: '',
          alt: blogData.imageAlt || blogData.title || ''
        };
      } else if (mainImage instanceof File) {
        if (!isImageFile(mainImage)) {
          return NextResponse.json(
            {
              success: false,
              message: `Invalid Featured Cover Image: "${mainImage.name}" is not an image file. Please upload a JPG, PNG, or WebP image.`,
              error: 'INVALID_IMAGE_FILE_TYPE'
            },
            { status: 400 }
          );
        }

        if (!isCloudinaryConfigured()) {
          return NextResponse.json(
            {
              success: false,
              message: `Cannot upload cover image "${mainImage.name}": Cloudinary credentials are not configured in .env.local.`,
              error: 'CLOUDINARY_NOT_CONFIGURED'
            },
            { status: 500 }
          );
        }

        // Delete old image if exists
        if (blog.image?.publicId) {
          try {
            await cloudinary.uploader.destroy(blog.image.publicId);
          } catch (delErr) {
            console.warn('Could not delete old Cloudinary image:', delErr);
          }
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

        blogData.image = {
          url: (uploadResult as any).secure_url,
          publicId: (uploadResult as any).public_id,
          alt: blogData.imageAlt || blogData.title || ''
        };
      }
    }

    // Handle section images (file or string) for each section
    if (Array.isArray(blogData.sections)) {
      for (let i = 0; i < blogData.sections.length; i++) {
        const sectionImage = formData.get(`sectionImage_${i}`) || formData.get(`sectionImageUrl_${i}`);
        if (sectionImage) {
          if (typeof sectionImage === 'string') {
            blogData.sections[i].image = {
              url: sectionImage,
              publicId: '',
              alt: blogData.sections[i].heading || ''
            };
          } else if (sectionImage instanceof File) {
            if (!isImageFile(sectionImage)) {
              return NextResponse.json(
                {
                  success: false,
                  message: `Invalid graphic for Chapter #${i + 1}: "${sectionImage.name}" is not an image file.`,
                  error: 'INVALID_IMAGE_FILE_TYPE'
                },
                { status: 400 }
              );
            }

            if (!isCloudinaryConfigured()) {
              return NextResponse.json(
                {
                  success: false,
                  message: `Cannot upload Chapter #${i + 1} graphic: Cloudinary credentials are not configured in .env.local.`,
                  error: 'CLOUDINARY_NOT_CONFIGURED'
                },
                { status: 500 }
              );
            }

            // Delete old section image if exists
            if (
              blog.sections &&
              blog.sections[i] &&
              blog.sections[i].image &&
              blog.sections[i].image.publicId
            ) {
              try {
                await cloudinary.uploader.destroy(blog.sections[i].image.publicId);
              } catch (delErr) {
                console.warn('Could not delete old section image:', delErr);
              }
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

            blogData.sections[i].image = {
              url: (uploadResult as any).secure_url,
              publicId: (uploadResult as any).public_id,
              alt: blogData.sections[i].heading || ''
            };
          }
        }
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      blogData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog
    });
  } catch (error: any) {
    console.error('❌ [PUT /api/blogs/[id]] Error updating blog:', {
      message: error?.message,
      name: error?.name,
      code: error?.code,
      stack: error?.stack
    });

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: `Duplicate entry error: An article with this slug already exists. Please choose a different slug.`,
          error: 'DUPLICATE_KEY',
          details: error.message
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error?.message || 'Error updating blog',
        error: error?.message || 'Unknown server error',
        details: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE blog by id
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    // Delete images from Cloudinary
    const imagesToDelete = [];

    if (blog.image?.publicId) {
      imagesToDelete.push(blog.image.publicId);
    }

    if (Array.isArray(blog.sections)) {
      blog.sections.forEach((section: any) => {
        if (section.image?.publicId) {
          imagesToDelete.push(section.image.publicId);
        }
      });
    }

    if (imagesToDelete.length > 0) {
      await Promise.all(
        imagesToDelete.map(publicId => cloudinary.uploader.destroy(publicId))
      );
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, message: 'Error deleting blog' },
      { status: 500 }
    );
  }
}
