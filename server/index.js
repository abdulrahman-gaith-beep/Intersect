import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- Mock Data ---

const users = [
  {
    id: '1',
    email: 'demo@techcorp.com',
    password: 'demo123',
    companyName: 'TechCorp Global Ltd.',
    name: 'John Smith',
    initials: 'TC'
  }
];

const services = [
  {
    id: '1',
    title: 'Market Intelligence Report',
    description: 'Instant generation of sector-specific data and competitor analysis.',
    type: 'automated',
    icon: 'BarChart3',
    status: 'available',
    price: 2500
  },
  {
    id: '2',
    title: 'Entity Name Reservation',
    description: 'Check availability and reserve your trade name with Ministry of Commerce.',
    type: 'automated',
    icon: 'Search',
    status: 'available',
    price: 500
  },
  {
    id: '3',
    title: 'Government Deal Origination',
    description: 'Strategic introduction to Ministry stakeholders and Giga-projects.',
    type: 'advisory',
    icon: 'Building2',
    status: 'locked',
    price: 15000
  },
  {
    id: '4',
    title: 'JV Structure & Equity',
    description: 'Legal structuring for Joint Ventures and local capitalization.',
    type: 'advisory',
    icon: 'Users',
    status: 'locked',
    price: 25000
  },
  {
    id: '5',
    title: 'MISA License Application',
    description: 'Automated pre-qualification check and document submission.',
    type: 'automated',
    icon: 'FileText',
    status: 'in-progress',
    price: 3500
  },
  {
    id: '6',
    title: 'Industrial Land Allocation',
    description: 'Scouting and negotiation for Modon or RCJY industrial zones.',
    type: 'advisory',
    icon: 'Globe',
    status: 'locked',
    price: 50000
  }
];

const documents = [
  {
    id: '1',
    name: 'Draft_Articles_Association.pdf',
    type: 'pdf',
    size: '2.4 MB',
    uploadedAt: '2024-01-15T10:30:00Z',
    category: 'Legal'
  },
  {
    id: '2',
    name: 'MISA_Pre_Qualification.pdf',
    type: 'pdf',
    size: '1.8 MB',
    uploadedAt: '2024-01-14T14:20:00Z',
    category: 'Compliance'
  },
  {
    id: '3',
    name: 'Market_Analysis_Report.pdf',
    type: 'pdf',
    size: '5.2 MB',
    uploadedAt: '2024-01-12T09:15:00Z',
    category: 'Research'
  }
];

const progressData = {
  currentStep: 2,
  completionPercentage: 35,
  steps: [
    { id: 1, name: 'Registration', status: 'completed' },
    { id: 2, name: 'Compliance', status: 'in-progress' },
    { id: 3, name: 'Deal Origination', status: 'pending' },
    { id: 4, name: 'JV Formation', status: 'pending' }
  ]
};

const notifications = [
  {
    id: '1',
    title: 'Document Ready',
    message: 'Your MISA pre-qualification document is ready for review.',
    read: false,
    createdAt: '2024-01-15T12:00:00Z'
  },
  {
    id: '2',
    title: 'New Service Available',
    message: 'Market Intelligence Report is now available for your sector.',
    read: false,
    createdAt: '2024-01-14T09:30:00Z'
  },
  {
    id: '3',
    title: 'Progress Update',
    message: 'Your registration phase has been completed successfully.',
    read: true,
    createdAt: '2024-01-13T15:45:00Z'
  }
];

const teamMembers = [
  {
    id: '1',
    name: 'Sarah Al-Rashid',
    role: 'Government Relations Lead',
    email: 'sarah@intersect.sa',
    avatar: null
  },
  {
    id: '2',
    name: 'Ahmed Hassan',
    role: 'Legal Counsel',
    email: 'ahmed@intersect.sa',
    avatar: null
  },
  {
    id: '3',
    name: 'Mohammed Al-Faisal',
    role: 'Market Entry Specialist',
    email: 'mohammed@intersect.sa',
    avatar: null
  }
];

// --- API Routes ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + Date.now()
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, companyName, name } = req.body;
  
  if (users.some(u => u.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already exists' });
  }
  
  const newUser = {
    id: String(users.length + 1),
    email,
    password,
    companyName,
    name,
    initials: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  };
  
  users.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  
  res.status(201).json({
    success: true,
    user: userWithoutPassword,
    token: 'mock-jwt-token-' + Date.now()
  });
});

app.get('/api/auth/me', (req, res) => {
  // Mock authenticated user
  const user = users[0];
  const { password: _, ...userWithoutPassword } = user;
  res.json({ success: true, user: userWithoutPassword });
});

// Services
app.get('/api/services', (req, res) => {
  res.json({ success: true, data: services });
});

app.get('/api/services/:id', (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  if (service) {
    res.json({ success: true, data: service });
  } else {
    res.status(404).json({ success: false, message: 'Service not found' });
  }
});

app.post('/api/services/:id/launch', (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  if (service) {
    res.json({
      success: true,
      message: `Service "${service.title}" has been launched`,
      data: { ...service, status: 'in-progress' }
    });
  } else {
    res.status(404).json({ success: false, message: 'Service not found' });
  }
});

app.post('/api/services/:id/request', (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  if (service) {
    res.json({
      success: true,
      message: `Advisory request submitted for "${service.title}"`,
      data: { requestId: 'REQ-' + Date.now() }
    });
  } else {
    res.status(404).json({ success: false, message: 'Service not found' });
  }
});

// Documents
app.get('/api/documents', (req, res) => {
  res.json({ success: true, data: documents });
});

app.post('/api/documents/upload', (req, res) => {
  const newDoc = {
    id: String(documents.length + 1),
    name: req.body.name || 'Uploaded_Document.pdf',
    type: 'pdf',
    size: '1.0 MB',
    uploadedAt: new Date().toISOString(),
    category: req.body.category || 'General'
  };
  documents.push(newDoc);
  res.status(201).json({ success: true, data: newDoc });
});

app.get('/api/documents/:id/download', (req, res) => {
  const doc = documents.find(d => d.id === req.params.id);
  if (doc) {
    res.json({
      success: true,
      message: `Download link generated for "${doc.name}"`,
      downloadUrl: `/downloads/${doc.id}/${doc.name}`
    });
  } else {
    res.status(404).json({ success: false, message: 'Document not found' });
  }
});

// Progress
app.get('/api/progress', (req, res) => {
  res.json({ success: true, data: progressData });
});

// Notifications
app.get('/api/notifications', (req, res) => {
  res.json({ success: true, data: notifications });
});

app.put('/api/notifications/:id/read', (req, res) => {
  const notification = notifications.find(n => n.id === req.params.id);
  if (notification) {
    notification.read = true;
    res.json({ success: true, data: notification });
  } else {
    res.status(404).json({ success: false, message: 'Notification not found' });
  }
});

app.put('/api/notifications/read-all', (req, res) => {
  notifications.forEach(n => n.read = true);
  res.json({ success: true, message: 'All notifications marked as read' });
});

// Team
app.get('/api/team', (req, res) => {
  res.json({ success: true, data: teamMembers });
});

// Support request
app.post('/api/support/request', (req, res) => {
  const { subject, message, priority } = req.body;
  res.status(201).json({
    success: true,
    message: 'Support request submitted successfully',
    data: {
      ticketId: 'TKT-' + Date.now(),
      subject,
      priority: priority || 'normal',
      status: 'open',
      createdAt: new Date().toISOString()
    }
  });
});

// Contact form
app.post('/api/contact', (req, res) => {
  const { name, email, company, message } = req.body;
  res.status(201).json({
    success: true,
    message: 'Thank you for contacting us. We will get back to you shortly.',
    data: {
      inquiryId: 'INQ-' + Date.now(),
      name,
      email,
      company,
      createdAt: new Date().toISOString()
    }
  });
});

// Demo request
app.post('/api/demo/request', (req, res) => {
  const { name, email, company, preferredDate } = req.body;
  res.status(201).json({
    success: true,
    message: 'Demo request received. Our team will contact you to confirm the schedule.',
    data: {
      demoId: 'DEMO-' + Date.now(),
      preferredDate,
      status: 'pending'
    }
  });
});

// Stats (public)
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    data: {
      fasterMarketEntry: '60%',
      clientSuccessRate: '95%',
      companiesLaunched: '50+',
      complianceGuaranteed: '100%'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🚀 Intersect OS API Server                          ║
  ║                                                       ║
  ║   Server running on: http://localhost:${PORT}            ║
  ║                                                       ║
  ║   Available endpoints:                                ║
  ║   • GET  /api/health          - Health check          ║
  ║   • POST /api/auth/login      - User login            ║
  ║   • POST /api/auth/register   - User registration     ║
  ║   • GET  /api/auth/me         - Get current user      ║
  ║   • GET  /api/services        - List all services     ║
  ║   • GET  /api/services/:id    - Get service details   ║
  ║   • POST /api/services/:id/launch  - Launch service   ║
  ║   • POST /api/services/:id/request - Request advisory ║
  ║   • GET  /api/documents       - List documents        ║
  ║   • POST /api/documents/upload - Upload document      ║
  ║   • GET  /api/progress        - Get market entry progress║
  ║   • GET  /api/notifications   - List notifications    ║
  ║   • GET  /api/team            - List team members     ║
  ║   • POST /api/support/request - Submit support ticket ║
  ║   • POST /api/contact         - Contact form          ║
  ║   • POST /api/demo/request    - Request demo          ║
  ║   • GET  /api/stats           - Public statistics     ║
  ║                                                       ║
  ║   Demo credentials:                                   ║
  ║   Email: demo@techcorp.com                            ║
  ║   Password: demo123                                   ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
});

export default app;
