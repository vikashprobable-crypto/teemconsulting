import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import AccountingAuditing from './pages/services/AccountingAuditing'
import TaxationCompliance from './pages/services/TaxationCompliance'
import CFOManagementAccounting from './pages/services/CFOManagementAccounting'
import FinancialServices from './pages/services/FinancialServices'
import CorporateServices from './pages/services/CorporateServices'
import Contact from './pages/Contact'

// Admin Components
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ServicesManagement from './pages/admin/ServicesManagement'
import ServiceForm from './pages/admin/ServiceForm'
import TeamManagement from './pages/admin/TeamManagement'
import TeamForm from './pages/admin/TeamForm'
import GalleryManagement from './pages/admin/GalleryManagement'
import ClientsManagement from './pages/admin/ClientsManagement'
import AssetsManagement from './pages/admin/AssetsManagement'
import AdminLogsManagement from './pages/admin/AdminLogsManagement'
import TestimonialsManagement from './pages/admin/TestimonialsManagement'
import StatsManagement from './pages/admin/StatsManagement'
import ContactManagement from './pages/admin/ContactManagement'
import FAQManagement from './pages/admin/FAQManagement'
import HomeManagement from './pages/admin/HomeManagement'
import DataManagement from './pages/admin/DataManagement'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/services" element={<Layout><Services /></Layout>} />
      <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
      <Route path="/services/accounting-auditing" element={<Layout><AccountingAuditing /></Layout>} />
      <Route path="/services/taxation-compliance" element={<Layout><TaxationCompliance /></Layout>} />
      <Route path="/services/cfo-management-accounting" element={<Layout><CFOManagementAccounting /></Layout>} />
      <Route path="/services/financial-services" element={<Layout><FinancialServices /></Layout>} />
      <Route path="/services/corporate-services" element={<Layout><CorporateServices /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      
      {/* Admin Login Route */}
      <Route path="/admin/login" element={<Login />} />
      
      {/* Admin Routes - Protected */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="home" element={<HomeManagement />} />
        <Route path="services" element={<ServicesManagement />} />
        <Route path="services/new" element={<ServiceForm />} />
        <Route path="services/edit/:id" element={<ServiceForm />} />
        <Route path="team" element={<TeamManagement />} />
        <Route path="team/new" element={<TeamForm />} />
        <Route path="team/edit/:id" element={<TeamForm />} />
        <Route path="gallery" element={<GalleryManagement />} />
        <Route path="clients" element={<ClientsManagement />} />
        <Route path="assets" element={<AssetsManagement />} />
        <Route path="logs" element={<AdminLogsManagement />} />
        <Route path="testimonials" element={<TestimonialsManagement />} />
        <Route path="stats" element={<StatsManagement />} />
        <Route path="contact" element={<ContactManagement />} />
        <Route path="faq" element={<FAQManagement />} />
        <Route path="data" element={<DataManagement />} />
      </Route>
    </Routes>
  )
}

export default App
