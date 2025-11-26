import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Loader2, Cpu, Database, Shield, Sparkles } from 'lucide-react';
import type { Service } from '../../data/services';

interface AutomatedServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

function AutomatedServiceModalContent({ service }: { service: Service }) {
  const [stage, setStage] = useState<'loading' | 'processing' | 'success'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate processing stages
    const timer1 = setTimeout(() => setStage('processing'), 1500);
    const timer2 = setTimeout(() => setStage('success'), 4000);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 80);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(progressInterval);
    };
  }, []);

  const loadingMessages = [
    { icon: Database, text: 'Connecting to Ministry of Commerce API...' },
    { icon: Cpu, text: 'Analyzing eligibility requirements...' },
    { icon: Shield, text: 'Verifying compliance parameters...' },
    { icon: Sparkles, text: 'Generating recommendations...' },
  ];

  const currentMessageIndex = Math.min(
    Math.floor(progress / 25),
    loadingMessages.length - 1
  );

  return (
    <>
      {/* Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {stage !== 'success' ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Processing...</span>
                  <span className="text-emerald-600 font-medium">{progress}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Status Messages */}
              <div className="space-y-3">
                {loadingMessages.map((msg, index) => {
                  const Icon = msg.icon;
                  const isActive = index === currentMessageIndex;
                  const isComplete = index < currentMessageIndex;

                  return (
                    <motion.div
                      key={index}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-emerald-50 border border-emerald-200'
                          : isComplete
                          ? 'bg-slate-50'
                          : 'opacity-40'
                      }`}
                    >
                      {isActive ? (
                        <Loader2 size={20} className="text-emerald-600 animate-spin" />
                      ) : isComplete ? (
                        <CheckCircle size={20} className="text-emerald-600" />
                      ) : (
                        <Icon size={20} className="text-slate-400" />
                      )}
                      <span className={`text-sm ${isActive ? 'text-emerald-700' : 'text-slate-600'}`}>
                        {msg.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle size={40} className="text-emerald-600" />
              </motion.div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Analysis Complete!</h4>
              <p className="text-slate-600 mb-6">
                Your {service.title.toLowerCase()} has been successfully processed.
              </p>
              <div className="bg-emerald-50 rounded-lg p-4 text-left">
                <h5 className="font-medium text-emerald-800 mb-2">Results Summary</h5>
                <ul className="text-sm text-emerald-700 space-y-1">
                  <li>✓ Eligibility confirmed for 100% ownership</li>
                  <li>✓ No regulatory blockers identified</li>
                  <li>✓ Estimated timeline: 4-6 weeks</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-6 bg-slate-50 border-t border-slate-100">
        {stage === 'success' ? (
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
              Download Report
            </button>
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500">Please wait while we process your request...</p>
        )}
      </div>
    </>
  );
}

export default function AutomatedServiceModal({
  service,
  isOpen,
  onClose
}: AutomatedServiceModalProps) {
  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Use key to reset component state when modal opens */}
            <AutomatedServiceModalContent key={service.id} service={service} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
