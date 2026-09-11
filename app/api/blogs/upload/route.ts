// app/api/blogs/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file uploaded.' },
        { status: 400 }
      );
    }

    // Validate mime type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, message: 'Only image files are allowed.' },
        { status: 400 }
      );
    }

    // Limit size to 15MB
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: 'Image size exceeds 15MB limit.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'blog_uploads/inline',
          transformation: [
            { width: 1400, crop: 'limit', quality: 'auto', fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
    });
  } catch (error: any) {
    console.error('Failed to upload image to Cloudinary:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Image upload failed.' },
      { status: 500 }
    );
  }
}
