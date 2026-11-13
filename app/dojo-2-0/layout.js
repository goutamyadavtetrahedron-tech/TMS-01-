import Script from "next/script";

export const metadata = {
  title: "DOJO 2.0 Setup in India | Smart Workforce & Digital Training | Tetrahedron",
  description:
    "Transform workforce capabilities with DOJO 2.0. Complete 4-pillar digital academies featuring AR/VR simulations, advanced manpower planning, and real-time management dashboards.",
  keywords: [
    "DOJO 2.0",
    "DOJO 2.0 Setup",
    "DOJO 2.0 Training Center",
    "Digital DOJO",
    "Maruti Suzuki DOJO 2.0",
    "Industry 4.0 Training",
    "AR VR Industrial Training",
    "Digital Skill Matrix",
    "Advanced Manpower Planning",
    "Management Review Dashboards",
    "Tetrahedron DOJO 2.0",
  ],
  alternates: {
    canonical: "https://www.tetrahedron.in/dojo-2-0",
  },
  openGraph: {
    title: "DOJO 2.0 Setup in India | Smart Workforce & Digital Training | Tetrahedron",
    description:
      "Transform workforce capabilities with DOJO 2.0. Complete 4-pillar digital academies featuring AR/VR simulations, advanced manpower planning, and real-time management dashboards.",
    url: "https://www.tetrahedron.in/dojo-2-0",
    siteName: "Tetrahedron Manufacturing Solutions",
    images: [
      {
        url: "/images/dojo/dojo-2-hero-banner-clean.png",
        width: 1200,
        height: 630,
        alt: "Tetrahedron DOJO 2.0 Digital Training Ecosystem",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOJO 2.0 Setup | Tetrahedron",
    description:
      "India's leading DOJO 2.0 engineering partner. 4-pillar architecture, AR/VR simulations, digital skill matrices, and live management dashboards.",
    images: ["/images/dojo/dojo-2-hero-banner-clean.png"],
  },
};

export default function Dojo2Layout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://www.tetrahedron.in/dojo-2-0/#service",
        "name": "DOJO 2.0 Design & Digital Setup",
        "provider": {
          "@type": "Organization",
          "name": "Tetrahedron Manufacturing Solutions",
          "url": "https://www.tetrahedron.in",
          "logo": "https://www.tetrahedron.in/assets/images/Tetrahedron%20Logo.png",
        },
        "description":
          "End-to-end establishment of Industry 4.0 compliant DOJO 2.0 training centers, including Advanced Manpower Planning, Process-Specific Physical Rigs, AR/VR Interactive Simulations, and Live Management Review Dashboards.",
        "areaServed": "India & Global",
        "serviceType": "Smart Manufacturing & Digital Workforce Excellence",
      },
      {
        "@type": "EducationalOccupationalProgram",
        "name": "DOJO 2.0 Digital Skill Matrix & Competency Certification",
        "description":
          "Standardized competency framework covering theoretical knowledge, process-specific simulation, digital assessment tracking, and live audit qualification.",
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
            "name": "DOJO 2.0",
            "item": "https://www.tetrahedron.in/dojo-2-0",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is DOJO 2.0 and what are its four pillars?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "DOJO 2.0 combines practical training with workforce planning, digital learning, competency tracking, and management dashboards to improve employee skills and shop-floor performance. Adopted as a compliance requirement by Maruti Suzuki and leading OEMs, its four pillars are: 1) Advanced Manpower Planning, 2) Process-Specific DOJO Training, 3) Digital Tools & AR/VR Applications, and 4) Management Review Dashboards.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the difference between DOJO and DOJO 2.0?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A traditional DOJO focuses on practical, hands-on employee training through physical simulators, manual tracking, and standardized activities. DOJO 2.0 extends this by integrating Advanced Manpower Planning, Process-Specific Training, Digital Tools and AR/VR Applications, and Live Management Review Dashboards to support real-time competency tracking and data-driven workforce development.",
            },
          },
          {
            "@type": "Question",
            "name": "Is it compulsory to have AR/VR or digital tools in a DOJO Centre?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. AR/VR and digital tools are not mandatory for every DOJO Centre unless specified in the client's or OEM's compliance guidelines. A DOJO can be established with physical simulators and training boards, with digital solutions and AR/VR added according to client requirements, training objectives, and budget.",
            },
          },
          {
            "@type": "Question",
            "name": "What are Advanced Manpower Planning and Management Review Dashboards in DOJO 2.0?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "These are digital dashboards displayed on screens inside the DOJO Centre, showing real data on workforce availability, absenteeism, skill gaps, and skill evaluations. Management Review Dashboards track customer defects, internal rejections, training plan adherence, and improvement actions to support better decision-making and continuous improvement.",
            },
          },
          {
            "@type": "Question",
            "name": "What is a Digital Skill Evaluation System?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Digital Skill Evaluation System is a software tool for recording, evaluating, and monitoring employee competencies through digital assessments, practical evaluation checklists, and digital skill matrices. It identifies competency gaps, tracks employee progress, plans training interventions, and maintains auditable training records for management review.",
            },
          },
          {
            "@type": "Question",
            "name": "Is VR-based training effective for manufacturing operations?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. VR training allows trainees to perform operations themselves in an immersive virtual environment, practicing complex or hazardous processes (such as robotic welding, spray painting, leak testing, and fire safety) that are difficult or risky to develop on active lines, accelerating muscle memory before shop-floor deployment.",
            },
          },
          {
            "@type": "Question",
            "name": "Can an existing DOJO Centre be upgraded to DOJO 2.0?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. An existing DOJO Centre can be assessed and upgraded in phases by integrating digital skill evaluation software, competency tracking, Advanced Manpower Planning dashboards, and AR/VR simulation modules. The upgrade plan is tailored to the existing facility layout and implementation priorities.",
            },
          },
          {
            "@type": "Question",
            "name": "What is the cost and timeline for setting up a DOJO 2.0 Centre?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tetrahedron offers customized DOJO solutions starting from ₹2 lakh onwards, with the final cost depending on the modules, hardware simulators, level of customization, and digital/AR-VR integration. Commissioning typically spans 6 to 10 weeks depending on custom simulation fabrication and software integration.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <Script
        id="dojo-2-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
