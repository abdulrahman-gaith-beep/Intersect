import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-xl font-bold">Intersect</span>
            </div>
            <p className="text-slate-400 text-sm">
              Your gateway to the Saudi market. Soft landing made simple with technology.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/solutions" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Market Entry
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Corporate Setup
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Equity & JV Structuring
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Government Relations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Mail size={16} />
                <span>info@intersect-ksa.com</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400 text-sm">
                <Phone size={16} />
                <span>+966 11 XXX XXXX</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400 text-sm">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>King Fahd Road, Riyadh, Kingdom of Saudi Arabia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Intersect. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
