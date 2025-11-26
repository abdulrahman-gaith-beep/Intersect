import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  FileText,
  Users,
  Building2
} from 'lucide-react';
import { progressSteps, actionItems } from '../../data/services';
import { useAuth } from '../../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  // Calculate progress percentage
  const completedSteps = progressSteps.filter(s => s.status === 'completed').length;
  const currentStep = progressSteps.find(s => s.status === 'current');
  const progressPercentage = Math.round((completedSteps / progressSteps.length) * 100);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  const stats = [
    { icon: FileText, label: 'Documents', value: '12', change: '+3 this week' },
    { icon: Users, label: 'Tasks Completed', value: '8', change: '75% complete' },
    { icon: Building2, label: 'Services Used', value: '4', change: '2 in progress' },
    { icon: TrendingUp, label: 'Progress', value: `${progressPercentage}%`, change: 'On track' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div {...fadeInUp} className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
          Welcome back, {user?.name?.split(' ')[0] || 'there'}!
        </h1>
        <p className="text-slate-600 mt-1">
          Here's the latest on your Saudi market entry progress.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-5 border border-slate-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <stat.icon size={20} className="text-emerald-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-500">{stat.label}</div>
            <div className="text-xs text-emerald-600 mt-1">{stat.change}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Market Entry Progress</h2>
              <p className="text-sm text-slate-500">Your journey to Saudi market presence</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">{progressPercentage}%</div>
              <div className="text-xs text-slate-500">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {progressSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                  step.status === 'current' 
                    ? 'bg-emerald-50 border border-emerald-200' 
                    : step.status === 'completed'
                    ? 'bg-slate-50'
                    : 'opacity-60'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  step.status === 'completed'
                    ? 'bg-emerald-500'
                    : step.status === 'current'
                    ? 'bg-emerald-500 ring-4 ring-emerald-100'
                    : 'bg-slate-200'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle size={16} className="text-white" />
                  ) : (
                    <span className={`text-sm font-semibold ${
                      step.status === 'current' ? 'text-white' : 'text-slate-500'
                    }`}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${
                      step.status === 'current' ? 'text-emerald-700' : 'text-slate-900'
                    }`}>
                      {step.title}
                    </h3>
                    {step.status === 'current' && (
                      <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {currentStep && (
            <Link
              to="/app/marketplace"
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Continue with {currentStep.title}
              <ArrowRight size={18} />
            </Link>
          )}
        </motion.div>

        {/* Action Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Action Items</h2>
            <span className="text-sm text-slate-500">
              {actionItems.filter(i => !i.completed).length} pending
            </span>
          </div>

          <div className="space-y-3">
            {actionItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`p-4 rounded-lg border ${
                  item.completed ? 'bg-slate-50 border-slate-100' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors ${
                      item.completed
                        ? 'bg-emerald-500 border-emerald-500'
                        : 'border-slate-300 hover:border-emerald-400'
                    }`}
                  >
                    {item.completed && <CheckCircle size={12} className="text-white" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      item.completed ? 'text-slate-400 line-through' : 'text-slate-900'
                    }`}>
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock size={12} className="text-slate-400" />
                      <span className="text-xs text-slate-500">Due {item.dueDate}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            to="/app/data-room"
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors"
          >
            View All Tasks
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-semibold">Need Help with Your Market Entry?</h3>
              <p className="text-emerald-100 text-sm">
                Our concierge team is available 24/7 to assist you.
              </p>
            </div>
          </div>
          <Link
            to="/app/support"
            className="flex-shrink-0 px-6 py-3 bg-white text-emerald-700 font-medium rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
