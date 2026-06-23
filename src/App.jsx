import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const AFFILIATE_LINK = 'https://giftclick.org/aff_c?offer_id=189&aff_id=188809';

// Animated background particles
function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `hsl(${330 + Math.random() * 40}, 80%, 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// 3D Tilt Card Component
function TiltCard({ children, className = '' }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 20);
    setRotateY((centerX - x) / 20);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

// Navbar
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-pink-100/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-pink-300/50">
            B
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">Beauty Rewards</span>
        </motion.div>

        <motion.a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-pink-400"></span> Limited Entries Available
        </motion.a>

        <motion.a
          href={AFFILIATE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-medium"
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-pink-400">✦</span> Limited
        </motion.a>
      </div>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.section
      style={{ y, opacity }}
      className="relative min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg shadow-pink-100/50 border border-pink-100"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-xs font-semibold text-gray-700 tracking-wider uppercase">
              Beauty Giveaway • Free Entry
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight"
          >
            Win a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600 italic font-serif">
              $1000
            </span>
            <br />
            Beauty Shopping
            <br />
            Experience
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 leading-relaxed max-w-md"
          >
            Enter for a chance to receive beauty and cosmetic rewards from a leading beauty brand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <motion.a
              href={AFFILIATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full text-lg font-semibold shadow-2xl shadow-pink-300/50 overflow-hidden"
              whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(236, 72, 153, 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Claim Offer</span>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['bg-pink-300', 'bg-orange-300', 'bg-amber-300'].map((color, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-sm`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">Trusted by beauty lovers</span>
            </div>
          </motion.div>
        </div>

        {/* Right - Gift Card Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative flex items-center justify-center"
        >
          <TiltCard className="relative">
            {/* Background card */}
            <motion.div
              className="absolute -bottom-8 -right-8 w-80 h-96 bg-pink-100 rounded-3xl"
              animate={{ rotate: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Main gift card */}
            <motion.div
              className="relative w-80 h-96 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 rounded-3xl p-8 shadow-2xl shadow-pink-300/50 overflow-hidden"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Card shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <span className="text-white/90 text-sm font-semibold tracking-wider uppercase">
                    Beauty Gift Card
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-lg">✦</span>
                  </div>
                </div>

                <div>
                  <span className="text-white text-5xl font-bold">$1,000</span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-white/70 text-xs tracking-wider">CARD NO.</span>
                    <p className="text-white/90 text-sm tracking-widest mt-1">
                      •••• •••• •••• 2025
                    </p>
                  </div>
                  <span className="text-white text-2xl font-serif italic">Beauty</span>
                </div>
              </div>
            </motion.div>

            {/* Floating accent */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-orange-300 rounded-2xl shadow-lg"
              animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-14 h-14 bg-pink-200 rounded-full shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </TiltCard>

          {/* Free Entry badge */}
          <motion.div
            className="absolute -bottom-4 right-0 sm:right-8 bg-white rounded-full px-6 py-3 shadow-xl flex items-center gap-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: 'spring' }}
          >
            <span className="text-yellow-500">✨</span>
            <span className="font-semibold text-gray-900">Free Entry</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: '🎁',
      title: 'Free Entry',
      desc: 'No purchase necessary to participate.',
      color: 'from-pink-400 to-pink-600',
    },
    {
      icon: '⚡',
      title: 'Quick Registration',
      desc: 'Complete entry in under 2 minutes.',
      color: 'from-pink-400 to-rose-500',
    },
    {
      icon: '💄',
      title: 'Beauty Rewards',
      desc: 'Premium beauty shopping opportunity.',
      color: 'from-pink-500 to-pink-600',
    },
    {
      icon: '🌍',
      title: 'Select Countries',
      desc: 'Available in US, CA, UK & AU.',
      color: 'from-pink-400 to-purple-500',
    },
  ];

  const badges = ['No Purchase Necessary', 'Secure & Private', '18+'];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto mb-16 flex flex-wrap gap-3 justify-center"
      >
        {badges.map((badge, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-pink-100"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: 'spring' }}
          >
            <span className="text-green-500 font-bold">✓</span>
            <span className="text-sm text-gray-700 font-medium">{badge}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <TiltCard className="h-full">
              <div className="h-full bg-white rounded-3xl p-8 shadow-lg shadow-pink-100/30 border border-pink-50 hover:shadow-xl hover:shadow-pink-200/40 transition-shadow">
                <motion.div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Claim Offer',
      desc: 'Confirm your country and age to qualify for entry.',
    },
    {
      num: '02',
      title: 'Complete Registration',
      desc: 'Fill out a quick form with your basic details.',
    },
    {
      num: '03',
      title: 'Receive Confirmation',
      desc: 'Get your confirmation and entry details by email.',
    },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-pink-500 font-semibold tracking-[0.2em] uppercase text-sm">
            Simple Process
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three quick steps. No hidden fees, no purchase required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <TiltCard className="h-full">
                <div className="h-full bg-white rounded-3xl p-10 shadow-xl shadow-pink-100/30 border border-pink-50 relative overflow-hidden group">
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <motion.span
                      className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-orange-300 font-serif"
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.num}
                    </motion.span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Countries Section
function CountriesSection() {
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-gradient-to-br from-pink-100 via-pink-50 to-purple-50 rounded-[2.5rem] p-12 sm:p-16 text-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-40" />

        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Available In Select Countries
          </h2>
          <p className="text-gray-600 mb-12 max-w-xl mx-auto">
            This promotion is open to eligible residents of the following countries.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {countries.map((country, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-white rounded-2xl px-6 py-5 shadow-lg shadow-pink-100/30 border border-pink-50 cursor-pointer">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-bold text-gray-900">{country.code}</span>
                    <span className="text-sm text-gray-700 font-medium">{country.name}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto relative rounded-[2.5rem] overflow-hidden"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

        {/* Animated orbs */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="relative z-10 py-20 sm:py-28 px-8 sm:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-8"
          >
            <span className="text-white font-semibold tracking-wider text-sm uppercase">
              Don't Miss Out
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Your $1000 Beauty Moment
            <br />
            Awaits
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/90 text-lg max-w-xl mx-auto mb-10"
          >
            Join thousands of beauty lovers entering today. Quick, free, and effortless.
          </motion.p>

          <motion.a
            href={AFFILIATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-full text-lg font-bold shadow-2xl hover:shadow-3xl transition-shadow"
          >
            Continue To Registration
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-white/70 text-sm mt-8"
          >
            No purchase necessary • 18+ • Terms apply
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <p className="text-sm leading-relaxed">
          This promotional page is independently operated and is not affiliated with or endorsed by
          Kylie Cosmetics. Participation, eligibility requirements, and prize availability are
          subject to the terms and conditions of the promotional offer.
        </p>
        <p className="text-sm">
          © 2026 Beauty Rewards Promo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50/50 via-white to-pink-50/30 overflow-x-hidden">
      <FloatingParticles />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CountriesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
