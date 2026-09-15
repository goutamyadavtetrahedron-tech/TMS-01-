"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

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
            <div style={{ zoom: '80%' }}>
                <Banner />
                <About />
                <Business />
                <Services />
                <Awards />
                <Testimonial />
                <div className="container text-center my-24">
                    <h2 className="section-title__title">
                        Trusted By Leading Brands
                    </h2>
                    <div className="border-amber-600 mt-8">
                        <img
                            src="/assets/images/home_client.jpeg"
                            alt="Clients"
                            className="border-amber-200"
                        />
                    </div></div>

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
