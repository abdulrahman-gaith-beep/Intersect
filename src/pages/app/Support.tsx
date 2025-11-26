import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  User,
  Bot,
  Paperclip,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface Message {
  id: number;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
}

const Support: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'agent',
      content: `Hello ${user?.name?.split(' ')[0] || 'there'}! 👋 Welcome to Intersect Concierge Support. How can I help you with your Saudi market entry today?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showFAQ, setShowFAQ] = useState(true);

  const faqs = [
    { question: "How long does MISA licensing take?", answer: "The MISA licensing process typically takes 4-8 weeks with our automated tools." },
    { question: "What documents do I need?", answer: "You'll need your company registration, financial statements, and articles of association." },
    { question: "Can I get 100% foreign ownership?", answer: "Yes, many sectors now allow 100% foreign ownership under Vision 2030 reforms." },
    { question: "How do I schedule a consultation?", answer: "You can request an expert consultation through the Service Marketplace." },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowFAQ(false);

    // Simulate agent response
    setTimeout(() => {
      const agentResponses = [
        "Thank you for your question! Our team is reviewing it and will provide a detailed response shortly.",
        "That's a great question about Saudi market entry. Let me connect you with a specialist who can help.",
        "I understand you need assistance. Our experts are available 24/7 to support your journey.",
        "Thank you for reaching out! I'm pulling up the relevant information for you now.",
      ];
      
      const agentMessage: Message = {
        id: messages.length + 2,
        type: 'agent',
        content: agentResponses[Math.floor(Math.random() * agentResponses.length)],
        timestamp: new Date()
      };
      
      setIsTyping(false);
      setMessages(prev => [...prev, agentMessage]);
    }, 1500);
  };

  const handleFAQClick = (faq: { question: string; answer: string }) => {
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: faq.question,
      timestamp: new Date()
    };

    const agentMessage: Message = {
      id: messages.length + 2,
      type: 'agent',
      content: faq.answer,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, agentMessage]);
    setShowFAQ(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Concierge Support</h1>
        <p className="text-slate-600 mt-1">
          Get expert assistance for your Saudi market entry journey.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col h-[600px]"
        >
          {/* Chat Header */}
          <div className="flex items-center gap-4 p-4 border-b border-slate-200">
            <div className="relative">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <MessageCircle size={24} className="text-emerald-600" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Intersect Support</h3>
              <p className="text-sm text-emerald-600">Online • Typically replies instantly</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-emerald-500' : 'bg-slate-100'
                  }`}>
                    {message.type === 'user' ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-slate-600" />
                    )}
                  </div>
                  <div>
                    <div className={`p-4 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-900 rounded-tl-none'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-right' : ''
                    } text-slate-400`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-slate-600" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FAQ Quick Actions */}
            <AnimatePresence>
              {showFAQ && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <p className="text-sm text-slate-500 mb-2">Quick questions:</p>
                  {faqs.map((faq, index) => (
                    <button
                      key={index}
                      onClick={() => handleFAQClick(faq)}
                      className="block w-full text-left p-3 bg-emerald-50 text-emerald-700 rounded-lg text-sm hover:bg-emerald-100 transition-colors"
                    >
                      {faq.question}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Contact Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Contact Options */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Other Ways to Reach Us</h3>
            
            <div className="space-y-4">
              <a
                href="tel:+966111234567"
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-emerald-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-emerald-100 transition-colors">
                  <Phone size={20} className="text-slate-600 group-hover:text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Phone Support</p>
                  <p className="text-sm text-slate-500">+966 11 123 4567</p>
                </div>
              </a>

              <a
                href="mailto:support@intersect-ksa.com"
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-emerald-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:bg-emerald-100 transition-colors">
                  <Mail size={20} className="text-slate-600 group-hover:text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Email Support</p>
                  <p className="text-sm text-slate-500">support@intersect-ksa.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Support Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">24/7 Chat Support</p>
                  <p className="text-xs text-emerald-600">Available now</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Phone: Sun-Thu 9AM-6PM</p>
                  <p className="text-xs text-slate-500">Saudi Arabia Time (AST)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
            <h3 className="font-semibold mb-4">Why Our Support Stands Out</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-200" />
                <span className="text-sm">Average response time: &lt; 2 mins</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-200" />
                <span className="text-sm">98% satisfaction rate</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-200" />
                <span className="text-sm">Bilingual support (EN/AR)</span>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <HelpCircle size={20} className="text-emerald-600" />
              <h3 className="font-semibold text-slate-900">Help Center</h3>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Browse our comprehensive knowledge base for quick answers.
            </p>
            <button className="w-full py-2 px-4 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors">
              View Help Articles
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;
