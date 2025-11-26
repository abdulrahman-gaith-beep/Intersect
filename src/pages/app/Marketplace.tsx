import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Zap,
  Users,
  Lock,
  Play,
  Clock,
  CheckCircle,
  ChevronDown
} from 'lucide-react';
import { services, type Service } from '../../data/services';
import AutomatedServiceModal from '../../components/modals/AutomatedServiceModal';
import AdvisoryServiceModal from '../../components/modals/AdvisoryServiceModal';

const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'automated' | 'advisory'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'locked' | 'in-progress'>('all');
  const [showFilters, setShowFilters] = useState(false);
  
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [automatedModalOpen, setAutomatedModalOpen] = useState(false);
  const [advisoryModalOpen, setAdvisoryModalOpen] = useState(false);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || service.type === filterType;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleServiceAction = (service: Service) => {
    if (service.status === 'locked') return;
    
    setSelectedService(service);
    if (service.type === 'automated') {
      setAutomatedModalOpen(true);
    } else {
      setAdvisoryModalOpen(true);
    }
  };

  const getStatusBadge = (status: Service['status']) => {
    switch (status) {
      case 'available':
        return (
          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            <CheckCircle size={12} />
            Available
          </span>
        );
      case 'locked':
        return (
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            <Lock size={12} />
            Locked
          </span>
        );
      case 'in-progress':
        return (
          <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
            <Clock size={12} />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            <CheckCircle size={12} />
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  const getActionButton = (service: Service) => {
    if (service.status === 'locked') {
      return (
        <button
          disabled
          className="w-full px-4 py-2 bg-slate-100 text-slate-400 rounded-lg font-medium cursor-not-allowed"
        >
          <Lock size={16} className="inline mr-2" />
          Locked
        </button>
      );
    }

    if (service.status === 'in-progress') {
      return (
        <button
          onClick={() => handleServiceAction(service)}
          className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
        >
          <Clock size={16} className="inline mr-2" />
          View Progress
        </button>
      );
    }

    if (service.type === 'automated') {
      return (
        <button
          onClick={() => handleServiceAction(service)}
          className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          <Play size={16} className="inline mr-2" />
          Launch Tool
        </button>
      );
    }

    return (
      <button
        onClick={() => handleServiceAction(service)}
        className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-900 transition-colors"
      >
        <Users size={16} className="inline mr-2" />
        Request Expert
      </button>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Service Marketplace</h1>
        <p className="text-slate-600 mt-1">
          Access automated tools and expert advisory services for your market entry.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-slate-200 p-4 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Filter Toggle (Mobile) */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
          >
            <Filter size={18} />
            Filters
            <ChevronDown size={18} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Desktop Filters */}
          <div className="hidden md:flex items-center gap-3">
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value as typeof filterType)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="automated">Automated</option>
              <option value="advisory">Advisory</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="in-progress">In Progress</option>
              <option value="locked">Locked</option>
            </select>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden flex flex-col gap-3 mt-4 pt-4 border-t border-slate-100"
          >
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value as typeof filterType)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
            >
              <option value="all">All Types</option>
              <option value="automated">Automated</option>
              <option value="advisory">Advisory</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value as typeof filterStatus)}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="in-progress">In Progress</option>
              <option value="locked">Locked</option>
            </select>
          </motion.div>
        )}
      </motion.div>

      {/* Service Type Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-6 mb-6"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-emerald-600" />
          </div>
          <span className="text-sm text-slate-600">Automated Tools</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <Users size={16} className="text-slate-600" />
          </div>
          <span className="text-sm text-slate-600">Advisory Services</span>
        </div>
      </motion.div>

      {/* Service Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className={`bg-white rounded-xl border p-6 transition-all ${
              service.status === 'locked'
                ? 'border-slate-200 opacity-75'
                : 'border-slate-200 hover:border-emerald-300 hover:shadow-lg'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                service.type === 'automated' ? 'bg-emerald-100' : 'bg-slate-100'
              }`}>
                {service.type === 'automated' ? (
                  <Zap size={24} className="text-emerald-600" />
                ) : (
                  <Users size={24} className="text-slate-600" />
                )}
              </div>
              {getStatusBadge(service.status)}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{service.title}</h3>
            <p className="text-sm text-slate-600 mb-4">{service.description}</p>

            {/* Type Badge */}
            <div className="mb-4">
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                service.type === 'automated'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-700 bg-slate-50'
              }`}>
                {service.type === 'automated' ? 'Instant Results' : 'Expert Consultation'}
              </span>
            </div>

            {/* Action Button */}
            {getActionButton(service)}
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={24} className="text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No services found</h3>
          <p className="text-slate-600">Try adjusting your search or filters.</p>
        </motion.div>
      )}

      {/* Modals */}
      <AutomatedServiceModal
        service={selectedService}
        isOpen={automatedModalOpen}
        onClose={() => {
          setAutomatedModalOpen(false);
          setSelectedService(null);
        }}
      />
      <AdvisoryServiceModal
        service={selectedService}
        isOpen={advisoryModalOpen}
        onClose={() => {
          setAdvisoryModalOpen(false);
          setSelectedService(null);
        }}
      />
    </div>
  );
};

export default Marketplace;
