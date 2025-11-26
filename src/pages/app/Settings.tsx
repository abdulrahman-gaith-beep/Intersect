import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  CreditCard,
  Globe,
  Building2,
  Save,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Settings: React.FC = () => {
  const { user } = useAuth();

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Profile Information', description: 'Update your name, email, and photo' },
        { label: 'Password', description: 'Change your password' },
        { label: 'Two-Factor Authentication', description: 'Add an extra layer of security' },
      ]
    },
    {
      title: 'Company',
      icon: Building2,
      items: [
        { label: 'Company Profile', description: 'Update company information' },
        { label: 'Team Members', description: 'Manage team access and permissions' },
        { label: 'API Access', description: 'Manage API keys and integrations' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email Notifications', description: 'Configure email preferences' },
        { label: 'SMS Alerts', description: 'Set up text message notifications' },
        { label: 'In-App Notifications', description: 'Manage notification settings' },
      ]
    },
    {
      title: 'Billing',
      icon: CreditCard,
      items: [
        { label: 'Subscription Plan', description: 'View and change your plan' },
        { label: 'Payment Methods', description: 'Manage payment options' },
        { label: 'Billing History', description: 'View past invoices' },
      ]
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">
          Manage your account and preferences.
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-slate-200 p-6 mb-6"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-emerald-700">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-900">{user?.name || 'User'}</h2>
            <p className="text-slate-600">{user?.email || 'user@example.com'}</p>
            <p className="text-sm text-slate-500 mt-1">{user?.company || 'Company'}</p>
          </div>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + sectionIndex * 0.05 }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-6 py-4 bg-slate-50 border-b border-slate-200">
              <section.icon size={20} className="text-slate-600" />
              <h3 className="font-semibold text-slate-900">{section.title}</h3>
            </div>
            <div className="divide-y divide-slate-100">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div>
                    <p className="font-medium text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.description}</p>
                  </div>
                  <ChevronRight size={20} className="text-slate-400" />
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Language & Region */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-slate-200 p-6 mt-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Globe size={20} className="text-slate-600" />
          <h3 className="font-semibold text-slate-900">Language & Region</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white">
              <option>English</option>
              <option>العربية (Arabic)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
            <select className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white">
              <option>Arabia Standard Time (AST)</option>
              <option>UTC</option>
              <option>Eastern Time (ET)</option>
              <option>Pacific Time (PT)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-red-50 rounded-xl border border-red-200 p-6 mt-6"
      >
        <h3 className="font-semibold text-red-900 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-700 mb-4">
          These actions are irreversible. Please proceed with caution.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
            Delete Account
          </button>
        </div>
      </motion.div>

      {/* Save Button (Fixed) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 lg:right-auto lg:left-1/2 lg:-translate-x-1/2"
      >
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium shadow-lg hover:bg-emerald-700 transition-colors">
          <Save size={20} />
          Save Changes
        </button>
      </motion.div>
    </div>
  );
};

export default Settings;
