import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

// GET blog by slug
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    // Find blog and atomically increment view count without modifying updatedAt
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { timestamps: false, new: true }
    );

    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching blog' },
      { status: 500 }
    );
  }
}
