"use client";

import Navbar from "./navbar/Navbar";
import ModernFooter from "./ModernFooter";

/**
 * ModernLayout
 * A 100% pure Tailwind CSS layout for modern landing pages.
 * - Zero dependencies on elitecons.css, Bootstrap Reboot, or legacy jQuery plugins.
 * - Perfect viewport geometry and typography fidelity.
 */
export default function ModernLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased selection:bg-[#ff5722] selection:text-white">
      {/* Universal Top Navigation */}
      <Navbar />

      {/* Main Landing Page Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Modern High-Craft Footer */}
      <ModernFooter />
    </div>
  );
}
