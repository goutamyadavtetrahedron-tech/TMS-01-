import { consultingPages, skillTrainingData } from "@/lib/servicesData";
import { blogPages } from "@/lib/blogData";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {};
  }

  // 1. Check consultingPages
  const consultingData = consultingPages?.[slug];
  if (consultingData) {
    const title =
      consultingData.metaTitle ||
      (consultingData.title ? `${consultingData.title} | Tetrahedron` : "Tetrahedron");
    const description =
      consultingData.metaDescription ||
      consultingData.bannerDescription ||
      (typeof consultingData.introText === "string" ? consultingData.introText.slice(0, 160) : "") ||
      "Manufacturing Consulting Firm In India";
    const canonical = `https://www.tetrahedron.in/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "Tetrahedron",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  // 2. Check skillTrainingData
  const skillData = skillTrainingData?.[slug];
  if (skillData) {
    const title =
      skillData.metaTitle ||
      (skillData.title ? `${skillData.title} | Tetrahedron` : "Tetrahedron");
    const description =
      skillData.metaDescription ||
      skillData.bannerDescription ||
      (typeof skillData.introText === "string" ? skillData.introText.slice(0, 160) : "") ||
      "Manufacturing Consulting Firm In India";
    const canonical = `https://www.tetrahedron.in/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "Tetrahedron",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  // 3. Check static blogPages
  const blog = blogPages?.[slug];
  if (blog) {
    const title =
      blog.metaTitle || (blog.title ? `${blog.title} | Tetrahedron` : "Tetrahedron Blog");
    const description = blog.metaDescription || blog.excerpt || blog.summary || "Tetrahedron Blog";
    const canonical = `https://www.tetrahedron.in/${slug}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "Tetrahedron",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  }

  return {};
}

export default function SlugLayout({ children }) {
  return children;
}
