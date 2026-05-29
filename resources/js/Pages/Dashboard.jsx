import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { Search, Download, Eye, AlertTriangle, CheckCircle, Printer } from 'lucide-react';

const API_URL = 'http://127.0.0.1:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    document_type: '',
    status: '',
    expiry_status: ''
  });
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [notifiedExpiries, setNotifiedExpiries] = useState(new Set()); // Track which applications have been notified

  // Document types for filtering
  const documentTypes = [
    { value: 'cv', label: 'CV' }, // Added CV
    { value: 'police_check', label: 'Police Check' },
    { value: 'proof_id', label: 'Proof of ID' },
    { value: 'ndis', label: 'NDIS Check' },
    { value: 'visa', label: 'Visa' },
    { value: 'certificate', label: 'Certificate' },
    { value: 'cpr', label: 'CPR Certificate' },
    { value: 'flu', label: 'Flu Vaccination' },
    { value: 'first_aid', label: 'First Aid' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'hired', label: 'Hired' }
  ];

  // Helper function to get full name
  const getFullName = (app) => {
    return `${app.first_name || ''} ${app.last_name || ''}`.trim();
  };

  // Fetch applications
  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.status) params.append('status', filters.status);
      if (filters.expiry_status) params.append('expiry_status', filters.expiry_status);
      
      const response = await api.get(`/api/applications?${params}`);
      const apps = response.data.data;
      // Add full_name to each application for easy access
      apps.forEach(app => {
        app.full_name = getFullName(app);
      });
      setApplications(apps);
      
      // Check for expiring documents after fetching
      checkExpiringDocuments(apps);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  // Check for expiring documents - shows only ONE notification per person
  const checkExpiringDocuments = (apps) => {
    apps.forEach(app => {
      if (app.expiring_documents && app.expiring_documents.length > 0) {
        // Check if we've already shown a notification for this application
        if (!notifiedExpiries.has(app.id)) {
          // Mark as notified
          setNotifiedExpiries(prev => new Set(prev).add(app.id));
          
          // Group all expiring documents
          const expiringDocs = app.expiring_documents;
          const hasExpired = expiringDocs.some(doc => Math.ceil(doc.days_until_expiry) <= 0);
          const expiringSoon = expiringDocs.filter(doc => Math.ceil(doc.days_until_expiry) > 0 && Math.ceil(doc.days_until_expiry) <= 30);
          
          // Create document list for display
          const docList = expiringDocs.map(doc => {
            const daysLeft = Math.ceil(doc.days_until_expiry);
            return `• ${doc.document}: ${daysLeft <= 0 ? 'EXPIRED' : `${daysLeft} days left`}`;
          }).join('\n');
          
          // Show single notification with all expiring documents
          toast(
            (t) => (
              <div className="flex flex-col gap-2 min-w-[300px]">
                <div className="flex items-center gap-2">
                  {hasExpired ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" style={{ color: '#EF8354' }} />
                  )}
                  <p className="font-semibold" style={{ color: hasExpired ? '#dc2626' : '#EF8354' }}>
                    {hasExpired ? 'Document(s) Expired!' : 'Document(s) Expiring Soon!'}
                  </p>
                </div>
                <p className="text-sm font-medium">{app.full_name}</p>
                <div className="text-xs whitespace-pre-line" style={{ color: '#4a6a6d' }}>
                  {docList}
                </div>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    viewApplication(app.id);
                  }}
                  className="text-sm font-semibold underline mt-1 self-start"
                  style={{ color: '#20757D' }}
                >
                  View Application Details →
                </button>
              </div>
            ),
            {
              duration: 10000,
              icon: hasExpired ? '❌' : '⚠️',
              style: {
                background: hasExpired ? '#FEE2E2' : '#FFF3E0',
                color: hasExpired ? '#dc2626' : '#EF8354',
                border: `1px solid ${hasExpired ? '#dc2626' : '#EF8354'}`,
                maxWidth: '400px'
              }
            }
          );
        }
      }
    });
  };

  useEffect(() => {
    fetchApplications();
  }, [filters.search, filters.status, filters.expiry_status]);

  const viewApplication = async (id) => {
    try {
      const response = await api.get(`/api/applications/${id}`);
      const app = response.data;
      app.full_name = getFullName(app);
      setSelectedApp(app);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching application details:', error);
      toast.error('Failed to fetch application details');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/applications/${id}`, { status });
      toast.success('Application status updated');
      fetchApplications();
      if (selectedApp && selectedApp.id === id) {
        setSelectedApp({ ...selectedApp, status });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#EF8354',
      reviewed: '#20757D',
      shortlisted: '#25A227',
      rejected: '#dc2626',
      hired: '#059669'
    };
    return colors[status] || '#6b7280';
  };

  // Print all applications
  const handlePrintAll = () => {
    const printWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleString();
    
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Applications Report - ${currentDate}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #20757D; }
          .header h1 { color: #20757D; margin: 0; font-size: 24px; }
          .header p { color: #666; margin: 5px 0 0; }
          .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
          .stat-card { background: #f8f7f3; padding: 15px; border-radius: 8px; text-align: center; border: 1px solid #e2e8f0; }
          .stat-card h3 { margin: 0 0 5px; font-size: 12px; color: #666; text-transform: uppercase; }
          .stat-card p { margin: 0; font-size: 24px; font-weight: bold; color: #20757D; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th { background-color: #f8f7f3; padding: 12px; text-align: left; font-size: 12px; font-weight: bold; color: #4a6a6d; border-bottom: 2px solid #e2e8f0; }
          td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 12px; }
          .status-badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
          .footer { margin-top: 30px; padding-top: 20px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #e2e8f0; }
          @media print { body { margin: 0; padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Applications Report</h1>
          <p>Generated on: ${currentDate}</p>
        </div>
        
        <div class="stats">
          <div class="stat-card"><h3>Total Applications</h3><p>${applications.length}</p></div>
          <div class="stat-card"><h3>Expiring Soon</h3><p>${applications.filter(app => app.expiring_documents?.length > 0).length}</p></div>
          <div class="stat-card"><h3>Pending Review</h3><p>${applications.filter(app => app.status === 'pending').length}</p></div>
          <div class="stat-card"><h3>Hired</h3><p>${applications.filter(app => app.status === 'hired').length}</p></div>
        </div>
        
        <table>
          <thead><tr><th>Applicant</th><th>Position</th><th>Location</th><th>Status</th></tr></thead>
          <tbody>
            ${applications.map(app => `
              <tr>
                <td><strong>${getFullName(app)}</strong><br><small>${app.email}</small><br><small>${app.phone}</small></td>
                <td>${app.vacancy_title}<br><small>${app.vacancy_type}</small></td>
                <td>${app.vacancy_location}</td>
                <td><span class="status-badge" style="background: ${getStatusColor(app.status)}20; color: ${getStatusColor(app.status)}">${app.status.toUpperCase()}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="footer"><p>© ${new Date().getFullYear()} 3C Nursing - All Rights Reserved</p></div>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  // Print single application
  const printApplication = (application) => {
    const printWindow = window.open('', '_blank');
    const currentDate = new Date().toLocaleString();
    const fullName = getFullName(application);
    
    const documentTypesForPrint = [
      { key: 'cv', label: 'Curriculum Vitae (CV)', hasExpiry: false }, // Added CV
      { key: 'police_check', label: 'Police Check', hasExpiry: true },
      { key: 'proof_id', label: 'Proof of ID', hasExpiry: true },
      { key: 'tfn', label: 'TFN Declaration', hasExpiry: false },
      { key: 'ndis', label: 'NDIS Check', hasExpiry: true },
      { key: 'statutory', label: 'Statutory Declaration', hasExpiry: false },
      { key: 'visa', label: 'Visa', hasExpiry: true },
      { key: 'certificate', label: 'Certificate', hasExpiry: true },
      { key: 'injury', label: 'Pre-existing Injury Declaration', hasExpiry: false },
      { key: 'cpr', label: 'CPR Certificate', hasExpiry: true },
      { key: 'flu', label: 'Flu Vaccination', hasExpiry: true },
      { key: 'first_aid', label: 'First Aid', hasExpiry: true }
    ];
    
    const getExpiryStatus = (expiryDate) => {
      if (!expiryDate) return null;
      const daysUntilExpiry = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
      if (daysUntilExpiry < 0) return { text: 'Expired' };
      if (daysUntilExpiry <= 30) return { text: `${daysUntilExpiry} days left` };
      return { text: 'Valid' };
    };
    
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Application Details - ${fullName}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
          .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #20757D; }
          .header h1 { color: #20757D; margin: 0; font-size: 24px; }
          .header p { color: #666; margin: 5px 0 0; }
          .section { margin-bottom: 25px; }
          .section-title { font-size: 18px; font-weight: bold; color: #20757D; margin-bottom: 15px; padding-bottom: 5px; border-bottom: 1px solid #e2e8f0; }
          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .info-item { padding: 8px; background: #f8f7f3; border-radius: 5px; }
          .info-label { font-size: 11px; color: #666; margin-bottom: 3px; }
          .info-value { font-size: 14px; font-weight: 500; color: #333; }
          .document-item { padding: 8px; margin-bottom: 5px; background: #f8f7f3; border-radius: 5px; display: flex; justify-content: space-between; }
          .status-badge { display: inline-block; padding: 4px 8px; border-radius: 12px; font-size: 11px; font-weight: bold; }
          .uploaded { color: #25A227; font-weight: bold; }
          .not-uploaded { color: #94a3b8; }
          .footer { margin-top: 30px; padding-top: 20px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Application Details</h1>
          <p>Generated on: ${currentDate}</p>
        </div>
        
        <div class="section">
          <div class="section-title">Personal Information</div>
          <div class="info-grid">
            <div class="info-item"><div class="info-label">Full Name</div><div class="info-value">${fullName}</div></div>
            <div class="info-item"><div class="info-label">Email</div><div class="info-value">${application.email || 'Not provided'}</div></div>
            <div class="info-item"><div class="info-label">Phone</div><div class="info-value">${application.phone || 'Not provided'}</div></div>
            <div class="info-item"><div class="info-label">Date of Birth</div><div class="info-value">${application.dob ? new Date(application.dob).toLocaleDateString() : 'Not provided'}</div></div>
            <div class="info-item"><div class="info-label">Gender</div><div class="info-value">${application.gender || 'Not provided'}</div></div>
            <div class="info-item"><div class="info-label">Address</div><div class="info-value">${application.address || 'Not provided'}</div></div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Position Details</div>
          <div class="info-grid">
            <div class="info-item"><div class="info-label">Position</div><div class="info-value">${application.vacancy_title || 'Not provided'}</div></div>
            <div class="info-item"><div class="info-label">Type</div><div class="info-value">${application.vacancy_type || 'Not provided'}</div></div>
            <div class="info-item"><div class="info-label">Location</div><div class="info-value">${application.vacancy_location || 'Not provided'}</div></div>
            <div class="info-item"><div class="info-label">Status</div><div class="info-value"><span class="status-badge" style="background: ${getStatusColor(application.status)}20; color: ${getStatusColor(application.status)}">${application.status ? application.status.toUpperCase() : 'PENDING'}</span></div></div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-title">Documents</div>
          ${documentTypesForPrint.map(doc => {
            const isUploaded = application[`${doc.key}_path`] && application[`${doc.key}_path`] !== null;
            const expiry = application[`${doc.key}_expiry`];
            const expiryStatus = getExpiryStatus(expiry);
            return `
              <div class="document-item">
                <span>${doc.label}</span>
                <span>${isUploaded ? '<span class="uploaded">✓ Uploaded</span>' : '<span class="not-uploaded">✗ Not uploaded</span>'}${expiry ? ` - ${expiryStatus.text} (${new Date(expiry).toLocaleDateString()})` : ''}</span>
              </div>
            `;
          }).join('')}
        </div>
        
        <div class="section">
          <div class="section-title">COVID-19 Vaccination</div>
          <div class="info-grid">
            <div class="info-item"><div class="info-label">Dose 1</div><div class="info-value">${application.covid_dose1 ? new Date(application.covid_dose1).toLocaleDateString() : 'Not provided'}</div></div>
            <div class="info-item"><div class="info-label">Dose 2</div><div class="info-value">${application.covid_dose2 ? new Date(application.covid_dose2).toLocaleDateString() : 'Not provided'}</div></div>
            <div class="info-item"><div class="info-label">Dose 3</div><div class="info-value">${application.covid_dose3 ? new Date(application.covid_dose3).toLocaleDateString() : 'Not provided'}</div></div>
          </div>
        </div>
        
        ${application.notes ? `<div class="section"><div class="section-title">Notes</div><div class="info-item"><div class="info-value">${application.notes}</div></div></div>` : ''}
        
        <div class="footer"><p>© ${new Date().getFullYear()} 3C Nursing - All Rights Reserved</p></div>
      </body>
      </html>
    `;
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f7f3' }}>
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header with Print Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: '#0f2d2f' }}>
              Applications Dashboard
            </h1>
            <p className="text-sm" style={{ color: '#4a6a6d' }}>
              Manage and track all job applications with document expiry monitoring
            </p>
          </div>
          <button
            onClick={handlePrintAll}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 shadow-md"
            style={{ backgroundColor: '#20757D' }}
          >
            <Printer className="w-5 h-5" />
            Print Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl p-5 bg-white shadow-sm">
            <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#4a6a6d' }}>Total Applications</p>
            <p className="text-3xl font-bold" style={{ color: '#0f2d2f' }}>{applications.length}</p>
          </div>
          <div className="rounded-xl p-5 bg-white shadow-sm">
            <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#4a6a6d' }}>Expiring Soon</p>
            <p className="text-3xl font-bold" style={{ color: '#EF8354' }}>
              {applications.filter(app => app.expiring_documents?.length > 0).length}
            </p>
          </div>
          <div className="rounded-xl p-5 bg-white shadow-sm">
            <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#4a6a6d' }}>Pending Review</p>
            <p className="text-3xl font-bold" style={{ color: '#20757D' }}>
              {applications.filter(app => app.status === 'pending').length}
            </p>
          </div>
          <div className="rounded-xl p-5 bg-white shadow-sm">
            <p className="text-xs uppercase tracking-wide mb-2" style={{ color: '#4a6a6d' }}>Hired</p>
            <p className="text-3xl font-bold" style={{ color: '#25A227' }}>
              {applications.filter(app => app.status === 'hired').length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search by name, email, or position..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-teal-500"
                  style={{ borderColor: '#e2e8f0' }}
                />
              </div>
            </div>
            
            <div className="min-w-[150px]">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-teal-500"
                style={{ borderColor: '#e2e8f0' }}
              >
                <option value="">All Status</option>
                {statusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            
            <div className="min-w-[150px]">
              <select
                value={filters.expiry_status}
                onChange={(e) => setFilters({ ...filters, expiry_status: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-teal-500"
                style={{ borderColor: '#e2e8f0' }}
              >
                <option value="">All Expiry Status</option>
                <option value="expiring_soon">Expiring Soon (&lt;30 days)</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#f8f7f3' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4a6a6d' }}>Applicant</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4a6a6d' }}>Position</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4a6a6d' }}>Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4a6a6d' }}>Documents</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: '#4a6a6d' }}>Expiring Documents</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: '#4a6a6d' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#e2e8f0' }}>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#20757D' }}></div>
                      </div>
                    </td>
                  </tr>
                ) : applications.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center" style={{ color: '#94a3b8' }}>
                      No applications found
                    </td>
                  </tr>
                ) : (
                  applications.map(app => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium" style={{ color: '#0f2d2f' }}>{getFullName(app)}</p>
                          <p className="text-xs" style={{ color: '#94a3b8' }}>{app.email}</p>
                          <p className="text-xs" style={{ color: '#94a3b8' }}>{app.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium" style={{ color: '#0f2d2f' }}>{app.vacancy_title}</p>
                        <p className="text-xs" style={{ color: '#94a3b8' }}>{app.vacancy_location}</p>
                        <p className="text-xs" style={{ color: '#EF8354' }}>{app.vacancy_type}</p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={app.status}
                          onChange={(e) => updateStatus(app.id, e.target.value)}
                          className="px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer focus:ring-2 focus:ring-teal-500"
                          style={{
                            backgroundColor: `${getStatusColor(app.status)}20`,
                            color: getStatusColor(app.status)
                          }}
                        >
                          {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1 flex-wrap">
                          {documentTypes.slice(0, 3).map(doc => {
                            const hasDoc = app[`${doc.value}_path`];
                            return hasDoc ? (
                              <span key={doc.value} className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs" style={{ backgroundColor: '#25A22720', color: '#25A227' }}>
                                <CheckCircle className="w-3 h-3" />
                                {doc.label}
                              </span>
                            ) : null;
                          })}
                          {documentTypes.filter(doc => app[`${doc.value}_path`]).length > 3 && (
                            <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600">
                              +{documentTypes.filter(doc => app[`${doc.value}_path`]).length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {app.expiring_documents && app.expiring_documents.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {app.expiring_documents.slice(0, 2).map((doc, idx) => {
                              const daysLeft = Math.ceil(doc.days_until_expiry);
                              return (
                                <div key={idx} className="flex items-center gap-1 text-xs">
                                  <AlertTriangle className="w-3 h-3" style={{ color: daysLeft <= 0 ? '#dc2626' : '#EF8354' }} />
                                  <span style={{ color: daysLeft <= 0 ? '#dc2626' : '#EF8354' }}>
                                    {doc.document}: {daysLeft <= 0 ? 'Expired' : `${daysLeft} days left`}
                                  </span>
                                </div>
                              );
                            })}
                            {app.expiring_documents.length > 2 && (
                              <span className="text-xs text-gray-500">+{app.expiring_documents.length - 2} more</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-green-600">All documents valid</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => printApplication(app)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="Print Application"
                          >
                            <Printer className="w-4 h-4" style={{ color: '#EF8354' }} />
                          </button>
                          <button
                            onClick={() => viewApplication(app.id)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" style={{ color: '#20757D' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {showModal && selectedApp && (
        <ApplicationDetailModal
          application={selectedApp}
          onClose={() => setShowModal(false)}
          onUpdateStatus={updateStatus}
          onPrint={printApplication}
        />
      )}
    </div>
  );
};

// Application Detail Modal Component
const ApplicationDetailModal = ({ application, onClose, onUpdateStatus, onPrint }) => {
  const [notes, setNotes] = useState(application.notes || '');
  const [savingNotes, setSavingNotes] = useState(false);

  const getFullName = (app) => {
    return `${app.first_name || ''} ${app.last_name || ''}`.trim();
  };

  const documentTypes = [
    { key: 'cv', label: 'Curriculum Vitae (CV)', hasExpiry: false }, // Added CV
    { key: 'police_check', label: 'Police Check', hasExpiry: true },
    { key: 'proof_id', label: 'Proof of ID', hasExpiry: true },
    { key: 'tfn', label: 'TFN Declaration', hasExpiry: false },
    { key: 'ndis', label: 'NDIS Check', hasExpiry: true },
    { key: 'statutory', label: 'Statutory Declaration', hasExpiry: false },
    { key: 'visa', label: 'Visa', hasExpiry: true },
    { key: 'certificate', label: 'Certificate', hasExpiry: true },
    { key: 'injury', label: 'Pre-existing Injury Declaration', hasExpiry: false },
    { key: 'cpr', label: 'CPR Certificate', hasExpiry: true },
    { key: 'flu', label: 'Flu Vaccination', hasExpiry: true },
    { key: 'first_aid', label: 'First Aid', hasExpiry: true }
  ];

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return null;
    const daysUntilExpiry = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (daysUntilExpiry < 0) return { color: '#dc2626', text: 'Expired' };
    if (daysUntilExpiry <= 30) return { color: '#EF8354', text: `${daysUntilExpiry} days left` };
    return { color: '#25A227', text: 'Valid' };
  };

  const saveNotes = async () => {
    setSavingNotes(true);
    try {
      await api.put(`/api/applications/${application.id}`, { notes });
      toast.success('Notes saved successfully');
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error('Failed to save notes');
    } finally {
      setSavingNotes(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-8 py-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#0f2d2f' }}>{getFullName(application)}</h2>
            <p className="text-sm" style={{ color: '#4a6a6d' }}>{application.vacancy_title} - {application.vacancy_location}</p>
            <p className="text-xs mt-1" style={{ color: '#EF8354' }}>{application.vacancy_type}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPrint(application)}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              title="Print"
            >
              <Printer className="w-4 h-4" style={{ color: '#EF8354' }} />
            </button>
            <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Personal Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f2d2f' }}>Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Full Name</p>
                <p className="text-sm" style={{ color: '#0f2d2f' }}>{getFullName(application)}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Email</p>
                <p className="text-sm" style={{ color: '#0f2d2f' }}>{application.email}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Phone</p>
                <p className="text-sm" style={{ color: '#0f2d2f' }}>{application.phone}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Date of Birth</p>
                <p className="text-sm" style={{ color: '#0f2d2f' }}>{application.dob ? new Date(application.dob).toLocaleDateString() : 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Gender</p>
                <p className="text-sm" style={{ color: '#0f2d2f' }}>{application.gender}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs" style={{ color: '#94a3b8' }}>Address</p>
                <p className="text-sm" style={{ color: '#0f2d2f' }}>{application.address}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f2d2f' }}>Documents</h3>
            <div className="space-y-3">
              {documentTypes.map(doc => {
                const isUploaded = application[`${doc.key}_path`] && application[`${doc.key}_path`] !== null;
                const filePath = application[`${doc.key}_path`];
                const expiry = application[`${doc.key}_expiry`];
                const expiryStatus = getExpiryStatus(expiry);
                
                return (
                  <div key={doc.key} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#f8f7f3' }}>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#0f2d2f' }}>{doc.label}</p>
                      {expiry && (
                        <p className="text-xs mt-1" style={{ color: expiryStatus?.color }}>
                          {expiryStatus?.text} - Expires: {new Date(expiry).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {isUploaded && filePath ? (
                      <a
                        href={`${API_URL}/storage/${filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors hover:opacity-80"
                        style={{ backgroundColor: '#20757D', color: 'white' }}
                      >
                        <Download className="w-4 h-4" />
                        View
                      </a>
                    ) : (
                      <span className="text-sm" style={{ color: '#94a3b8' }}>Not uploaded</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* COVID Doses */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f2d2f' }}>COVID-19 Vaccination</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f7f3' }}>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Dose 1</p>
                <p className="text-sm" style={{ color: '#0f2d2f' }}>{application.covid_dose1 ? new Date(application.covid_dose1).toLocaleDateString() : 'Not provided'}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f7f3' }}>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Dose 2</p>
                <p className="text-sm" style={{ color: '#0f2d2f' }}>{application.covid_dose2 ? new Date(application.covid_dose2).toLocaleDateString() : 'Not provided'}</p>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#f8f7f3' }}>
                <p className="text-xs" style={{ color: '#94a3b8' }}>Dose 3</p>
                <p className="text-sm" style={{ color: '#0f2d2f' }}>{application.covid_dose3 ? new Date(application.covid_dose3).toLocaleDateString() : 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#0f2d2f' }}>Notes</h3>
            <div className="flex gap-2">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about this application..."
                className="flex-1 p-3 rounded-lg border outline-none focus:ring-2 focus:ring-teal-500"
                rows="3"
                style={{ borderColor: '#e2e8f0' }}
              />
              <button
                onClick={saveNotes}
                disabled={savingNotes}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-80 self-start"
                style={{ backgroundColor: '#20757D' }}
              >
                {savingNotes ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Status Update */}
          <div className="flex justify-end gap-3">
            <button
              onClick={() => onUpdateStatus(application.id, 'rejected')}
              className="px-6 py-2 rounded-full text-sm font-medium border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#dc2626', color: '#dc2626' }}
            >
              Reject
            </button>
            <button
              onClick={() => onUpdateStatus(application.id, 'shortlisted')}
              className="px-6 py-2 rounded-full text-sm font-medium text-white transition-colors hover:opacity-80"
              style={{ backgroundColor: '#20757D' }}
            >
              Shortlist
            </button>
            <button
              onClick={() => onUpdateStatus(application.id, 'hired')}
              className="px-6 py-2 rounded-full text-sm font-medium text-white transition-colors hover:opacity-80"
              style={{ backgroundColor: '#25A227' }}
            >
              Hire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;