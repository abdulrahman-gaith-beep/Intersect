import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Check,
  ArrowRight,
  Zap,
  Building2,
  Crown,
  HelpCircle
} from 'lucide-react';

const PricingPage: React.FC = () => {
  const [annual, setAnnual] = useState(false);

  const tiers = [
    {
      name: 'Explorer',
      icon: Zap,
      price: 'Free',
      description: 'Basic access to explore the Saudi market opportunity',
      features: [
        'Platform access with basic data',
        'Market overview reports',
        'Eligibility pre-assessment',
        'Community access',
        'Email support',
      ],
      limitations: [
        'Limited to 3 reports per month',
        'No advisory services',
      ],
      cta: 'Start Free',
      popular: false,
      color: 'slate'
    },
    {
      name: 'Market Entrant',
      icon: Building2,
      price: annual ? 'SAR 4,500' : 'SAR 5,000',
      period: '/month',
      description: 'For companies actively pursuing Saudi market entry',
      features: [
        'Everything in Explorer',
        'Unlimited market reports',
        'MISA license automation',
        'Document processing',
        'Dedicated account manager',
        'Priority support (24hr response)',
        'Monthly strategy calls',
        'Compliance monitoring',
      ],
      limitations: [],
      cta: 'Get Started',
      popular: true,
      color: 'emerald'
    },
    {
      name: 'JV Partner',
      icon: Crown,
      price: 'Custom',
      description: 'Enterprise solution with equity success fees',
      features: [
        'Everything in Market Entrant',
        'Government deal scouting',
        'JV partner matching',
        'Equity structuring advisory',
        'Giga-project access (NEOM, Red Sea)',
        'White-glove concierge service',
        'On-ground representation',
        'Board-level strategic advisory',
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'amber',
      note: 'Includes success fees on equity transactions'
    }
  ];

  const faqs = [
    {
      question: 'What is included in the free Explorer tier?',
      answer: 'The Explorer tier gives you access to the platform, basic market data, and eligibility pre-assessment tools. It\'s designed for companies exploring the Saudi market opportunity before committing to full market entry.'
    },
    {
      question: 'How does the Market Entrant pricing work?',
      answer: 'Market Entrant is a monthly subscription that includes all automated tools, dedicated support, and regular strategy calls. You can cancel anytime, and annual plans receive a 10% discount.'
    },
    {
      question: 'What are the success fees for JV Partner tier?',
      answer: 'JV Partner tier includes success-based fees for equity transactions, typically structured as a percentage of deal value. Specific terms are discussed during the consultation based on your business requirements.'
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can upgrade your plan at any time and the change takes effect immediately. Downgrades take effect at the end of your current billing cycle.'
    },
    {
      question: 'Is there a minimum commitment period?',
      answer: 'Explorer is free forever. Market Entrant has no minimum commitment for monthly plans. Annual plans require a 12-month commitment but offer significant savings.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for new Market Entrant subscribers. If you\'re not satisfied, contact us within 30 days for a full refund.'
    }
  ];

  const getColorClasses = (color: string, isPopular: boolean) => {
    if (isPopular) {
      return {
        card: 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white border-emerald-400',
        icon: 'bg-white/20',
        iconColor: 'text-white',
        price: 'text-white',
        desc: 'text-emerald-100',
        feature: 'text-emerald-50',
        check: 'text-emerald-200',
        button: 'bg-white text-emerald-600 hover:bg-emerald-50'
      };
    }

    return {
      card: 'bg-white border-slate-200',
      icon: color === 'amber' ? 'bg-amber-100' : 'bg-slate-100',
      iconColor: color === 'amber' ? 'text-amber-600' : 'text-slate-600',
      price: 'text-slate-900',
      desc: 'text-slate-600',
      feature: 'text-slate-700',
      check: color === 'amber' ? 'text-amber-500' : 'text-emerald-500',
      button: color === 'amber' 
        ? 'bg-amber-500 text-white hover:bg-amber-600' 
        : 'bg-slate-900 text-white hover:bg-slate-800'
    };
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Simple, Transparent{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                Pricing
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Choose the plan that matches your market entry ambitions.
              No hidden fees, no surprises.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white/10 rounded-full p-1">
              <button
                onClick={() => setAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !annual ? 'bg-white text-slate-900' : 'text-white hover:text-emerald-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  annual ? 'bg-white text-slate-900' : 'text-white hover:text-emerald-200'
                }`}
              >
                Annual
                <span className="ml-2 text-emerald-400 text-xs">Save 10%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => {
              const colors = getColorClasses(tier.color, tier.popular);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-2xl border p-8 ${colors.card} ${
                    tier.popular ? 'md:-mt-4 md:mb-4 shadow-xl shadow-emerald-500/20' : 'shadow-lg'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-emerald-900 text-emerald-100 text-xs font-semibold px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${colors.icon}`}>
                    <tier.icon size={28} className={colors.iconColor} />
                  </div>

                  {/* Title & Price */}
                  <h3 className={`text-2xl font-bold mb-2 ${colors.price}`}>{tier.name}</h3>
                  <div className="mb-4">
                    <span className={`text-4xl font-bold ${colors.price}`}>{tier.price}</span>
                    {tier.period && (
                      <span className={`text-lg ${colors.desc}`}>{tier.period}</span>
                    )}
                  </div>
                  <p className={`mb-6 ${colors.desc}`}>{tier.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className={`flex items-start gap-3 ${colors.feature}`}>
                        <Check size={18} className={`flex-shrink-0 mt-0.5 ${colors.check}`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.note && (
                    <p className={`text-xs mb-6 ${colors.desc}`}>* {tier.note}</p>
                  )}

                  {/* CTA Button */}
                  <Link
                    to={tier.name === 'JV Partner' ? '/signup' : '/signup'}
                    className={`block w-full py-3 px-6 rounded-xl font-semibold text-center transition-all ${colors.button}`}
                  >
                    {tier.cta}
                    <ArrowRight size={18} className="inline ml-2" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Enterprise Solution</h3>
              <p className="text-slate-300">
                Need a custom solution for your organization? Let's discuss.
              </p>
            </div>
            <Link
              to="/signup"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-all"
            >
              Contact Sales
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-50 rounded-xl p-6"
              >
                <div className="flex gap-4">
                  <HelpCircle size={24} className="text-emerald-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">{faq.question}</h4>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Start Your Saudi Journey Today
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Try Intersect free for 30 days. No credit card required.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all"
            >
              Start Free Trial
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
