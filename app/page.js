"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import Layout from "@/components/layout/Layout"
import Banner from "@/components/home/Banner"
import Services from "@/components/home/Services"
import About from "@/components/home/About"
import Business from "@/components/home/Business"
import Awards from "@/components/home/Awards"
import Testimonial from "@/components/home/Testimonial"
import ContactFormModal from "@/components/ContactFormModal"

export default function Home() {
    if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true') {
        return (
            <div style={{ textAlign: 'center', padding: '50px', backgroundColor: '#f8d7da' }}>
                <h1 style={{ color: '#721c24', fontSize: "100px" }}>Site is under maintenance</h1>
                <p style={{ fontSize: "100px" }}>Please check back later!</p>
            </div>
        );
    }
    const [showForm, setShowForm] = useState(false)
    const pathname = usePathname()
    const [modal, setModal] = useState({ open: false, message: '', success: false });

    useEffect(() => {
        // Disable auto-popup form in development mode (npm run dev)
        if (process.env.NODE_ENV === "development") {
            return;
        }

        const checkFormVisibility = () => {
            const lastClosed = localStorage.getItem("leadFormClosed")
            if (!lastClosed || Date.now() - Number(lastClosed) > 120000) {
                setShowForm(true)
            } else {
                setShowForm(false)
            }
        }

        // 10 seconds delay before first check
        const initialTimeout = setTimeout(() => {
            checkFormVisibility()
        }, 10000)

        const interval = setInterval(checkFormVisibility, 10000)

        return () => {
            clearTimeout(initialTimeout)
            clearInterval(interval)
        }
    }, [pathname])

    const handleCloseForm = () => {
        setShowForm(false)
        localStorage.setItem("leadFormClosed", Date.now().toString())
    }

    return (
        <Layout>
            <Banner />
            <div className="w-full">
                <About />
                <Business />
                <Services />
                <Awards />
                <Testimonial />
                
                {/* Trusted By Leading Brands Section with Harmonized Typography & Blue Hover Effect */}
                <section className="relative w-full bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
                    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center">
                        
                        {/* Section Header */}
                        <div className="mb-6 sm:mb-8">
                            <div className="flex items-center justify-center gap-2 mb-2 sm:mb-2.5">
                                <span className="w-6 h-[2.5px] bg-[#ff5e14] rounded-full" />
                                <span className="text-xs sm:text-sm font-bold tracking-[0.16em] text-[#ff5e14] uppercase">
                                    OUR VALUED CLIENTELE
                                </span>
                                <span className="w-6 h-[2.5px] bg-[#ff5e14] rounded-full" />
                            </div>
                            <h2 
                                className="text-xl sm:text-2xl lg:text-[28px] font-bold text-[#0a1c4c] tracking-tight m-0"
                                style={{ fontFamily: "var(--font-poppins, 'Poppins', sans-serif)", fontWeight: 700 }}
                            >
                                Trusted By Leading Brands
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2">
                                Empowering 280+ top manufacturing organizations across 20+ diverse industry sectors in India.
                            </p>
                        </div>

                        {/* Interactive Client Showcase Card with Blue Hover UI/UX Effect */}
                        <div className="group relative bg-white rounded-2xl border-2 border-slate-200/90 hover:border-blue-500 p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                            {/* Blue Accent Glow Bar on top */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/3 h-[3px] bg-gradient-to-r from-blue-500 to-[#0a1c4c] rounded-full transition-all duration-500" />
                            
                            <img
                                src="/assets/images/home_client.jpeg"
                                alt="Trusted By Leading Brands - Hero, L&T, Hindalco, Carrier, and 280+ Enterprise Clients"
                                className="w-full h-auto object-contain mx-auto rounded-xl transition-transform duration-300 group-hover:scale-[1.008]"
                            />

                            {/* Blue UI/UX Hover Action Bar */}
                            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-left">
                                <span className="text-xs sm:text-sm text-slate-500">
                                    Partnering with <strong className="text-slate-800 font-semibold">280+ manufacturing plants</strong> nationwide.
                                </span>
                                <Link 
                                    href="/our-clients/"
                                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 group-hover:text-blue-600 transition-colors"
                                >
                                    <span>Explore Client Case Studies</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </section>

            </div>

            <ContactFormModal
                open={showForm}
                onClose={handleCloseForm}
                buttonText="Quick Support"
            />

            {modal.open && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }} onClick={() => setModal({ ...modal, open: false })}>
                    <div style={{ background: '#fff', padding: '32px 48px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', textAlign: 'center', minWidth: '300px', fontSize: '18px', color: modal.success ? 'green' : 'red', fontWeight: 'bold', position: 'relative' }}>
                        <span style={{ position: 'absolute', top: 8, right: 16, cursor: 'pointer', fontSize: 24, color: '#888' }} onClick={() => setModal({ ...modal, open: false })}>×</span>
                        {modal.message}
                    </div>
                </div>
            )}
        </Layout>
    )
}
