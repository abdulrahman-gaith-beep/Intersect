import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Users,
  Shield,
  Globe,
  CheckCircle,
  Building2,
  Rocket
} from 'lucide-react';

const HomePage: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const trustLogos = [
    { name: 'MISA', subtitle: 'Ministry of Investment' },
    { name: 'MoC', subtitle: 'Ministry of Commerce' },
    { name: 'PIF', subtitle: 'Public Investment Fund' },
    { name: 'SAGIA', subtitle: 'Investment Authority' },
    { name: 'Vision 2030', subtitle: 'Saudi Vision' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Speed',
      subtitle: 'Technology-Driven',
      description: 'AI-powered automation reduces market entry time by 60%',
      items: ['Instant license pre-checks', 'Automated document processing', 'Real-time status tracking']
    },
    {
      icon: Users,
      title: 'Access',
      subtitle: 'Human Network',
      description: 'Deep connections across government and private sector',
      items: ['Government relations team', 'Local partner network', 'Industry expert advisors']
    }
  ];

  const stats = [
    { value: '60%', label: 'Faster Market Entry' },
    { value: '95%', label: 'Client Success Rate' },
    { value: '50+', label: 'Enterprise Clients' },
    { value: '24/7', label: 'Concierge Support' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-300 text-sm font-medium mb-6"
            >
              <Rocket size={16} />
              <span>Vision 2030 Aligned Partner</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Soft Landing in Saudi.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                Now an Algorithm.
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              The first technology platform that automates your market entry into the Kingdom of Saudi Arabia. 
              Combine AI-powered tools with expert advisory for a seamless soft landing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50"
              >
                Start Your Journey
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all backdrop-blur"
              >
                Explore Solutions
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500 mb-8">
            Trusted by leading organizations and aligned with Saudi government entities
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Building2 className="text-slate-400" size={24} />
                </div>
                <p className="text-sm font-medium text-slate-700">{logo.name}</p>
                <p className="text-xs text-slate-500">{logo.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Technology Meets Human Expertise
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We blend AI automation with deep local networks to deliver unmatched speed and access
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`p-8 rounded-2xl ${
                  index === 0 
                    ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200' 
                    : 'bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  index === 0 ? 'bg-emerald-500' : 'bg-slate-800'
                }`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <div className="text-sm font-medium text-slate-500 mb-1">{feature.subtitle}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle size={18} className={index === 0 ? 'text-emerald-500' : 'text-slate-500'} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for Market Entry
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From initial assessment to full operations, we've got you covered
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Shield, title: 'MISA Licensing', desc: 'Streamlined investment license applications' },
              { icon: Building2, title: 'Company Formation', desc: 'Full corporate setup and registration' },
              { icon: Globe, title: 'Market Intelligence', desc: 'AI-powered market analysis and insights' },
              { icon: Users, title: 'Partner Matching', desc: 'Connect with verified local partners' },
              { icon: Zap, title: 'Fast Track Services', desc: 'Expedited processing for urgent needs' },
              { icon: CheckCircle, title: 'Compliance Management', desc: 'Ongoing regulatory compliance support' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
                  <item.icon size={24} className="text-emerald-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Enter the Saudi Market?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join 50+ companies that have successfully launched in Saudi Arabia with Intersect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all"
              >
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-400 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
