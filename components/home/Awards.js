'use client'
import Link from "next/link"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Awards data array
const awardsData = [
  { id: 1, image: '/assets/images/project/award1.jpg', alt: 'Award 1' },
  { id: 2, image: '/assets/images/project/award5.jpg', alt: 'Award 5' },
  { id: 3, image: '/assets/images/project/award2.jpg', alt: 'Award 2' },
  { id: 4, image: '/assets/images/project/award3.jpg', alt: 'Award 3' },
  { id: 5, image: '/assets/images/project/award4.jpg', alt: 'Award 4' },
  { id: 6, image: '/assets/images/project/award6.jpg', alt: 'Award 6' },
  { id: 7, image: '/assets/images/project/award7.jpg', alt: 'Award 7' },
  { id: 8, image: '/assets/images/project/award8.jpg', alt: 'Award 8' },
  { id: 9, image: '/assets/images/project/award9.jpg', alt: 'Award 9' },
  { id: 10, image: '/assets/images/project/award10.jpg', alt: 'Award 10' },
  { id: 11, image: '/assets/images/project/award11.jpg', alt: 'Award 11' },
  { id: 13, image: '/assets/images/project/award13.jpg', alt: 'Award 13' },
  { id: 14, image: '/assets/images/project/award14.jpg', alt: 'Award 14' },
  { id: 15, image: '/assets/images/project/award15.jpg', alt: 'Award 15' },
  { id: 16, image: '/assets/images/project/award16.jpeg', alt: 'Award 16' },
].sort((a, b) => {
  const getNum = (str) => {
    const match = str.match(/award(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };
  return getNum(b.image) - getNum(a.image);
});

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.h1n',
        prevEl: '.h1p',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 30,
      }
    }
};

// Common styles
const containerStyles = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "0 20px"
};

const cardContainerStyles = {
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'transparent',
  position: 'relative',
  zIndex: '1',
};

const cardStyles = {
  background: '#fff',
  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
  transition: 'transform .4s cubic-bezier(.4,2,.6,1), box-shadow .4s',
  width: '100%',
  maxWidth: '320px',
  cursor: 'pointer',
  position: 'relative',
  borderRadius: '12px',
  border: '4px solid orange',
  zIndex: '120',
  overflow: 'hidden'
};

const imageStyles = {
  width: '100%',
  height: 'auto',
  display: 'block',
  transition: 'transform .4s',
};

const lightboxStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(0,0,0,0.9)',
  zIndex: 99999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'zoom-out',
  transition: 'background 0.3s ease',
};

const lightboxImageStyles = {
  height: '90vh',
  width: 'auto',
  maxWidth: '90vw',
  objectFit: 'contain',
  borderRadius: '16px',
  boxShadow: '0 0 40px 8px rgba(0,0,0,0.8)',
  background: '#fff',
  zIndex: 100000,
  cursor: 'default',
  display: 'block',
  margin: 'auto',
};

const closeButtonStyles = {
  position: 'absolute',
  top: '32px',
  right: '32px',
  zIndex: 100001,
  background: 'rgba(0,0,0,0.8)',
  color: '#fff',
  border: 'none',
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  fontSize: '24px',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
  transition: 'all 0.2s ease',
};

// Award Card Component
const AwardCard = ({ award, index, onImageClick }) => {
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 0 24px 4px orange';
    e.currentTarget.style.zIndex = '9999';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 2px 12px 0 rgba(0,0,0,0.06)';
    e.currentTarget.style.zIndex = '120';
  };

  return (
    <div style={cardContainerStyles}>
      <div 
        style={cardStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onImageClick(award.image)}
      >
        <Image
          src={award.image}
          alt={award.alt}
          width={400}
          height={500}
          style={imageStyles}
          priority={index < 5}
          loading={index < 5 ? undefined : "eager"}
        />
      </div>
    </div>
  );
};

// Lightbox Component
const Lightbox = ({ imageSrc, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!imageSrc || !mounted) return null;

  const handleCloseButtonHover = (e, isHover) => {
    if (isHover) {
        e.target.style.background = 'rgba(0,0,0,0.9)';
        e.target.style.transform = 'scale(1.05)';
    } else {
        e.target.style.background = 'rgba(0,0,0,0.8)';
        e.target.style.transform = 'scale(1)';
    }
  };

  return createPortal(
    <div onClick={onClose} style={lightboxStyles}>
      <Image
        src={imageSrc}
        alt="Award Preview"
        width={1200}
        height={1200}
        onClick={e => e.stopPropagation()}
        style={lightboxImageStyles}
      />
      <button
        onClick={onClose}
        style={closeButtonStyles}
        onMouseEnter={(e) => handleCloseButtonHover(e, true)}
        onMouseLeave={(e) => handleCloseButtonHover(e, false)}
        aria-label="Close"
      >
        ×
      </button>
    </div>,
    document.body
  );
};

// Helper to render "Our Latest Awards" with each first letter in a span and capitalized
function RenderTagline() {
  const tagline = "Our Latest Awards";
  return (
    <>
      {tagline.split(' ').map((word, idx) => (
        <span key={idx} style={{ marginRight: idx !== tagline.split(' ').length - 1 ? 4 : 0 }}>
          <span style={{ textTransform: 'uppercase', fontWeight: 900 }}>{word[0]}</span>
          <span style={{ textTransform: 'lowercase' }}>{word.slice(1)}</span>
        </span>
      ))}
    </>
  );
}

export default function Awards() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop only
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const openLightbox = useCallback((src) => {
    if (isDesktop) setLightboxImg(src);
  }, [isDesktop]);

  const closeLightbox = useCallback(() => setLightboxImg(null), []);

  return (
    <>
      <style jsx global>{`
        .awards-carousel .swiper-slide {
          opacity: 0.4;
          transition: opacity 0.4s ease;
        }
        @media (max-width: 767px) {
          .awards-carousel .swiper-slide-active {
            opacity: 1;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .awards-carousel .swiper-slide-active {
            opacity: 1;
          }
        }
        @media (min-width: 1024px) {
          .awards-carousel .swiper-slide-active,
          .awards-carousel .swiper-slide-prev,
          .awards-carousel .swiper-slide-next {
            opacity: 1;
          }
        }
      `}</style>

      {/* Lightbox Overlay */}
      {lightboxImg && isDesktop && (
        <Lightbox imageSrc={lightboxImg} onClose={closeLightbox} />
      )}

      {/* Project Two Start */}
      <section className="project-two" style={{ width: '100%', margin: '0 auto', overflow: 'hidden' }}>
        <div className="container" style={containerStyles}>

          {/* Centered Tagline Above Awards Section */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
            <div
              className="section-title__tagline"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: '#ff5e14',
                fontWeight: '700',
                marginBottom: '10px',
                textAlign: 'center',
                gap: '16px'
              }}
            >
              <div className="project-two__nav" 
                style={{ 
                  display: 'flex',
                  gap: '20px',
                  width: 'auto',
                  margin: '0',
                  padding: '0',
                  pointerEvents: 'none'
                }}
              >
                {/* Blue left arrow */}
                <div className="swiper-button-prev1 h1p" 
                  style={{ 
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  <i className="icon-arrow-left" style={{ fontSize: '24px' }}></i>
                </div>
              </div>
              
              {/* Tagline with first letters in span */}
              <span>
                <RenderTagline />
              </span>

              <div className="project-two__nav" 
                style={{ 
                  display: 'flex',
                  gap: '20px',
                  width: 'auto',
                  margin: '0',
                  padding: '0',
                  pointerEvents: 'none'
                }}
              >
                {/* Blue right arrow */}
                <div className="swiper-button-next1 h1n" 
                  style={{ 
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  <i className="icon-arrow-right" style={{ fontSize: '24px' }}></i>
                </div>
              </div>
            </div>
            
            <h2
              className="section-title__title"
              style={{
                textAlign: 'center',
                width: '100%',
                maxWidth: '1200px',
                fontSize: '40px',
                fontWeight: '700',
                color: '#0a1c4c',
                margin: '0',
              }}
            >
              Awards & Recognition
            </h2>
          </div>

          <div className="project-two__bottom" style={{ marginTop: "30px", width: "100%" }}>
            <Swiper {...swiperOptions} className="thm-swiper__slider swiper-container awards-carousel">
              {awardsData.map((award, index) => (
                <SwiperSlide key={award.id}>
                  <AwardCard award={award} index={index} onImageClick={openLightbox} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* Project Two End */}
    </>
  )
}