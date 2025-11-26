import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Folder,
  FolderOpen,
  FileText,
  Upload,
  Search,
  Download,
  Trash2,
  Eye,
  ChevronRight,
  File,
  FileSpreadsheet,
  Presentation,
  Plus
} from 'lucide-react';
import { documents } from '../../data/services';

type FolderName = 'Legal' | 'Financials' | 'Strategy';

const DataRoom: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<FolderName | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const folders: { name: FolderName; icon: typeof Folder; count: number; color: string }[] = [
    { 
      name: 'Legal', 
      icon: Folder, 
      count: documents.filter(d => d.folder === 'Legal').length,
      color: 'blue'
    },
    { 
      name: 'Financials', 
      icon: Folder, 
      count: documents.filter(d => d.folder === 'Financials').length,
      color: 'emerald'
    },
    { 
      name: 'Strategy', 
      icon: Folder, 
      count: documents.filter(d => d.folder === 'Strategy').length,
      color: 'amber'
    },
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = !selectedFolder || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText size={20} className="text-red-500" />;
      case 'xlsx':
        return <FileSpreadsheet size={20} className="text-emerald-500" />;
      case 'pptx':
        return <Presentation size={20} className="text-orange-500" />;
      default:
        return <File size={20} className="text-slate-400" />;
    }
  };

  const getFolderColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'emerald': return 'bg-emerald-100 text-emerald-600';
      case 'amber': return 'bg-amber-100 text-amber-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Simulate file upload
    setShowUploadModal(true);
    setTimeout(() => setShowUploadModal(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Data Room</h1>
        <p className="text-slate-600 mt-1">
          Secure document storage for your market entry process.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Folders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900 mb-4">Folders</h3>
            
            {/* All Documents */}
            <button
              onClick={() => setSelectedFolder(null)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                selectedFolder === null
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <FolderOpen size={20} />
              <span className="font-medium">All Documents</span>
              <span className="ml-auto text-sm bg-slate-100 px-2 py-0.5 rounded-full">
                {documents.length}
              </span>
            </button>

            {/* Folder List */}
            {folders.map((folder) => (
              <button
                key={folder.name}
                onClick={() => setSelectedFolder(folder.name)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                  selectedFolder === folder.name
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getFolderColor(folder.color)}`}>
                  <Folder size={16} />
                </div>
                <span className="font-medium">{folder.name}</span>
                <span className="ml-auto text-sm bg-slate-100 px-2 py-0.5 rounded-full">
                  {folder.count}
                </span>
              </button>
            ))}

            {/* Upload Button */}
            <button
              className="w-full flex items-center justify-center gap-2 p-3 mt-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors"
            >
              <Plus size={18} />
              <span className="font-medium">New Folder</span>
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3"
        >
          {/* Search & Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search documents..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                <Upload size={18} />
                Upload
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-sm">
            <button
              onClick={() => setSelectedFolder(null)}
              className="text-slate-500 hover:text-emerald-600"
            >
              Data Room
            </button>
            {selectedFolder && (
              <>
                <ChevronRight size={16} className="text-slate-400" />
                <span className="text-slate-900 font-medium">{selectedFolder}</span>
              </>
            )}
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`bg-white rounded-xl border-2 transition-all ${
              dragOver
                ? 'border-emerald-400 bg-emerald-50'
                : 'border-slate-200 border-dashed'
            }`}
          >
            {/* Drop Zone Message */}
            <div className={`p-8 text-center ${dragOver ? '' : 'hidden'}`}>
              <Upload size={48} className="mx-auto text-emerald-500 mb-4" />
              <p className="text-lg font-medium text-emerald-700">Drop files here to upload</p>
            </div>

            {/* Document List */}
            <div className={`${dragOver ? 'hidden' : ''}`}>
              {/* Table Header */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50 rounded-t-xl border-b border-slate-200 text-xs font-medium text-slate-500 uppercase tracking-wider">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-3">Uploaded</div>
                <div className="col-span-1"></div>
              </div>

              {/* Documents */}
              <div className="divide-y divide-slate-100">
                {filteredDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors"
                  >
                    <div className="col-span-12 sm:col-span-6 flex items-center gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate">{doc.name}</p>
                        <p className="text-xs text-slate-500 sm:hidden">
                          {doc.size} • {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:block col-span-2 text-sm text-slate-600">
                      {doc.size}
                    </div>
                    <div className="hidden sm:block col-span-3 text-sm text-slate-600">
                      {doc.uploadedAt}
                    </div>
                    <div className="col-span-12 sm:col-span-1 flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filteredDocuments.length === 0 && (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={24} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No documents found</h3>
                  <p className="text-slate-600 mb-4">
                    {searchQuery ? 'Try a different search term.' : 'Upload your first document to get started.'}
                  </p>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
                    <Upload size={18} />
                    Upload Document
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Storage Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-white rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Storage Used</span>
              <span className="text-sm text-slate-500">15.8 MB of 1 GB</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full w-[2%] bg-emerald-500 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Upload Success Modal */}
      {showUploadModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 bg-white rounded-xl shadow-lg border border-slate-200 p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Upload size={20} className="text-emerald-600" />
          </div>
          <div>
            <p className="font-medium text-slate-900">Uploading document...</p>
            <p className="text-sm text-slate-500">Please wait</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DataRoom;
