import React, { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Skeleton } from "../components/Skeleton";
import { Zap, Shield, Smartphone, Code } from "lucide-react";

export const Aboutus = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-purple-500 selection:text-white pb-20">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-purple-500/10 rounded-2xl mb-4 border border-purple-500/20">
            <Zap className="w-8 h-8 text-purple-400 fill-purple-400/20" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              ZapWallet
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            The next generation of digital payments. Simple, secure, and built
            for speed.
          </p>
        </div>

        {loading ? (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="h-40 bg-neutral-900/50 rounded-2xl animate-pulse"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-40 bg-neutral-900/50 rounded-2xl animate-pulse"></div>
              <div className="h-40 bg-neutral-900/50 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {/* 1. Mission Statement (Glass Card) */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-xl transition-all group-hover:blur-2xl"></div>
              <div className="relative bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-400" />
                  Our Mission
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  At ZapWallet, we believe managing your money should be simple,
                  secure, and stress-free. We’ve created a digital wallet
                  solution that helps you stay organized, track your expenses,
                  and take control of your financial life—without the usual
                  complications. Our focus is on clarity, ease of use, and
                  reliability. Whether you're saving for something big or just
                  keeping an eye on daily spending, ZapWallet is designed to
                  make every transaction feel effortless.
                </p>
              </div>
            </div>

            {/* 2. Tech Stack & Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tech Card */}
              <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-8 hover:bg-neutral-900 transition-colors">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-400">
                  <Code size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Built with MERN
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Designed using the powerful MERN stack (MongoDB, Express.js,
                  React, Node.js), ZapWallet offers a seamless experience for
                  tracking and managing digital assets. We leverage modern web
                  technologies to ensure your data is always fast and
                  accessible.
                </p>
              </div>

              {/* UX Card */}
              <div className="bg-neutral-900/50 border border-white/5 rounded-3xl p-8 hover:bg-neutral-900 transition-colors">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 text-orange-400">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  Seamless Experience
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Our goal is to eliminate the clutter of financial tools by
                  providing a clean, intuitive interface. We strip away the
                  noise so you can focus on what matters—your money.
                </p>
              </div>
            </div>

            {/* 3. Image Gallery */}
            <div className="pt-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-white">
                A Glimpse Inside
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { src: "/photo1.png", label: "Dashboard" },
                  { src: "/photo4.png", label: "Analytics" },
                  { src: "/photo3.png", label: "Mobile View" },
                ].map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-neutral-900"
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10"></div>
                    <img
                      src={img.src}
                      alt={img.label}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium text-white">
                        {img.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer / Call to Action */}
            <div className="text-center pt-10 border-t border-white/5">
              <p className="text-gray-500 text-sm">
                © 2024 ZapWallet. Designed for the future of payments.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
