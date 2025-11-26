import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle } from 'lucide-react';
import type { Service } from '../../data/services';

interface AdvisoryServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const AdvisoryServiceModal: React.FC<AdvisoryServiceModalProps> = ({
  service,
  isOpen,
  onClose
}) => {
  const [stage, setStage] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage('success');
  };

  const handleClose = () => {
    setStage('form');
    setFormData({ date: '', time: '', notes: '' });
    onClose();
  };

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
  ];

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
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
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Request Expert</h3>
                <p className="text-sm text-slate-500">{service.title}</p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {stage === 'form' ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <Calendar size={16} className="inline mr-2" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        <Clock size={16} className="inline mr-2" />
                        Preferred Time (Saudi Time)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setFormData({ ...formData, time })}
                            className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                              formData.time === time
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Tell us about your specific requirements..."
                        rows={3}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.date || !formData.time}
                      className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Schedule Consultation
                    </button>
                  </motion.form>
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
                    <h4 className="text-xl font-semibold text-slate-900 mb-2">Consultation Scheduled!</h4>
                    <p className="text-slate-600 mb-6">
                      Our expert will contact you at the scheduled time.
                    </p>
                    <div className="bg-slate-50 rounded-lg p-4 text-left space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Service</span>
                        <span className="text-sm font-medium text-slate-900">{service.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Date</span>
                        <span className="text-sm font-medium text-slate-900">{formData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Time</span>
                        <span className="text-sm font-medium text-slate-900">{formData.time}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {stage === 'success' && (
              <div className="p-6 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvisoryServiceModal;
