"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, selectBlogs } from "@/lib/store/blogSlice";
import styles from "./FAQsAndRelated.module.css";
import { Plus, Minus, ArrowUp } from "lucide-react";

export default function FAQsAndRelated() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What types of industrial automation solutions does Tetrahedron offer?", answer: "Tetrahedron offers a specialized range of industrial automation and intralogistics products designed to streamline material movement and improve manufacturing efficiency. Our portfolio includes Automated Guided Vehicles (AGVs) for guided transport, Autonomous Mobile Robots (AMRs) for flexible navigation, Rail Guided Vehicles (RGVs) for high-speed fixed-path movement, Industrial Cleaning Robots for automated floor cleaning and maintenance, and Trackless Flat Cars for heavy-duty material transportation without fixed rail infrastructure. These solutions are engineered to enhance productivity, operational safety, flexibility, and overall plant efficiency." },
    { question: "What industries can benefit from automated material handling systems?", answer: "Our automation solutions are suitable for various industries, including automotive, electronics, FMCG, warehousing, pharmaceuticals, engineering, e-commerce, and heavy manufacturing. These systems help streamline material flow, reduce manual intervention, and enhance overall operational performance." },
    { question: "How do AGVs, AMRs, and RGVs differ from each other?", answer: "AGVs (Automated Guided Vehicles) follow predefined paths, AMRs (Autonomous Mobile Robots) navigate dynamically using sensors and software, while RGVs (Rail Guided Vehicles) operate on fixed tracks for high-speed and heavy-load transportation. The ideal solution depends on your production process, load requirements, and facility layout." },
    { question: "Can Tetrahedron provide customized automation solutions?", answer: "Yes. Tetrahedron specializes in designing and manufacturing customized solutions based on your production requirements, load capacity, floor conditions, material flow, and industry-specific challenges. Our team ensures seamless integration with existing manufacturing and warehouse operations." },
    { question: "Why choose Tetrahedron as your industrial automation partner?", answer: "Tetrahedron combines engineering expertise, innovative technologies, and end-to-end project execution capabilities to deliver reliable automation solutions. From concept and design to manufacturing, installation, and after-sales support, we help businesses transform their operations with smart and future-ready systems." },
  ];

  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);

  useEffect(() => {
    dispatch(fetchBlogs({ page: 1, limit: 10, status: 'published' }));
  }, [dispatch]);

  const relatedPosts = blogs.filter(blog => blog.status === 'published').slice(0, 4);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>

        {/* FAQs */}
        <div className={styles.faqSection}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInDown`}>
            FAQs
          </h2>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} className={`${styles.faqItem} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.05 * index}s`}>
                <div className={styles.faqHeader} onClick={() => toggleFAQ(index)}>
                  <span className={styles.icon}>{openIndex === index ? <Minus size={20} /> : <Plus size={20} />}</span>
                  <h4 className={styles.faqQuestion}>{faq.question}</h4>
                </div>
                <div className={`${styles.faqBody} ${openIndex === index ? styles.open : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        <div className={styles.relatedSection}>
          <h2 className={`${styles.mainTitle} wow animate__animated animate__fadeInDown`}>
            Recent Posts
          </h2>

          <div className={styles.relatedGrid}>
            {/* 
            {relatedPosts.map((post, index) => (
              <Link href={`/${post.slug || post._id}`} key={post._id || index} className={`${styles.postCard} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * index}s`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.postImageWrapper}>
                  <img src={post.image?.url || '/assets/images/blog/default-blog.jpg'}
                    onError={(e) => { e.target.src = `https://placehold.co/300x200?text=${post.title.split(' ').join('+')}`; }}
                    alt={post.title} className={styles.postImage} />
                </div>
                <div className={styles.postTitle}>{post.title}</div>
              </Link>
            ))}
            */}

            {[
              {
                url: "https://www.tetrahedron.in/advantages-disadvantages-automated-guided-vehicles-agv",
                title: "Advantages & Disadvantages of Automated Guided vehicles",
                image: "https://res.cloudinary.com/dn8xrw47u/image/upload/v1774523179/blog_uploads/bdudlnphleg1hooqzqwv.jpg"
              },
              {
                url: "https://www.tetrahedron.in/agv-forklifts-types-guidance-systems-uses",
                title: "AGV Forklifts: Types, Guidance Systems, Uses, and Benefits",
                image: "https://res.cloudinary.com/dn8xrw47u/image/upload/v1776076463/blog_uploads/gfxpoomijmxxnqn5xmtr.jpg"
              },
              {
                url: "https://www.tetrahedron.in/autonomous-mobile-robot-amr-meaning-types",
                title: "Autonomous Mobile Robot (AMR) Meaning & Types",
                image: "https://res.cloudinary.com/dn8xrw47u/image/upload/v1773213503/blog_uploads/afisjzpxgdwqetyexhpt.png"
              },
              {
                url: "https://www.tetrahedron.in/agv-manufacturers-in-india",
                title: "AGV Manufacturers in India – Automatic Guided Vehicles Transforming Manufacturing",
                image: "https://res.cloudinary.com/dn8xrw47u/image/upload/e_trim,c_fill,ar_16:9,g_south/v1783922124/blog_uploads/hrxfft0tnn0fsglrrhs2.png"
              }
            ].map((post, index) => (
              <Link href={post.url} key={index} className={`${styles.postCard} wow animate__animated animate__fadeInUp`} data-wow-delay={`${0.1 * index}s`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className={styles.postImageWrapper}>
                  <img src={post.image} alt={post.title} className={styles.postImage} />
                </div>
                <div className={styles.postTitle}>{post.title}</div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Scroll to Top button as seen in design */}
      <button className={styles.scrollTopBtn} onClick={scrollToTop}>
        <ArrowUp size={24} />
      </button>
    </section>
  );
}
