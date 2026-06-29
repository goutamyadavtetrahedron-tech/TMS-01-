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
    { question: "What types of industrial automation solutions does Tetrahedron offer?", answer: "Tetrahedron provides a wide range of manufacturing and intralogistics solutions, including Automated Guided Vehicles (AGVs), Rail Guided Vehicles (RGVs), Autonomous Mobile Robots (AMRs), material handling systems, plant layout design, and Industry 4.0 automation solutions. Our solutions are designed to improve productivity, safety, and operational efficiency." },
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
