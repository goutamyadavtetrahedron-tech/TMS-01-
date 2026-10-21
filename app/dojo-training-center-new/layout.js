import Script from "next/script";

export const metadata = {
  title: "Dojo Training Center Setup in India | Lean Skilling & TPS Dojo | Tetrahedron",
  description:
    "India's premier Dojo Training Center engineering firm. Complete 6-zone experiential lean academies, 5-sense sensory simulation rigs, safety dojos, and L1-L4 skill matrices for zero-defect manufacturing.",
  keywords: [
    "Dojo Training Center",
    "Dojo Training Center setup in India",
    "Dojo Setup",
    "Lean Manufacturing Dojo",
    "Safety Dojo",
    "Process Dojo",
    "TPS Dojo Training",
    "5-Sense Industrial Training",
    "Automotive Dojo Training",
    "Tetrahedron Dojo",
  ],
  alternates: {
    canonical: "https://www.tetrahedron.in/dojo-training-center-new",
  },
  openGraph: {
    title: "Dojo Training Center Setup in India | Lean Skilling & TPS Dojo | Tetrahedron",
    description:
      "Cut operator onboarding by 80% and achieve zero-defect manufacturing. Complete 6-zone Dojo Center setup with sensory simulation jigs and L1-L4 skill matrices.",
    url: "https://www.tetrahedron.in/dojo-training-center-new",
    siteName: "Tetrahedron Manufacturing Solutions",
    images: [
      {
        url: "/images/servicesData/dojoherosection.png",
        width: 1200,
        height: 630,
        alt: "Tetrahedron Dojo Training Center Setup",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dojo Training Center Setup | Tetrahedron",
    description:
      "India's leading Dojo Training Center architects. 6-zone blueprints, 5-sense simulation rigs, and ISO/WCM compliant skilling academies.",
    images: ["/images/servicesData/dojoherosection.png"],
  },
};

export default function DojoLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.tetrahedron.in/dojo-training-center-new/#service",
        "name": "Dojo Training Center Design & Setup",
        "provider": {
          "@type": "Organization",
          "name": "Tetrahedron Manufacturing Solutions",
          "url": "https://www.tetrahedron.in",
          "logo": "https://www.tetrahedron.in/assets/images/Tetrahedron%20Logo.png",
        },
        "description":
          "End-to-end establishment of industrial Dojo Training Centers, including 6-zone architectural layouts, 5-sense tactile simulation jigs, safety dojos, SOP standard development, and Train-the-Trainer accreditation.",
        "areaServed": "India & Global",
        "serviceType": "Manufacturing Excellence & Skill Development",
      },
      {
        "@type": "EducationalOccupationalProgram",
        "name": "L1–L4 Industrial Operator Skill Matrix Certification",
        "description":
          "Standardized competency framework covering theoretical knowledge, off-line simulation mastery, supervised line qualification, and autonomous Dojo Master expertise.",
        "provider": {
          "@type": "Organization",
          "name": "Tetrahedron Manufacturing Solutions",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.tetrahedron.in",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://www.tetrahedron.in/services",
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Dojo Training Center",
            "item": "https://www.tetrahedron.in/dojo-training-center-new",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the optimal floor area required to build an industrial Dojo Training Center?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A full-scale Dojo Training Center typically spans 600 to 2,000 sq.ft., accommodating all 6 zones including safety, fundamental 5-sense calibration, assembly, and maintenance. For plants with limited space, Tetrahedron provides modular Mini Dojo pods designed for 150 to 300 sq.ft. directly adjacent to the shopfloor.",
            },
          },
          {
            "@type": "Question",
            "name": "How does Dojo training accelerate operator onboarding compared to traditional OJT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Traditional on-the-job training takes 4 to 6 weeks of line shadowing and generates high initial scrap on saleable parts. In contrast, an experiential Dojo isolates the critical 10-15% of micro-motions into off-line simulation jigs, certifying operators to 100% takt speed in just 5 to 7 days with zero training scrap.",
            },
          },
          {
            "@type": "Question",
            "name": "Are the danger and safety simulations safe for operators?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, 100% safe. All hazard rigs—such as pinch points, electrical static, and LOTO manifolds—are engineered with redundant electronic interlocks, torque limiters, and micro-amperage thresholds calibrated below harm levels to deliver psychological learning with zero physical risk.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the expected return on investment (ROI) timeframe for a Dojo Center?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most manufacturing plants achieve full capital payback within 3 to 6 months through drastic reductions in line scrap, faster new operator ramp-up, lower warranty containment costs, and fewer reportable safety incidents.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="dojo-schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
