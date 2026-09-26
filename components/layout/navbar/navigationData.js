export const navigationData = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About Us",
    href: "/about-us/",
    children: [
      {
        title: "Who We Are",
        href: "/about-us/",
        description: "India's premier manufacturing and operational excellence consulting firm.",
      },
      {
        title: "Our Leaders",
        href: "/our-team/",
        description: "Executive leadership guiding industrial transformation.",
      },
      {
        title: "Policies",
        href: "/privacy-policy/",
        description: "Our standards of privacy, compliance, and governance.",
        subChildren: [
          { title: "Privacy Policy", href: "/privacy-policy/" },
          { title: "Terms of Service", href: "/terms-of-service/" },
        ],
      },
    ],
  },
  {
    title: "Consulting",
    href: "/manufacturing-operational-excellence-consulting/",
    isMegaMenu: true,
    tagline: "End-to-end operational excellence, smart factory digitization & ISO systems.",
    highlight: {
      tag: "FLAGSHIP PROGRAM",
      title: "Manufacturing Operational Excellence",
      description: "Deliver 20-35% operational cost reduction, eliminate bottlenecks, and achieve zero-breakdown shopfloors.",
      href: "/manufacturing-operational-excellence-consulting/",
      ctaText: "Explore Methodology",
    },
    categories: [
      {
        title: "Manufacturing Excellence Services",
        href: "/manufacturing-operational-excellence-consulting/",
        icon: "Factory",
        badge: "Productivity & Turnaround",
        items: [
          {
            title: "Operational Excellence",
            href: "/manufacturing-operational-excellence-consulting/",
            description: "Productivity, OEE, & shopfloor turnaround",
          },
          {
            title: "TPM Consulting",
            href: "/tpm-consultants/",
            description: "Total Productive Maintenance for zero downtime",
          },
          {
            title: "TQM Consulting",
            href: "/tqm-consultants/",
            description: "Total Quality Management for zero defects",
          },
          {
            title: "Lean Manufacturing",
            href: "/lean-manufacturing-consultants/",
            description: "Value stream mapping & waste elimination",
          },
          {
            title: "Cost Reduction Consulting",
            href: "/manufacturing-excellence/",
            description: "Targeted operational & material cost reduction",
          },
          {
            title: "Visual Management",
            href: "/visual-management-consultants/",
            description: "5S visual controls & KPI tracking systems",
          },
        ],
      },
      {
        title: "Plant Engineering & DOJO Centers",
        href: "/plant-layout-design/",
        icon: "Compass",
        badge: "Facility & Experiential Labs",
        items: [
          {
            title: "Plant Layout Design",
            href: "/plant-layout-design/",
            description: "End-to-end plant design & simulation",
          },
          {
            title: "Lean Plant Layout Design",
            href: "/lean-plant-layout-design/",
            description: "Space & material flow optimization",
          },
          {
            title: "DOJO Training Center",
            href: "/dojo-training-center/",
            description: "Physical & simulated skill development",
          },
          {
            title: "DOJO 2.0 Experiential Lab",
            href: "/dojo-2-0/",
            description: "Next-gen experiential training labs",
          },
          {
            title: "Mini DOJO Modular Stations",
            href: "/mini-dojo-training-center/",
            description: "Compact on-site modular stations",
          },
        ],
      },
      {
        title: "Digitization & Smart Factory",
        href: "/digitization/",
        icon: "Cpu",
        badge: "Industry 4.0 & Automation",
        items: [
          {
            title: "Digitization & IIoT",
            href: "/digitization/",
            description: "Industrial transformation & connected IoT",
          },
          {
            title: "Smart Factory Setup",
            href: "/smart-factory/",
            description: "Connected manufacturing plant & automation",
          },
          {
            title: "AR & VR in Manufacturing",
            href: "/augmented-reality-virtual-reality/",
            description: "Augmented & virtual reality solutions",
          },
          {
            title: "Energy Cost Reduction",
            href: "/energy-audit-and-efficiency-services/",
            description: "Comprehensive industrial energy audits",
          },
        ],
      },
      {
        title: "ISO Standards & Certifications",
        href: "/iso-certification-consultants",
        icon: "Award",
        badge: "Compliance & Audits",
        items: [
          {
            title: "ISO Implementation Overview",
            href: "/iso-certification-consultants",
            description: "End-to-end certification consulting",
          },
          {
            title: "ISO 9001:2015 (QMS)",
            href: "/iso-9001-qms/",
            description: "Quality Management System",
          },
          {
            title: "ISO 45001 (Safety)",
            href: "/iso-45001-consultancy/",
            description: "Occupational health and safety",
          },
          {
            title: "ISO 50001 EnMS (Energy)",
            href: "/iso-50001-enms/",
            description: "Energy Management System",
          },
          {
            title: "ISO 14001:2015 (EMS)",
            href: "/?page_id=23985",
            description: "Environmental Management System",
          },
          {
            title: "ISO 31000:2018 (ERM)",
            href: "/?page_id=25434",
            description: "Enterprise Risk Management",
          },
        ],
      },
    ],
  },
  {
    title: "Skill Training",
    href: "/corporate-training-companies/",
    isMegaMenu: true,
    tagline: "Certified, hands-on industrial and executive training programs delivering measurable capability building.",
    highlight: {
      tag: "CORPORATE TRAINING",
      title: "Corporate Training Course In India",
      description: "Over 50,000+ professionals trained across 300+ leading manufacturing enterprises in India.",
      href: "/corporate-training-companies/",
      ctaText: "View Training Catalogue",
    },
    categories: [
      {
        title: "Technical Training Courses",
        href: "/corporate-training-companies/technical-trainings/",
        icon: "Wrench",
        badge: "Quality & Engineering",
        items: [
          {
            title: "APQP Certification",
            href: "/corporate-training-companies/technical-trainings/advanced-product-quality-planning/",
            description: "Advanced Product Quality Planning",
          },
          {
            title: "DFMEA Training",
            href: "/corporate-training-companies/technical-trainings/design-fmea/",
            description: "Design Failure Mode & Effects Analysis",
          },
          {
            title: "PFMEA Training",
            href: "/corporate-training-companies/technical-trainings/process-failure-mode-effect-analysis-pfmea/",
            description: "Process Failure Mode & Effects Analysis",
          },
          {
            title: "SPC Training",
            href: "/corporate-training-companies/technical-trainings/statistical-process-control/",
            description: "Statistical Process Control & Capability",
          },
          {
            title: "MSA Training",
            href: "/corporate-training-companies/technical-trainings/measurement-system-analysis-msa/",
            description: "Measurement System Analysis & GR&R",
          },
          {
            title: "GD&T Fundamentals",
            href: "/corporate-training-companies/technical-trainings/geometric-dimensioning-and-tolerancing/",
            description: "Geometric Dimensioning & Tolerancing",
          },
          {
            title: "Advanced GD&T",
            href: "/corporate-training-companies/technical-trainings/advanced-gd-and-t-training/",
            description: "Complex datum & tolerance calculations",
          },
          {
            title: "Inventory Management",
            href: "/corporate-training-companies/technical-trainings/inventory-management/",
            description: "Lean stock control & inventory flow",
          },
          {
            title: "PPAP Certification",
            href: "/corporate-training-companies/technical-trainings/production-part-approval-process/",
            description: "Production Part Approval Process",
          },
          {
            title: "Industry 4.0 Training",
            href: "/corporate-training-companies/technical-trainings/industry-4-0-courses/",
            description: "Smart factory & industrial IoT systems",
          },
          {
            title: "Industry 5.0 in Mfg",
            href: "/corporate-training-companies/technical-trainings/industry-5-0/",
            description: "Human-centric AI & sustainability",
          },
          {
            title: "Virtual Reality (VR)",
            href: "/corporate-training-companies/technical-trainings/virtual-reality/",
            description: "Immersive shopfloor & DOJO simulations",
          },
          {
            title: "DOE Methodology",
            href: "/corporate-training-companies/technical-trainings/design-of-experiment/",
            description: "Design of Experiments for optimization",
          },
          {
            title: "EV Engineering",
            href: "/corporate-training-companies/technical-trainings/electric-vehicle/",
            description: "Electric vehicle powertrain & architectures",
          },
          {
            title: "Design For Quality (DFQ)",
            href: "/corporate-training-companies/technical-trainings/design-for-quality-training/",
            description: "Robust engineering design principles",
          },
          {
            title: "OEE Calculation & Action",
            href: "/corporate-training-companies/technical-trainings/oee-calculation-and-improvement-action/",
            description: "Overall Equipment Effectiveness improvement",
          },
          {
            title: "TPM Manufacturing",
            href: "/corporate-training-companies/technical-trainings/total-productive-maintenance-course-tpm/",
            description: "Total Productive Maintenance implementation",
          },
          {
            title: "UL 60335-2-40 Standard",
            href: "/ul-60335-2-40-csa-training-harmonised-iec-standard/",
            description: "Harmonized IEC safety certification",
          },
          {
            title: "UL 508A Industrial Panels",
            href: "/ul-508a-training/",
            description: "Control panel electrical safety codes",
          },
        ],
      },
      {
        title: "Process Improvement Training Courses",
        href: "/corporate-training-companies/process-improvement-training-courses/",
        icon: "TrendingUp",
        badge: "Lean & Productivity",
        items: [
          {
            title: "7 New QC Tools",
            href: "/corporate-training-companies/process-improvement-training-courses/7-new-qctools/",
            description: "Management & planning problem-solving tools",
          },
          {
            title: "Root Cause Analysis (RCA)",
            href: "/corporate-training-companies/process-improvement-training-courses/root-cause-analysis/",
            description: "Systematic CAPA & breakdown analysis",
          },
          {
            title: "5S Safety & Workplace",
            href: "/corporate-training-companies/process-improvement-training-courses/5s-training-program/",
            description: "Visual housekeeping & standardized work",
          },
          {
            title: "Kaizen Certification",
            href: "/corporate-training-companies/process-improvement-training-courses/kaizen-training-program/",
            description: "Continuous incremental improvement practices",
          },
          {
            title: "Line Balancing",
            href: "/corporate-training-companies/process-improvement-training-courses/line-balancing/",
            description: "Cycle time reduction & bottleneck removal",
          },
          {
            title: "Value Engineering (VA/VE)",
            href: "/corporate-training-companies/process-improvement-training-courses/value-engineering-value-analysis/",
            description: "Function analysis & cost optimization",
          },
          {
            title: "Cost Reduction Strategies",
            href: "/corporate-training-companies/process-improvement-training-courses/cost-reduction-strategies/",
            description: "Manufacturing OPEX & material optimization",
          },
          {
            title: "Lean Cost Reduction",
            href: "/corporate-training-companies/process-improvement-training-courses/cost-reduction-by-lean-manufacturing/",
            description: "Eliminating the 8 operational wastes",
          },
          {
            title: "Low-Cost Automation (LCA)",
            href: "/corporate-training-companies/process-improvement-training-courses/simple-low-cost-automation/",
            description: "Karakuri & affordable shopfloor mechanics",
          },
          {
            title: "5-Why & Fishbone",
            href: "/corporate-training-companies/process-improvement-training-courses/why-why-analysis-fish-born-5-why-training/",
            description: "Ishikawa cause-and-effect problem solving",
          },
          {
            title: "TQM Implementation",
            href: "/corporate-training-companies/process-improvement-training-courses/total-quality-management-tqm/",
            description: "Total Quality Management for zero defects",
          },
          {
            title: "Performance Management",
            href: "/corporate-training-companies/process-improvement-training-courses/performance-management-and-improvement-plan/",
            description: "Shopfloor KPI & PIP improvement systems",
          },
          {
            title: "Quality Control System",
            href: "/?page_id=12632",
            description: "End-to-end inspection & QA architecture",
          },
        ],
      },
      {
        title: "Strategic Management and Training Consultants",
        href: "/corporate-training-companies/strategic-training/",
        icon: "Target",
        badge: "Strategy & Management",
        items: [
          {
            title: "ESG Certification",
            href: "/corporate-training-companies/strategic-training/esg-certification-training/",
            description: "Environmental, Social & Governance compliance",
          },
          {
            title: "Daily Work Management (DWM)",
            href: "/corporate-training-companies/strategic-training/daily-work-management/",
            description: "Shopfloor daily tier meetings & routines",
          },
          {
            title: "Design Thinking Course",
            href: "/corporate-training-companies/strategic-training/design-thinking/",
            description: "User-centric industrial innovation framework",
          },
          {
            title: "TRIZ Problem Solving",
            href: "/corporate-training-companies/strategic-training/theory-of-inventive-problem-solving/",
            description: "Theory of Inventive Problem Solving matrix",
          },
          {
            title: "Balanced Scorecard",
            href: "/corporate-training-companies/strategic-training/balance-score-card/",
            description: "Strategic KPI cascading & alignment",
          },
          {
            title: "Finance for Non-Finance",
            href: "/corporate-training-companies/strategic-training/finance-for-non-finance-manager/",
            description: "Budgeting, OPEX, CAPEX & P&L for engineers",
          },
          {
            title: "World Class Mfg (WCM)",
            href: "/corporate-training-companies/strategic-training/world-class-manufacturing/",
            description: "10 technical & managerial pillars of excellence",
          },
          {
            title: "Competency Mapping",
            href: "/corporate-training-companies/strategic-training/competency-mapping/",
            description: "Skill matrix development & gap assessment",
          },
          {
            title: "Productivity Skill Mapping",
            href: "/corporate-training-companies/strategic-training/productivity-focus-skill-mapping/",
            description: "Multi-skilling & technician matrices",
          },
          {
            title: "DWM & Time Management",
            href: "/dwm-and-time-management-techniques/",
            description: "Executive prioritization & daily execution",
          },
        ],
      },
      {
        title: "Behavioural Training",
        href: "/corporate-training-companies/behavioural-training/",
        icon: "Users",
        badge: "Leadership & Soft Skills",
        items: [
          {
            title: "Art of Delegation",
            href: "/corporate-training-companies/behavioural-training/art-of-delegation-training/",
            description: "Managerial empowerment & accountability",
          },
          {
            title: "Team & Time Management",
            href: "/corporate-training-companies/behavioural-training/team-time-and-task-management/",
            description: "Task scheduling & productivity optimization",
          },
          {
            title: "Team Development",
            href: "/corporate-training-companies/behavioural-training/team-development-motivation/",
            description: "Workforce motivation & leadership culture",
          },
          {
            title: "Presentation Skills",
            href: "/?page_id=12379",
            description: "High-impact executive & shopfloor presentations",
          },
          {
            title: "Planning & Prioritization",
            href: "/corporate-training-companies/behavioural-training/planning-and-prioritization-skill/",
            description: "Urgent vs Important decision frameworks",
          },
          {
            title: "Non Verbal Communication",
            href: "/?page_id=13155",
            description: "Body language & interpersonal workplace skills",
          },
        ],
      },
    ],
  },
  {
    title: "AMR/AGV/RGV",
    href: "/automated-guided-vehicle-manufacturers/",
    description: "Leading AGV, AMR, RGV & REGV Manufacturer in India engineered for flexible shopfloor intralogistics.",
  },
  {
    title: "Career",
    href: "/career/",
  },
  {
    title: "Case Studies",
    href: "/case-studies/",
  },
  {
    title: "Blogs",
    href: "/blog/",
  },
  {
    title: "Contact Us",
    href: "/contact-us/",
  },
];

export const contactInfo = {
  phone: "+91-8984189814",
  phoneDisplay: "+91-8984189814",
  email: "marketing@tetrahedron.in",
  socials: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/TetrahedronManufacturingServices",
      icon: "facebook",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/tetrahedron_tms/",
      icon: "instagram",
    },
    {
      name: "Twitter / X",
      href: "https://x.com/tetrahedrontms",
      icon: "twitter",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/tetrahedronmanufacturingservicesprivatelimited/",
      icon: "linkedin",
    },
  ],
};
