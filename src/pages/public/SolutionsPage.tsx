import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe,
  Building2,
  Handshake,
  ArrowRight,
  CheckCircle,
  Shield,
  Users,
  Zap,
  FileText,
  BarChart3,
  Scale
} from 'lucide-react';

const SolutionsPage: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const pillars = [
    {
      icon: Globe,
      title: 'Market Entry',
      subtitle: 'Phase 1',
      color: 'emerald',
      description: 'Comprehensive market analysis and entry strategy tailored for the Saudi market.',
      features: [
        {
          icon: BarChart3,
          title: 'Market Intelligence',
          description: 'AI-powered market research with competitor analysis, demand forecasting, and opportunity mapping.'
        },
        {
          icon: FileText,
          title: 'MISA License Pre-Check',
          description: 'Instant analysis of your eligibility for 100% foreign ownership across different sectors.'
        },
        {
          icon: Users,
          title: 'Partner Identification',
          description: 'Connect with verified local partners, distributors, and strategic allies.'
        }
      ],
      benefits: [
        'Reduce research time by 80%',
        'Access real-time market data',
        'Identify optimal entry strategy',
        'Understand regulatory landscape'
      ]
    },
    {
      icon: Building2,
      title: 'Corporate Setup',
      subtitle: 'Phase 2',
      color: 'blue',
      description: 'End-to-end company formation and operational setup in the Kingdom.',
      features: [
        {
          icon: Shield,
          title: 'Legal Entity Formation',
          description: 'Complete company registration with Ministry of Commerce, including CR and articles of association.'
        },
        {
          icon: Scale,
          title: 'Compliance Framework',
          description: 'Ensure full regulatory compliance with ongoing monitoring and advisory support.'
        },
        {
          icon: Zap,
          title: 'Operational Setup',
          description: 'Bank accounts, office space, HR systems, and everything needed to operate.'
        }
      ],
      benefits: [
        'Fast-track company formation',
        'Single point of contact',
        'Transparent pricing',
        'Ongoing compliance support'
      ]
    },
    {
      icon: Handshake,
      title: 'Equity & JV Structuring',
      subtitle: 'Phase 3',
      color: 'amber',
      description: 'Strategic partnerships and joint venture formation with local entities.',
      features: [
        {
          icon: Users,
          title: 'Partner Matching',
          description: 'AI-powered matching with vetted Saudi partners based on strategic fit and track record.'
        },
        {
          icon: Scale,
          title: 'Deal Structuring',
          description: 'Expert advisory on equity splits, governance, and shareholder agreements.'
        },
        {
          icon: FileText,
          title: 'Government Contracts',
          description: 'Access to giga-project opportunities with NEOM, Red Sea, and other Vision 2030 initiatives.'
        }
      ],
      benefits: [
        'Access exclusive deal flow',
        'Expert negotiation support',
        'Risk-sharing structures',
        'Long-term success planning'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; bgLight: string; text: string; border: string }> = {
      emerald: {
        bg: 'bg-emerald-500',
        bgLight: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200'
      },
      blue: {
        bg: 'bg-blue-500',
        bgLight: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      amber: {
        bg: 'bg-amber-500',
        bgLight: 'bg-amber-50',
        text: 'text-amber-600',
        border: 'border-amber-200'
      }
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Complete Solutions for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                Saudi Market Entry
              </span>
            </h1>
            <p className="text-xl text-slate-300">
              Three integrated phases designed to take you from market assessment 
              to full operations in the Kingdom of Saudi Arabia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Pillars */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {pillars.map((pillar, pillarIndex) => {
              const colors = getColorClasses(pillar.color);
              return (
                <motion.div
                  key={pillarIndex}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`relative ${pillarIndex % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                >
                  {/* Phase indicator line */}
                  {pillarIndex < pillars.length - 1 && (
                    <div className="hidden lg:block absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full h-24 w-0.5 bg-gradient-to-b from-slate-300 to-transparent" />
                  )}

                  <div className={`rounded-3xl border ${colors.border} ${colors.bgLight} overflow-hidden`}>
                    {/* Header */}
                    <div className={`${colors.bg} px-8 py-6`}>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                          <pillar.icon size={28} className="text-white" />
                        </div>
                        <div>
                          <span className="text-white/80 text-sm font-medium">{pillar.subtitle}</span>
                          <h2 className="text-2xl font-bold text-white">{pillar.title}</h2>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <p className="text-lg text-slate-600 mb-8">{pillar.description}</p>

                      {/* Features Grid */}
                      <div className="grid md:grid-cols-3 gap-6 mb-8">
                        {pillar.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="bg-white rounded-xl p-6 shadow-sm border border-slate-100"
                          >
                            <div className={`w-12 h-12 ${colors.bgLight} rounded-lg flex items-center justify-center mb-4`}>
                              <feature.icon size={24} className={colors.text} />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-600">{feature.description}</p>
                          </div>
                        ))}
                      </div>

                      {/* Benefits */}
                      <div className="bg-white rounded-xl p-6 border border-slate-100">
                        <h4 className="font-semibold text-slate-900 mb-4">Key Benefits</h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {pillar.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-center gap-2">
                              <CheckCircle size={18} className={colors.text} />
                              <span className="text-slate-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A streamlined process from initial consultation to market launch
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Discovery', desc: 'Initial assessment of your business and Saudi market fit' },
              { step: '02', title: 'Strategy', desc: 'Custom market entry roadmap with timeline and costs' },
              { step: '03', title: 'Execution', desc: 'Automated and advisory services working in parallel' },
              { step: '04', title: 'Launch', desc: 'Full operational capability in Saudi Arabia' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-emerald-300 to-emerald-100 -z-10" />
                )}
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Schedule a free consultation to discuss your Saudi market entry strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all"
              >
                Get Started
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

export default SolutionsPage;
