"use client";

import { useState } from "react";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import ContactFormModal from "@/components/ContactFormModal";

export default function ModernFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalButtonText, setModalButtonText] = useState("");
  const [email, setEmail] = useState("");

  const openModal = (buttonText) => {
    setModalButtonText(buttonText);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalButtonText("");
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    openModal("Quick Support");
  };

  return (
    <>
      <footer className="modern-footer relative bg-[#001730] text-slate-300 border-t border-slate-800 overflow-hidden font-sans">
        {/* Subtle background gear shape watermark */}
        <div
          className="absolute right-0 bottom-0 w-[550px] h-[550px] bg-no-repeat bg-contain bg-right-bottom opacity-10 pointer-events-none"
          style={{
            backgroundImage: "url(/assets/images/shapes/site-footer-two-shape-1.png)",
          }}
        />

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
            {/* Col 1: About & Brand (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-4">
              <Link href="/" className="inline-block transition-transform hover:scale-[1.02]">
                <img
                  src="/assets/images/tetrahedron-logo-trimmed.png"
                  alt="Tetrahedron Manufacturing Solutions"
                  className="h-14 sm:h-16 w-auto object-contain"
                />
              </Link>

              <p className="text-[15px] text-slate-300 leading-relaxed font-normal max-w-sm">
                We believe in the <span className="text-white font-semibold">best solution</span> <br />
                at the <span className="text-white font-semibold">most competitive price</span>.
              </p>

              {/* Social Media Links */}
              <div className="flex items-center gap-3 pt-1">
                <Link
                  href="https://www.facebook.com/TetrahedronManufacturingServices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link
                  href="https://www.instagram.com/tetrahedron_tms/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
                <Link
                  href="https://x.com/tetrahedrontms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/tetrahedronmanufacturingservicesprivatelimited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff5722] text-white flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
              </div>

              {/* Newsletter / Quick Email Box */}
              <form onSubmit={handleNewsletterSubmit} className="pt-2 max-w-sm">
                <div className="flex items-center rounded-lg bg-[#0c2340] border border-white/15 focus-within:border-[#ff5722] overflow-hidden transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your e-mail"
                    className="flex-1 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#ff5722] hover:bg-[#f4511e] text-white font-semibold transition-colors cursor-pointer flex items-center justify-center shrink-0"
                    aria-label="Submit Email"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Col 2: Expertise (3 cols on lg) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Expertise</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/manufacturing-operational-excellence-consulting/"
                    className="group inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>Consulting Services</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/corporate-training-companies/"
                    className="group inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>Corporate Training</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/automated-guided-vehicle-manufacturers/"
                    className="group inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>Automation (AGV/AMR)</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dojo-training-center-new"
                    className="group inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>Dojo Training Center</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Quick Links (2 cols on lg) */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="group inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us/"
                    className="group inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>About Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us/"
                    className="group inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>Contact Us</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery/"
                    className="group inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>Gallery</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/"
                    className="group inline-flex items-center gap-2 text-[14.5px] sm:text-[15px] text-slate-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>Blog</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Contact Us (3 cols on lg) */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Contact Us</h3>
              <ul className="space-y-3.5 text-[14px] sm:text-[14.5px]">
                <li>
                  <Link
                    href="mailto:marketing@tetrahedron.in"
                    className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
                  >
                    <Mail className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">marketing@tetrahedron.in</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:918984189814"
                    className="inline-flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
                  >
                    <Phone className="w-4 h-4 text-[#ff5722] shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">+91-8984189814</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://maps.app.goo.gl/U4G6MZNJ3Vvommwe7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2.5 text-slate-300 hover:text-white transition-colors group"
                  >
                    <MapPin className="w-4 h-4 text-[#ff5722] shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <span className="leading-relaxed">
                      <strong className="text-white font-semibold">Main Office:</strong> 204, Block A, Ecotech III, Greater Noida, Uttar Pradesh 201306, India
                    </span>
                  </Link>
                </li>
                <li className="flex items-start gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-[#ff5722] shrink-0 mt-1" />
                  <span className="leading-relaxed">
                    <strong className="text-white font-semibold">Regional Office (East):</strong> Unit 630, DLF Cybercity, Infocity Park, Patia – 751024, Bhubaneswar, Odisha (India)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="border-t border-slate-800/80 bg-[#001124]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-[13px] text-slate-400">
            <span className="text-center sm:text-left">
              Copyright © {new Date().getFullYear()} Tetrahedron Manufacturing Services Pvt. Ltd. All Rights Reserved.
            </span>
            <div className="flex items-center gap-5">
              <Link href="/terms-of-service/" className="hover:text-white transition-colors">
                Terms &amp; Condition
              </Link>
              <span className="text-slate-600">•</span>
              <Link href="/privacy-policy/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-600">•</span>
              <Link href="/contact-us/" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Contact Form Modal */}
      <ContactFormModal
        open={isModalOpen}
        onClose={closeModal}
        buttonText={modalButtonText}
      />
    </>
  );
}
