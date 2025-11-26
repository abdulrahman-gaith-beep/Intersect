import { useState } from 'react';
import { 
  Globe, 
  Building2, 
  FileText, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Lock, 
  Zap, 
  MessageSquare,
  BarChart3,
  Briefcase,
  Search,
  Menu,
  X,
  Download
} from 'lucide-react';

// --- Types & Data ---

type ServiceType = 'automated' | 'advisory';

interface Service {
  id: string;
  title: string;
  description: string;
  type: ServiceType;
  icon: React.ElementType;
  status?: 'locked' | 'available' | 'in-progress' | 'completed';
}

const servicesData: Service[] = [
  {
    id: '1',
    title: 'Market Intelligence Report',
    description: 'Instant generation of sector-specific data and competitor analysis.',
    type: 'automated',
    icon: BarChart3,
    status: 'available'
  },
  {
    id: '2',
    title: 'Entity Name Reservation',
    description: 'Check availability and reserve your trade name with Ministry of Commerce.',
    type: 'automated',
    icon: Search,
    status: 'available'
  },
  {
    id: '3',
    title: 'Government Deal Origination',
    description: 'Strategic introduction to Ministry stakeholders and Giga-projects.',
    type: 'advisory',
    icon: Building2,
    status: 'locked'
  },
  {
    id: '4',
    title: 'JV Structure & Equity',
    description: 'Legal structuring for Joint Ventures and local capitalization.',
    type: 'advisory',
    icon: Users,
    status: 'locked'
  },
  {
    id: '5',
    title: 'MISA License Application',
    description: 'Automated pre-qualification check and document submission.',
    type: 'automated',
    icon: FileText,
    status: 'in-progress'
  },
  {
    id: '6',
    title: 'Industrial Land Allocation',
    description: 'Scouting and negotiation for Modon or RCJY industrial zones.',
    type: 'advisory',
    icon: Globe,
    status: 'locked'
  }
];

// --- Components ---

function Badge({ type }: { type: ServiceType }) {
  const isAuto = type === 'automated';
  const Icon = isAuto ? Zap : Users;
  const label = isAuto ? 'Instant Access' : 'Advisory Team';
  const className = isAuto
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : 'bg-indigo-50 text-indigo-700 border-indigo-200';

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${className}`}>
      <span className="flex items-center gap-1">
        <Icon size={12} /> {label}
      </span>
    </span>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const ServiceIcon = service.icon;
  const isAutomated = service.type === 'automated';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isAutomated ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
          <ServiceIcon size={20} />
        </div>
        <Badge type={service.type} />
      </div>
      <h3 className="font-bold text-slate-900 mb-2">{service.title}</h3>
      <p className="text-sm text-slate-500 mb-6 flex-1">{service.description}</p>
      
      {isAutomated ? (
        <button className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
          <Zap size={16} /> Launch Tool
        </button>
      ) : (
        <button className="w-full py-2.5 border-2 border-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
          <MessageSquare size={16} /> Ask our Team
        </button>
      )}
    </div>
  );
}

interface LandingPageProps {
  onNavigateToDashboard: () => void;
  showMobileMenu: boolean;
  onToggleMobileMenu: () => void;
}

function LandingPage({ onNavigateToDashboard, showMobileMenu, onToggleMobileMenu }: LandingPageProps) {
  return (
    <div className="font-sans text-slate-900 bg-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Globe className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">INTERSECT<span className="text-emerald-600">.OS</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600">Solutions</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600">Pricing</a>
              <a href="#" className="text-sm font-medium text-slate-600 hover:text-emerald-600">Case Studies</a>
              <button 
                onClick={onNavigateToDashboard}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Client Login
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={onToggleMobileMenu}>
                {showMobileMenu ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-b border-slate-100 px-4 py-4 space-y-4">
             <button onClick={onNavigateToDashboard} className="w-full bg-emerald-600 text-white py-2 rounded-lg">Access Portal</button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Now Live: Automated MISA Licensing
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Soft Landing in Saudi. <br/>
              <span className="text-emerald-600">Now an Algorithm.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Intersect OS is the first technology platform that digitizes market entry. 
              Automate your paperwork instantly, and summon our deal-making team only when you need high-level negotiation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={onNavigateToDashboard}
                className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
              >
                Start Free Soft Landing <ArrowRight size={20}/>
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Hybrid Model: Tech Speed + Human Touch</h2>
            <p className="mt-4 text-slate-600">We automated the boring stuff so our experts can focus on your equity deals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Instant Entity Formation", desc: "Our API connects directly with government portals to reserve names and issue licenses.", Icon: Zap },
              { title: "Dynamic Data Room", desc: "A secure vault that auto-populates the documents investors need for your JV.", Icon: Lock },
              { title: "On-Demand Experts", desc: "Need to negotiate with a Minister? Click one button to deploy our GR team.", Icon: Users },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.Icon className="text-slate-900 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DashboardProps {
  activeTab: string;
  onSetActiveTab: (tab: string) => void;
  onSignOut: () => void;
}

function Dashboard({ activeTab, onSetActiveTab, onSignOut }: DashboardProps) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 flex-col hidden md:flex">
        <div className="p-6">
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Globe className="text-white w-5 h-5" />
            </div>
            INTERSECT
          </div>
        </div>
        
        <div className="flex-1 px-4 space-y-2 mt-4">
          <button 
            onClick={() => onSetActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'overview' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <BarChart3 size={20} /> Overview
          </button>
          <button 
            onClick={() => onSetActiveTab('services')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'services' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <Briefcase size={20} /> Service Marketplace
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-slate-800 transition-colors">
            <FileText size={20} /> My Documents
          </button>
          <button className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:bg-slate-800 transition-colors">
            <Users size={20} /> Deal Team
          </button>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button onClick={onSignOut} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white">
             Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-semibold text-slate-800">
            {activeTab === 'overview' ? 'Soft Landing Tracker' : 'Service Marketplace'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              TechCorp Global Ltd.
            </div>
            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'overview' && (
            <div className="max-w-5xl mx-auto space-y-8">
              {/* Progress Tracker */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800">Market Entry Progress</h3>
                  <span className="text-emerald-600 font-bold">35% Complete</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-6">
                  <div className="bg-emerald-500 h-full w-[35%] rounded-full"></div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center"><CheckCircle size={16}/></div>
                    <span className="font-medium text-slate-900">Registration</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</div>
                    <span className="font-medium text-slate-900">Compliance</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">3</div>
                    <span className="text-slate-500">Deal Origination</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">4</div>
                    <span className="text-slate-500">JV Formation</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Need Strategic Advice?</h3>
                    <p className="text-indigo-100 text-sm mb-4">Our Government Relations team is ready to step in for complex negotiations.</p>
                    <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors">
                      <MessageSquare size={16}/> Request Support
                    </button>
                  </div>
                  <Users className="absolute -bottom-4 -right-4 text-indigo-500 opacity-50 w-32 h-32" />
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                  <h3 className="font-bold text-slate-800 mb-2">Recent Documents</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center gap-3">
                        <FileText className="text-slate-400 w-5 h-5"/>
                        <span className="text-sm font-medium text-slate-700">Draft_Articles_Association.pdf</span>
                      </div>
                      <Download className="text-emerald-600 w-4 h-4 cursor-pointer hover:text-emerald-700"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Service Marketplace</h2>
                <p className="text-slate-600">Select automated tools for instant results, or request advisory for complex needs.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesData.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [activeTab, setActiveTab] = useState('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  if (view === 'landing') {
    return (
      <LandingPage
        onNavigateToDashboard={() => setView('dashboard')}
        showMobileMenu={showMobileMenu}
        onToggleMobileMenu={() => setShowMobileMenu(!showMobileMenu)}
      />
    );
  }

  return (
    <Dashboard
      activeTab={activeTab}
      onSetActiveTab={setActiveTab}
      onSignOut={() => setView('landing')}
    />
  );
}
