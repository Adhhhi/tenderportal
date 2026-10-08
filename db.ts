import mongoose from 'mongoose';
import { UserModel as MongoUserModel } from './models/User';
import { TenderModel as MongoTenderModel } from './models/Tender';
import { BidModel as MongoBidModel } from './models/Bid';
import { NotificationModel as MongoNotificationModel } from './models/Notification';
import { AuditLogModel as MongoAuditLogModel } from './models/AuditLog';
import { EnquiryModel as MongoEnquiryModel } from './models/Enquiry';


const SAMPLE_VENDORS = [
  {
    uid: 'vendor_1',
    email: 'maritime_solutions@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Maritime Engineering Solutions Ltd.',
    phone: '+91 98765 43210',
    address: 'Industrial Area, Mangalore, Karnataka',
    password: 'password',
    gstNumber: '29ABCDE1234F1Z5',
    gstin: '29ABCDE1234F1Z5',
    contactPerson: 'Vijay Kumar',
    website: 'https://maritimesolutions.com',
    department: 'marine',
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    documents: [
      { id: 'doc_101', name: 'NMPA_GST_Certificate_29ABCDE1234F1Z5.pdf', type: 'GST Document', size: '1.4 MB', date: '2025-08-14', url: '/documents/GST_29ABCDE1234F1Z5.pdf' },
      { id: 'doc_102', name: 'Pan_Card_Verification_ABCDE1234F.pdf', type: 'PAN Document', size: '890 KB', date: '2025-08-15', url: '/documents/PAN_ABCDE1234F.pdf' },
      { id: 'doc_103', name: 'Certificate_of_Incorporation_Maritime.pdf', type: 'Registration License', size: '2.8 MB', date: '2025-08-16', url: '/documents/Incorporation_Maritime.pdf' },
      { id: 'doc_104', name: 'Audited_Financial_Statement_FY2025.pdf', type: 'Financial Auditing', size: '3.1 MB', date: '2025-09-01', url: '/documents/Financial_Audit_2025.pdf' }
    ]
  },
  {
    uid: 'vendor_2',
    email: 'port_constructions@example.com',
    role: 'vendor',
    status: 'pending',
    companyName: 'Port-Side Infrastructure Corp',
    phone: '+91 98765 00001',
    address: 'Business Park, Panambur, Karnataka',
    password: 'password',
    gstNumber: '29FGHIJ5678K2Z9',
    gstin: '29FGHIJ5678K2Z9',
    contactPerson: 'Rajesh Nair',
    website: 'https://portinfra.com',
    department: 'civil',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_3',
    email: 'shipyard_tech@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Global Shipyard Technologies',
    phone: '+91 99887 76655',
    address: 'Special Economic Zone, Udupi, Karnataka',
    password: 'password',
    gstNumber: '29KLMNO9012L3Z1',
    gstin: '29KLMNO9012L3Z1',
    contactPerson: 'Amit Patel',
    website: 'https://globalshipyard.com',
    department: 'marine',
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_4',
    email: 'oceanic_logistics@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Oceanic Logistics & Supply',
    phone: '+91 91234 56789',
    address: 'Port Trust Colony, Mangalore',
    password: 'password',
    gstNumber: '29PQRST3456M4Z2',
    gstin: '29PQRST3456M4Z2',
    contactPerson: 'Nisha Pillai',
    website: 'https://oceaniclogistics.com',
    department: 'traffic',
    createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_5',
    email: 'apex_marine@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Apex Marine Dredging Pvt. Ltd.',
    phone: '+91 94432 10987',
    address: 'Harbour Road, Cochin, Kerala',
    password: 'password',
    gstNumber: '29UVWXY7890N5Z8',
    gstin: '29UVWXY7890N5Z8',
    contactPerson: 'Ramanand Bhat',
    website: 'https://apexmarine.com',
    department: 'mechanical',
    createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_6',
    email: 'karnataka_port@example.com',
    role: 'vendor',
    status: 'pending',
    companyName: 'Karnataka Port Constructions Co.',
    phone: '+91 98450 12345',
    address: 'NH-66, Baikampady, Mangalore',
    password: 'password',
    gstNumber: '29ZABCDE3210P6Z3',
    gstin: '29ZABCDE3210P6Z3',
    contactPerson: 'Gururaj Acharya',
    website: 'https://karnatakaport.com',
    department: 'civil',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_7',
    email: 'mangalore_elec@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Mangalore Marine Electricals',
    phone: '+91 99001 88776',
    address: 'Urwa Market, Mangalore',
    password: 'password',
    gstNumber: '29QWERT9876Q7Z4',
    gstin: '29QWERT9876Q7Z4',
    contactPerson: 'Somnath Shetty',
    website: 'https://mangaloreelectricals.com',
    department: 'mechanical',
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_8',
    email: 'coastal_security@example.com',
    role: 'vendor',
    status: 'rejected',
    companyName: 'Coastal Security & Surveillance Systems',
    phone: '+91 91122 33445',
    address: 'Brigade Road, Bangalore',
    password: 'password',
    gstNumber: '29ASDFG5432R8Z0',
    gstin: '29ASDFG5432R8Z0',
    contactPerson: 'Col. Vikram Rathore',
    website: 'https://coastalsecuritech.com',
    department: 'administration',
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: false
  },
  {
    uid: 'vendor_24',
    email: 'karnataka_dredging@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Karnataka Dredging & Reclamation Corp',
    phone: '+91 98765 12340',
    address: 'Fisheries Harbour, Mangalore, Karnataka',
    password: 'password',
    gstNumber: '29KADRE1122F1Z8',
    gstin: '29KADRE1122F1Z8',
    contactPerson: 'Prathap Hegde',
    website: 'https://karnatakadredging.com',
    department: 'marine',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_25',
    email: 'western_port_builders@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Western Port Builders Pvt. Ltd.',
    phone: '+91 98765 12341',
    address: 'Kuloor Industrial Area, Mangalore, Karnataka',
    password: 'password',
    gstNumber: '29WEPOR3344K3Z7',
    gstin: '29WEPOR3344K3Z7',
    contactPerson: 'Giridhar Pai',
    website: 'https://westernportbuilders.com',
    department: 'civil',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_26',
    email: 'malpe_shipyard@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Malpe Shipyard & Allied Works',
    phone: '+91 99887 11223',
    address: 'Malpe Port Road, Udupi, Karnataka',
    password: 'password',
    gstNumber: '29MASHW5566L2Z3',
    gstin: '29MASHW5566L2Z3',
    contactPerson: 'Sanjeeva Karvi',
    website: 'https://malpeshipyard.com',
    department: 'marine',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_27',
    email: 'konkan_power@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Konkan Marine Power Systems',
    phone: '+91 91234 88776',
    address: 'Industrial Estate, Karwar, Karnataka',
    password: 'password',
    gstNumber: '29KOMAP7788M4Z5',
    gstin: '29KOMAP7788M4Z5',
    contactPerson: 'Vilas Naik',
    website: 'https://konkanpower.com',
    department: 'mechanical',
    createdAt: new Date().toISOString(),
    isActive: true
  },
  {
    uid: 'vendor_28',
    email: 'deccan_safe@example.com',
    role: 'vendor',
    status: 'approved',
    companyName: 'Deccan Safe Port Security Services',
    phone: '+91 94432 55443',
    address: 'Yeyyadi Industrial Area, Mangalore, Karnataka',
    password: 'password',
    gstNumber: '29DESAP9900N5Z2',
    gstin: '29DESAP9900N5Z2',
    contactPerson: 'Sathish Bhandary',
    website: 'https://deccansafeport.com',
    department: 'administration',
    createdAt: new Date().toISOString(),
    isActive: true
  }
];

const SAMPLE_TENDERS = [
  {
    title: 'Deepening of Approach Channel & Maneuvering Basin',
    description: 'Dredging works for deepening the approach channel to accommodate larger vessels up to 14.5m draft. Includes removal of rocky outcrops and maintenance dredging.',
    refNumber: 'NMPA/DREDGE/2026/04',
    status: 'published',
    category: 'Dredging Works',
    budget: 450000000,
    workflowStage: 4,
    publishDate: new Date().toISOString(),
    closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'NIT_Dredging_Channel.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' },
      { name: 'Technical_Specification_Dredge.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' },
      { name: 'BOQ_Dredging_Basin.xlsx', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'financial' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Construction of New Cargo Berth No. 17',
    description: 'Design and construction of a multipurpose cargo berth with all ancillary facilities including crane rails and cargo storage area.',
    refNumber: 'NMPA/CIVIL/2026/12',
    status: 'review',
    category: 'Civil Construction',
    budget: 850000000,
    workflowStage: 2,
    publishDate: new Date().toISOString(),
    closingDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Notice_Inviting_Tender_Berth17.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' },
      { name: 'Engineering_Drawings_Berth17.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Modernization of Terminal Surveillance System',
    description: 'Installation of high-definition PTZ cameras, thermal sensors, and a centralized control room for 24/7 port security monitoring.',
    refNumber: 'NMPA/SEC/2026/09',
    status: 'awarded',
    category: 'IT & Security',
    budget: 120000000,
    workflowStage: 8,
    publishDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'CCTV_Surveillance_Specs.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Solar Power Plant Installation - Phase II',
    description: 'Procurement and installation of 5MW rooftop solar panels across warehouse buildings to promote green energy initiatives.',
    refNumber: 'NMPA/ELEC/2026/22',
    status: 'completed',
    category: 'Electrical Works',
    budget: 25000000,
    workflowStage: 11,
    publishDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'NIT_Solar_Phase2.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Annual Maintenance of Port Railway Siding',
    description: 'Routine maintenance and emergency repairs of the existing railway tracks within the port premises for the year 2026-27.',
    refNumber: 'NMPA/MAINT/2026/01',
    status: 'draft',
    category: 'Maintenance',
    budget: 15000000,
    workflowStage: 1,
    publishDate: '',
    closingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Railway_Siding_Scope.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Supply of High-Capacity Reach Stackers',
    description: 'Supply, commissioning and testing of 4 numbers of high-capacity reach stackers for container handling operations.',
    refNumber: 'NMPA/EQ/2026/15',
    status: 'published',
    category: 'Equipment Procurement',
    budget: 220000000,
    workflowStage: 4,
    publishDate: new Date().toISOString(),
    closingDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Equipment_Specs_ReachStackers.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' },
      { name: 'Maintenance_Agreement_Form.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Environmental Impact Assessment - Harbour Expansion',
    description: 'Consultancy services for conducting a comprehensive EIA for the proposed expansion of the outer harbour basin.',
    refNumber: 'NMPA/CONS/2026/03',
    status: 'evaluation',
    category: 'Consultancy',
    budget: 5000000,
    workflowStage: 7,
    publishDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'EIA_Consultancy_Terms.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Deployment of Automated Gate System (AGS)',
    description: 'Implementation of an automated gate system for efficient vehicle tracking and container identification using OCR and RFID.',
    refNumber: 'NMPA/IT/2026/45',
    status: 'draft',
    category: 'IT & Security',
    budget: 65000000,
    workflowStage: 1,
    publishDate: '',
    closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'AGS_Surveillance_Notice.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Refurbishment of Port Hospital Building',
    description: 'Renovation and structural repair works for the existing port hospital including electrical and plumbing upgrades.',
    refNumber: 'NMPA/CIVIL/2026/88',
    status: 'review',
    category: 'Civil Construction',
    budget: 35000000,
    workflowStage: 2,
    publishDate: '',
    closingDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Hospital_Renovation_Specs.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Procurement of Marine Fenders for Berth 14',
    description: 'Supply and installation of high-performance cone fenders to replace aging systems at the specialized cargo berth.',
    refNumber: 'NMPA/MAINT/2026/56',
    status: 'published',
    category: 'Maintenance',
    budget: 18000000,
    workflowStage: 4,
    publishDate: new Date().toISOString(),
    closingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Marine_Fender_NIT.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Technical Evaluation for Smart Port ERP',
    description: 'Ongoing technical assessment of bids received for the implementation of an integrated port-wide ERP solution.',
    refNumber: 'NMPA/IT/2026/102',
    status: 'evaluation',
    category: 'IT & Security',
    budget: 250000000,
    workflowStage: 7,
    publishDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'SmartPort_ERP_Requirements.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Contract Awarded: Port Fire Fighting System',
    description: 'Installation of a high-pressure fire hydrant network and foam system across the liquid cargo terminal.',
    refNumber: 'NMPA/SAFETY/2026/19',
    status: 'awarded',
    category: 'Mechanical Works',
    budget: 85000000,
    workflowStage: 8,
    publishDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Fire_Hydrant_Specs.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Completed: Shore-to-Ship Power Supply Ph-I',
    description: 'Successfully completed project for providing electrical shore power connections to vessels at berth to reduce emissions.',
    refNumber: 'NMPA/ELEC/2025/11',
    status: 'completed',
    category: 'Electrical Works',
    budget: 42000000,
    workflowStage: 11,
    publishDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'ShorePower_CompletionNotice.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Procurement of 2 Units of 65-Ton Post-Panamax Quay Cranes',
    description: 'Supply, installation, testing and commissioning of two post-panamax container handling quay cranes with a capacity of 65 tons under spreader, outreach of 50m.',
    refNumber: 'NMPA/EQ/2026/08',
    status: 'published',
    category: 'Equipment Procurement',
    budget: 1400000000,
    workflowStage: 4,
    publishDate: new Date().toISOString(),
    closingDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'NIT_QuayCranes_PostPanamax.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Design & Commissioning of automated Container Yard Security Monitoring & OCR gates',
    description: 'Implementation of high-speed OCR cameras, RFID scanners, and automated barrier systems at port entry gates, integrated with yard management system.',
    refNumber: 'NMPA/IT/2026/19',
    status: 'evaluation',
    category: 'IT & Security',
    budget: 320000000,
    workflowStage: 7,
    publishDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'OCR_Gates_SystemRequirements.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Construction of Deepwater Breakwater Protection Wall (South Extension)',
    description: 'Construction of 400m extension of rubble mound breakwater with tetrapods armour layer to provide shelter to the outer harbor basin.',
    refNumber: 'NMPA/CIVIL/2026/41',
    status: 'published',
    category: 'Civil Construction',
    budget: 2100000000,
    workflowStage: 4,
    publishDate: new Date().toISOString(),
    closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Breakwater_Extension_CivilNIT.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Rooftop Wind & Solar Hybrid Energy System - 10MW',
    description: 'Engineering, procurement, construction and grid synchronization of 10MW rooftop wind and solar hybrid plant at Port Warehousing Zone.',
    refNumber: 'NMPA/ELEC/2026/11',
    status: 'completed',
    category: 'Electrical Works',
    budget: 480000000,
    workflowStage: 11,
    publishDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'HybridEnergy_Specs.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Integrated Port Operations Control Center and ERP Customizations',
    description: 'Software development, customization, and implementation of integrated command center operations dashboard and port logistics ERP modules.',
    refNumber: 'NMPA/IT/2026/05',
    status: 'awarded',
    category: 'IT & Security',
    budget: 75000000,
    workflowStage: 8,
    publishDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'CommandCenter_ERP_Specs.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Procurement and Commissioning of 2 Twin-Screw Diesel Tugboats',
    description: 'Procurement, testing, delivery and commissioning of two brand new twin-screw diesel propulsion harbour tugboats with 60-ton bollard pull capacity.',
    refNumber: 'NMPA/EQ/2026/29',
    status: 'published',
    category: 'Equipment Procurement',
    budget: 420000000,
    workflowStage: 4,
    publishDate: new Date().toISOString(),
    closingDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Tugboat_Specifications_NIT.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Installation of Integrated Wave-Monitoring Buoy Network',
    description: 'Supply, mooring, and telemetry integration of wave-monitoring buoys in the port approach channel for real-time wave height, wind speed and tidal stream data transmission.',
    refNumber: 'NMPA/IT/2026/83',
    status: 'review',
    category: 'IT & Security',
    budget: 18000000,
    workflowStage: 2,
    publishDate: '',
    closingDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Buoy_Network_Layout_Draft.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Restoration and Painting of Administrative Headquarters',
    description: 'Comprehensive exterior/interior repair, waterproofing, concrete restoration, and premium acrylic painting of the main NMPA administrative headquarters building.',
    refNumber: 'NMPA/CIVIL/2026/104',
    status: 'draft',
    category: 'Civil Construction',
    budget: 12500000,
    workflowStage: 1,
    publishDate: '',
    closingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'HQ_Renovation_BOQ_Draft.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Technical Consultancy for Smart Traffic & Cargo Flow Optimization',
    description: 'Engagement of consultants to study and optimize the container cargo vehicle gate-in/gate-out queues, proposing smart scheduling and bypass lanes layout.',
    refNumber: 'NMPA/CONS/2026/11',
    status: 'evaluation',
    category: 'Consultancy',
    budget: 4500000,
    workflowStage: 7,
    publishDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Traffic_Flow_Consultancy_TOR.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'High-Voltage Substations Upgrades & Cabling at Berth 10 & 11',
    description: 'Replacing old transformers and laying new armored HT/LT underground cables to improve reliable power distribution at the bulk liquid cargo terminal.',
    refNumber: 'NMPA/ELEC/2026/34',
    status: 'awarded',
    category: 'Electrical Works',
    budget: 68000000,
    workflowStage: 8,
    publishDate: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Substation_Upgrade_NIT.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Annual Overhaul of Liquid Cargo Handling Pipelines',
    description: 'Inspection, ultrasonic thickness gauging, pipeline pressure testing, flange replacements, and anti-corrosive coating for port liquid cargo pipelines.',
    refNumber: 'NMPA/MAINT/2026/89',
    status: 'completed',
    category: 'Maintenance',
    budget: 35000000,
    workflowStage: 11,
    publishDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    closingDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Pipeline_Overhaul_Specs.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: 'Supply and Commissioning of Medical Equipment for Port Hospital',
    description: 'Procurement of advanced diagnostic ultrasound machinery, patient monitors, and defibrillators for NMPA port employee hospital expansion.',
    refNumber: 'NMPA/MED/2026/15',
    status: 'draft',
    category: 'Medical Services',
    budget: 8500000,
    workflowStage: 1,
    publishDate: '',
    closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    documents: [
      { name: 'Hospital_Equip_Specs_Draft.pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
    ],
    createdBy: 'admin_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const SAMPLE_ENQUIRIES = [
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@apexmarine.com',
    subject: 'Vendor Registration Issue',
    message: 'We submitted our PAN and GST documentation three days ago, but our vendor registration status is still showing as "Pending". Can you please expedite the review process as we want to submit a bid for the dredging tender closing next week?',
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    name: 'Sarah D\'Souza',
    email: 'sarah.dsouza@coastaltech.in',
    subject: 'Technical Glitch',
    message: 'While uploading the technical bid documents (PDF) for the Quay Cranes tender, the portal threw a timeout error. The file size is 28MB. Is there an upper limit on the file size, or is it a server issue? Please advise.',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    name: 'Vikram Singh',
    email: 'v.singh@karnatakaportconstructions.com',
    subject: 'Tender Bidding Inquiry',
    message: 'Could you please clarify if the bank guarantee for the EMD (Earnest Money Deposit) can be submitted from any scheduled commercial bank, or does it have to be from a nationalized bank only?',
    submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    name: 'Amit Patel',
    email: 'amit.patel@oceaniclogistics.com',
    subject: 'Payment / Audit Query',
    message: 'We have paid the tender document fee online, but the system has not updated the payment status. It still prompts us to pay when trying to download the technical specs. Transaction reference number is NMPA_TXN_987234.',
    submittedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  },
  {
    name: 'Nisha Pillai',
    email: 'nisha@globalshipyard.com',
    subject: 'Other Inquiry',
    message: 'We noticed a typo in the Bill of Quantities (BOQ) spreadsheet for the solar panel installation. Item 4.2 lists the unit of measurement as "meters" instead of "kilowatts". Could the authority please issue a corrigendum?',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  }
];


export let useSQLite = false;

export const UserModel = MongoUserModel;
export const TenderModel = MongoTenderModel;
export const BidModel = MongoBidModel;
export const NotificationModel = MongoNotificationModel;
export const AuditLogModel = MongoAuditLogModel;
export const EnquiryModel = MongoEnquiryModel;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nmpa-tender-portal';
  const maskedUri = uri.replace(/:([^@]+)@/, ':****@');
  
  // 1. Try configured MongoDB URI (Cloud Atlas or custom) with 4s timeout
  try {
    console.log(`> Connecting to MongoDB Cloud Atlas (${maskedUri})...`);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
    console.log(`> MongoDB Connected: ${maskedUri}`);
    await autoSeed();
    return;
  } catch (error: any) {
    console.warn(`> MongoDB Cloud Atlas connection unavailable (${error.message || 'Timeout/IP Whitelist issue'}).`);
  }

  // 2. Fallback to Local MongoDB instance with 3s timeout
  try {
    const localUri = 'mongodb://127.0.0.1:27017/nmpa-tender-portal';
    console.log(`> Attempting fallback to local MongoDB (${localUri})...`);
    await mongoose.connect(localUri, { serverSelectionTimeoutMS: 3000 });
    console.log(`> Local MongoDB Connected: ${localUri}`);
    await autoSeed();
    return;
  } catch (localErr: any) {
    console.warn(`> Local MongoDB not running on port 27017.`);
  }

  console.log(`> SERVER RUNNING: Database proxy running in Client-Side Fallback Engine mode.`);
}

export async function autoSeed() {
  try {
    const adminUser = await UserModel.findOne({ email: 'admin@nmpa.com' }).exec();
    const bidCount = await BidModel.countDocuments();
    if (!adminUser || bidCount === 0 || !adminUser.gstin) {
      console.log('> Database is missing core dummy data, bids or profile details. Seeding/re-seeding dummy data...');
      await seedData();
      console.log('> Seeding completed successfully.');
    } else {
      console.log('> Database contains default data and bids. Seeding skipped.');
    }
  } catch (error) {
    console.error('> Auto-seeding failed:', error);
  }
}

const getDepartmentForCategory = (cat?: string, title?: string): string => {
  const c = (cat || '').toLowerCase();
  const t = (title || '').toLowerCase();
  if (t.includes('hospital') || t.includes('medical') || t.includes('health')) return 'medical';
  if (c.includes('civil') || t.includes('berth') || t.includes('breakwater') || t.includes('construction')) return 'civil';
  if (c.includes('dredging') || t.includes('channel') || t.includes('tugboat') || t.includes('buoy') || t.includes('marine') || t.includes('pipeline') || t.includes('fender')) return 'marine';
  if (c.includes('electrical') || c.includes('mechanical') || t.includes('solar') || t.includes('power') || t.includes('crane') || t.includes('stacker') || t.includes('fire fighting') || t.includes('substation') || t.includes('hybrid')) return 'mechanical';
  if (t.includes('traffic') || t.includes('gate') || t.includes('ocr') || t.includes('ags')) return 'traffic';
  if (t.includes('erp') || t.includes('control center') || t.includes('finance') || t.includes('audit')) return 'finance';
  if (t.includes('headquarters') || t.includes('surveillance') || t.includes('security') || t.includes('admin')) return 'administration';
  
  // Fallbacks
  if (c.includes('it') || c.includes('security')) return 'traffic';
  if (c.includes('maintenance')) return 'civil';
  return 'administration';
};

export async function seedData() {
  // Clear collections first
  await UserModel.deleteMany({});
  await TenderModel.deleteMany({});
  await BidModel.deleteMany({});
  await NotificationModel.deleteMany({});
  await AuditLogModel.deleteMany({});
  await EnquiryModel.deleteMany({});

  // 1. Seed admin users
  const adminUsers = [
    {
      uid: 'admin_1',
      email: 'admin@nmpa.com',
      role: 'admin',
      status: 'approved',
      companyName: 'NMPA Admin Authority',
      phone: '9988776655',
      password: 'admin',
      gstNumber: '29NMPAA1234A1Z0',
      gstin: '29NMPAA1234A1Z0',
      contactPerson: 'Shri. A. V. Ramana',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      uid: 'admin_2',
      email: 'admin_sec@nmpa.com',
      role: 'admin',
      status: 'approved',
      companyName: 'NMPA IT & Security Dept',
      phone: '9988776656',
      password: 'admin',
      gstNumber: '29NMPAT1234A1Z1',
      gstin: '29NMPAT1234A1Z1',
      contactPerson: 'Dr. P. K. Bose',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      uid: 'admin_3',
      email: 'admin_civil@nmpa.com',
      role: 'admin',
      status: 'approved',
      companyName: 'NMPA Civil Engineering Dept',
      phone: '9988776657',
      password: 'admin',
      gstNumber: '29NMPAC1234A1Z3',
      gstin: '29NMPAC1234A1Z3',
      contactPerson: 'Shri. K. R. Kamath',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      uid: 'admin_dept_traffic',
      email: 'traffic@nmpa.com',
      role: 'dept_admin',
      status: 'approved',
      companyName: 'NMPA Traffic Department',
      phone: '9988776601',
      password: 'admin',
      department: 'traffic',
      gstNumber: '29NMPAT1234A1Z1',
      gstin: '29NMPAT1234A1Z1',
      contactPerson: 'Dr. P. K. Bose',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      uid: 'admin_dept_marine',
      email: 'marine@nmpa.com',
      role: 'dept_admin',
      status: 'approved',
      companyName: 'NMPA Marine Department',
      phone: '9988776602',
      password: 'admin',
      department: 'marine',
      gstNumber: '29NMPAM1234A1Z2',
      gstin: '29NMPAM1234A1Z2',
      contactPerson: 'Capt. M. S. Kumar',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      uid: 'admin_dept_civil',
      email: 'civil@nmpa.com',
      role: 'dept_admin',
      status: 'approved',
      companyName: 'NMPA Civil Department',
      phone: '9988776603',
      password: 'admin',
      department: 'civil',
      gstNumber: '29NMPAC1234A1Z3',
      gstin: '29NMPAC1234A1Z3',
      contactPerson: 'Shri. K. R. Kamath',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      uid: 'admin_dept_mechanical',
      email: 'mechanical@nmpa.com',
      role: 'dept_admin',
      status: 'approved',
      companyName: 'NMPA Mechanical Department',
      phone: '9988776604',
      password: 'admin',
      department: 'mechanical',
      gstNumber: '29NMPAE1234A1Z4',
      gstin: '29NMPAE1234A1Z4',
      contactPerson: 'Shri. T. S. Rao',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      uid: 'admin_dept_administration',
      email: 'administration@nmpa.com',
      role: 'dept_admin',
      status: 'approved',
      companyName: 'NMPA Administration Department',
      phone: '9988776605',
      password: 'admin',
      department: 'administration',
      gstNumber: '29NMPAD1234A1Z5',
      gstin: '29NMPAD1234A1Z5',
      contactPerson: 'Smt. Sandhya Devi',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      uid: 'admin_dept_finance',
      email: 'finance@nmpa.com',
      role: 'dept_admin',
      status: 'approved',
      companyName: 'NMPA Finance Department',
      phone: '9988776606',
      password: 'admin',
      department: 'finance',
      gstNumber: '29NMPAF1234A1Z6',
      gstin: '29NMPAF1234A1Z6',
      contactPerson: 'Shri. R. N. Shetty',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    },
    {
      uid: 'admin_dept_medical',
      email: 'medical@nmpa.com',
      role: 'dept_admin',
      status: 'approved',
      companyName: 'NMPA Medical Department',
      phone: '9988776607',
      password: 'admin',
      department: 'medical',
      gstNumber: '29NMPAH1234A1Z7',
      gstin: '29NMPAH1234A1Z7',
      contactPerson: 'Dr. Anagha Pai',
      website: 'https://nmpa.gov.in',
      createdAt: new Date().toISOString(),
      isActive: true
    }
  ];
  for (const admin of adminUsers) {
    await UserModel.create(admin as any);
  }

  // --- PROGRAMMATIC SEEDING SYSTEM ---
  console.log('> Generating 100+ realistic vendors...');
  const vendorCategories = ['marine', 'civil', 'mechanical', 'traffic', 'medical', 'finance', 'administration'];
  const companyPrefixes = ['Apex', 'Western', 'Deccan', 'Karnataka', 'Konkan', 'Malpe', 'Krishna', 'Panambur', 'Mangalore', 'Vasco', 'Hindustan', 'Bharti', 'Global', 'National', 'Synergy', 'Vertex', 'Infinity', 'Elite', 'Maritime', 'Coastal'];
  const companyActivities = ['Marine Engineering', 'Port Construction', 'Civil Works', 'Shipyard Services', 'Mechanical Logistics', 'Dredging & Reclamation', 'Power Systems', 'Security Solutions', 'Electricals', 'Technical Consultancy', 'Cargo Handling', 'Allied Infrastructure'];
  const companySuffixes = ['Ltd.', 'Pvt. Ltd.', 'Corp.', 'Co.'];
  const firstNames = ['Vijay', 'Rajesh', 'Amit', 'Nisha', 'Ramanand', 'Gururaj', 'Somnath', 'Vikram', 'Prathap', 'Giridhar', 'Sanjeeva', 'Kiran', 'Sanjay', 'Aditya', 'Ananya', 'Rohan', 'Meera', 'Rahul', 'Deepak', 'Arjun'];
  const lastNames = ['Kumar', 'Nair', 'Patel', 'Pillai', 'Bhat', 'Acharya', 'Shetty', 'Rathore', 'Hegde', 'Pai', 'Karvi', 'Kamat', 'Menezes', 'Shenoy', 'Prabhu', 'Dsouza', 'Fernandes', 'Naik', 'Bhandary', 'Devi'];

  const allVendors: any[] = [...SAMPLE_VENDORS.map((v, idx) => ({
    ...v,
    uid: `vendor_${idx + 1}`,
    pan: `ABCDE${1000 + idx}F`,
    category: getCategoryForDept(v.department),
    createdAt: new Date(Date.now() - (180 + idx) * 24 * 60 * 60 * 1000).toISOString()
  }))];

  function getCategoryForDept(dept?: string) {
    switch(dept) {
      case 'marine': return 'Dredging & Marine Works';
      case 'civil': return 'Civil Construction';
      case 'mechanical': return 'Mechanical & Electrical';
      case 'traffic': return 'IT & Security Systems';
      case 'medical': return 'Medical Procurement';
      case 'finance': return 'Financial Auditing & ERP';
      default: return 'General Support Services';
    }
  }

  // Generate up to 105 total vendors
  for (let i = allVendors.length + 1; i <= 105; i++) {
    const prefix = companyPrefixes[i % companyPrefixes.length];
    const activity = companyActivities[(i * 3) % companyActivities.length];
    const suffix = companySuffixes[i % companySuffixes.length];
    const companyName = `${prefix} ${activity} ${suffix}`;
    
    const fName = firstNames[i % firstNames.length];
    const lName = lastNames[i % lastNames.length];
    const contactPerson = `${fName} ${lName}`;
    
    const dept = vendorCategories[i % vendorCategories.length];
    const category = getCategoryForDept(dept);
    const email = `${fName.toLowerCase()}.${lName.toLowerCase()}_${i}@nmpa-vendors.co.in`;
    const phone = `+91 ${9000000000 + i * 87235 % 999999999}`;
    const status = i % 15 === 0 ? 'pending' : (i % 25 === 0 ? 'rejected' : 'approved');
    const isActive = status === 'approved' ? (i % 30 !== 0) : false;
    
    const pan = `PANVE${1000 + i}K`;
    const gstin = `29PANVE${1000 + i}K1Z${i % 9}`;
    const address = `${i * 12} Industrial Estate, Baikampady, Mangalore, Karnataka`;
    
    allVendors.push({
      uid: `vendor_${i}`,
      email,
      role: 'vendor',
      status,
      companyName,
      phone,
      address,
      password: 'password',
      gstNumber: gstin,
      gstin: gstin,
      pan,
      category,
      contactPerson,
      website: `https://${prefix.toLowerCase()}${activity.replace(/\s+/g, '').toLowerCase()}.com`,
      photoUrl: '',
      licenseUrl: '/src/assets/images/dummy-license.png',
      licenseName: 'company_license.png',
      department: dept,
      createdAt: new Date(Date.now() - (200 + i) * 24 * 60 * 60 * 1000).toISOString(),
      isActive,
      documents: [
        {
          id: `doc_gst_${i}`,
          name: `NMPA_GST_Certificate_${gstin}.pdf`,
          type: 'GST Document',
          size: '1.4 MB',
          date: new Date(Date.now() - (180 + i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          url: `/documents/GST_${gstin}.pdf`
        },
        {
          id: `doc_pan_${i}`,
          name: `PAN_Card_Verification_${pan}.pdf`,
          type: 'PAN Document',
          size: '890 KB',
          date: new Date(Date.now() - (190 + i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          url: `/documents/PAN_${pan}.pdf`
        },
        {
          id: `doc_inc_${i}`,
          name: `Certificate_of_Incorporation_${prefix}.pdf`,
          type: 'Registration License',
          size: '2.8 MB',
          date: new Date(Date.now() - (200 + i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          url: `/documents/Incorporation_${prefix}.pdf`
        },
        {
          id: `doc_msme_${i}`,
          name: `MSME_Udyam_Registration_Certificate.pdf`,
          type: 'Financial Auditing',
          size: '1.2 MB',
          date: new Date(Date.now() - (150 + i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          url: `/documents/MSME_${i}.pdf`
        },
        {
          id: `doc_dsc_${i}`,
          name: `Class3_Digital_Signature_Certificate.pdf`,
          type: 'Other',
          size: '640 KB',
          date: new Date(Date.now() - (120 + i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          url: `/documents/DSC_${i}.pdf`
        }
      ]
    });
  }

  await UserModel.insertMany(allVendors as any);

  console.log('> Generating 60+ realistic tenders and 40+ contracts...');
  // We want to generate:
  // - 20 Completed Tenders (Contracts)
  // - 22 Awarded Tenders (Contracts)
  // - 12 Published Tenders (Active)
  // - 5 Under Evaluation Tenders
  // - 3 Pending Approval / Review Tenders
  // - 3 Draft Tenders
  // Total = 65 Tenders (including 42 Contracts total)

  const generatedTenders: any[] = [];
  
  const categoriesList = ['marine', 'civil', 'mechanical', 'traffic', 'medical', 'finance', 'administration'];
  const titleTemplates: Record<string, string[]> = {
    marine: [
      'Dredging of Outer Harbour Entrance Channel',
      'Procurement of 60T BP Battery Electric Tugboat',
      'Supply and Installation of Cone Fenders at Berth 12',
      'Hydrographic Survey and Mapping of Port Basin',
      'Laying of Floating Dock Anchors at Marine Wharf',
      'Deepening and Widening of Oil Jetty Channel'
    ],
    civil: [
      'Construction of Container Freight Station Warehouse',
      'Reconstruction of Dilapidated Berth No. 8 Jetty Structure',
      'Paving and Drainage Works for 20,000 sqm Container Yard',
      'Refurbishment of Port Headquarters Block A',
      'Construction of Storm Water Drainage and Boundary Wall',
      'Design and Civil Execution of Dry Bulk Cargo Berth 15'
    ],
    mechanical: [
      'Procurement and Commissioning of Post-Panamax Quay Cranes',
      'Installation of 3MW Rooftop Grid-Connected Solar Power Phase 3',
      'Supply and Annual Maintenance of Heavy reach stackers',
      'Upgradation of 110KV Main Power Receiving Substation',
      'Installation of Fire Fighting Hydrant System in Oil Terminal',
      'Procurement of Mobile Harbour Cranes for Bulk Cargo'
    ],
    traffic: [
      'Implementation of Automated Gate Access Control System (AGS)',
      'Centralized CCTV Video Wall & Optical Character Recognition Gates',
      'Supply of Automated Weight Bridge Systems for Cargo Gates',
      'Installation of RFID Vehicle Tagging & Smart Parking Lots',
      'Supply of Integrated Container Tracking Software System',
      'Deployment of Integrated Security Surveillance Sensors'
    ],
    medical: [
      'Supply and Testing of High-End Diagnostic Ultrasound Machines',
      'Annual Medicine Supply Contract for NMPA Port Hospital',
      'Renovation and Painting of Port Hospital Building Complex',
      'Procurement of Intensive Care Patient Monitors & Ventilators',
      'Supply of Ambulance Vehicles with Mobile Cardiac Care Units',
      'Annual Maintenance of Radiology and X-Ray Equipment'
    ],
    finance: [
      'Implementation of SmartPort Centralized ERP Finance Module',
      'External Statutory Auditing Services for Financial Year 2026-27',
      'Deployment of Integrated Port Tariff Billing System',
      'Consultancy Services for Budget Management & Allocation Audit',
      'Implementation of Revenue Reconciliation Software Tool',
      'Deployment of Risk Ledger Software Modules'
    ],
    administration: [
      'Supply of Office Stationery and Consumables under rate contract',
      'Corporate Leadership and Port Operations Training Program',
      'Implementation of E-Office File Management Software',
      'Annual Maintenance Contract for IT Hardware and Laptops',
      'Refurbishment of Administrative Conference Halls',
      'Supply and Laundry of Uniforms for Security Guard Force'
    ]
  };

  const statusPool: { status: string; count: number }[] = [
    { status: 'completed', count: 20 },
    { status: 'awarded', count: 22 },
    { status: 'published', count: 12 },
    { status: 'evaluation', count: 5 },
    { status: 'review', count: 3 },
    { status: 'draft', count: 3 }
  ];

  let tenderCounter = 1;
  const createdBids: any[] = [];
  const approvedVendorsPool = allVendors.filter(v => v.status === 'approved' && v.role === 'vendor');

  for (const group of statusPool) {
    for (let c = 0; c < group.count; c++) {
      const dept = categoriesList[tenderCounter % categoriesList.length];
      const titles = titleTemplates[dept];
      const titleBase = titles[c % titles.length];
      const title = `${titleBase} (Pkg ${Math.ceil(tenderCounter / titles.length)})`;
      const budget = Math.round((10 + (tenderCounter * 17) % 90) * 1000000); // 10 Lakhs to 10 Crores
      const category = getCategoryForDept(dept);
      
      const tenderId = `tender_${tenderCounter}`;
      const refNumber = `NMPA/${dept.toUpperCase()}/2026/${100 + tenderCounter}`;
      const workflowStage = group.status === 'completed' ? 11 : (group.status === 'awarded' ? 8 : (group.status === 'evaluation' ? 6 : (group.status === 'published' ? 4 : 1)));
      
      let pDate = '';
      let cDate = '';
      if (group.status !== 'draft' && group.status !== 'review') {
        pDate = new Date(Date.now() - (60 + tenderCounter) * 24 * 60 * 60 * 1000).toISOString();
        cDate = new Date(Date.now() - (30 + tenderCounter) * 24 * 60 * 60 * 1000).toISOString();
      } else {
        cDate = new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString();
      }

      if (group.status === 'published') {
        cDate = new Date(Date.now() + (10 + (tenderCounter % 20)) * 24 * 60 * 60 * 1000).toISOString();
      }

      const tenderDoc: any = {
        id: tenderId,
        title,
        description: `This project involves the comprehensive ${title.toLowerCase()} in accordance with New Mangalore Port Authority structural and technical safety codes. Vendors are requested to submit bids highlighting technical specifications, past experience in similar works, mobilization schedule, and detailed BOQ breakdown.`,
        refNumber,
        status: group.status,
        budget,
        publishDate: pDate,
        closingDate: cDate,
        workflowStage,
        category,
        department: dept,
        documents: [
          { name: `Notice_Inviting_Tender_${dept}.pdf`, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' },
          { name: `Technical_Specs_Schedule_${dept}.pdf`, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' },
          { name: `BOQ_Priced_Bid_${dept}.xlsx`, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'financial' }
        ],
        createdBy: 'admin_1',
        createdAt: new Date(Date.now() - (90 + tenderCounter) * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - (2 + tenderCounter) * 24 * 60 * 60 * 1000).toISOString()
      };

      // Handle Contract (Awarded / Completed Tenders)
      const isContract = group.status === 'awarded' || group.status === 'completed';
      if (isContract) {
        // Select winning vendor matching department or just random approved
        const deptVendors = approvedVendorsPool.filter(v => v.department === dept);
        const winner = deptVendors.length > 0 ? deptVendors[tenderCounter % deptVendors.length] : approvedVendorsPool[tenderCounter % approvedVendorsPool.length];
        
        tenderDoc.awardedToCompany = winner.companyName;
        tenderDoc.awardedToBidderId = winner.uid;
        
        const contractAmt = Math.round(budget * (0.92 + (tenderCounter % 8) * 0.01)); // contract amount around budget
        tenderDoc.contractAmount = contractAmt;
        tenderDoc.emdAmount = Math.round(budget * 0.02);
        tenderDoc.bidOpeningDate = new Date(new Date(pDate).getTime() + 31 * 24 * 60 * 60 * 1000).toISOString();
        
        const isCompleted = group.status === 'completed';
        
        // Milestones
        const m1Amt = Math.round(contractAmt * 0.15);
        const m2Amt = Math.round(contractAmt * 0.35);
        const m3Amt = Math.round(contractAmt * 0.30);
        const m4Amt = contractAmt - (m1Amt + m2Amt + m3Amt);
        
        const milestones = [
          {
            id: `ms_${tenderId}_1`,
            name: 'Phase 1: Mobilization & Design Approval',
            percentage: 15,
            amount: m1Amt,
            estDate: new Date(new Date(pDate).getTime() + 45 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'released' as const,
            releaseDate: new Date(new Date(pDate).getTime() + 48 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: `ms_${tenderId}_2`,
            name: 'Phase 2: Core Engineering Structure Setup',
            percentage: 35,
            amount: m2Amt,
            estDate: new Date(new Date(pDate).getTime() + 75 * 24 * 60 * 60 * 1000).toISOString(),
            status: isCompleted ? ('released' as const) : (tenderCounter % 2 === 0 ? ('released' as const) : ('pending' as const)),
            releaseDate: isCompleted ? new Date(new Date(pDate).getTime() + 78 * 24 * 60 * 60 * 1000).toISOString() : (tenderCounter % 2 === 0 ? new Date(new Date(pDate).getTime() + 80 * 24 * 60 * 60 * 1000).toISOString() : undefined)
          },
          {
            id: `ms_${tenderId}_3`,
            name: 'Phase 3: Auxiliary Integration & Equipment Fitting',
            percentage: 30,
            amount: m3Amt,
            estDate: new Date(new Date(pDate).getTime() + 115 * 24 * 60 * 60 * 1000).toISOString(),
            status: isCompleted ? ('released' as const) : ('pending' as const),
            releaseDate: isCompleted ? new Date(new Date(pDate).getTime() + 118 * 24 * 60 * 60 * 1000).toISOString() : undefined
          },
          {
            id: `ms_${tenderId}_4`,
            name: 'Phase 4: Testing, Commissioning & Handover',
            percentage: 20,
            amount: m4Amt,
            estDate: isCompleted ? new Date(new Date(pDate).getTime() + 145 * 24 * 60 * 60 * 1000).toISOString() : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
            status: isCompleted ? ('released' as const) : ('pending' as const),
            releaseDate: isCompleted ? new Date(new Date(pDate).getTime() + 147 * 24 * 60 * 60 * 1000).toISOString() : undefined
          }
        ];
        
        tenderDoc.paymentMilestones = milestones;
        
        // Inspection reports
        const reports: any[] = [];
        const inspector = 'Shri. K. R. Kamath (Superintending Engineer)';
        milestones.forEach((m) => {
          if (m.status === 'released') {
            reports.push({
              id: `rep_${m.id}`,
              milestoneId: m.id,
              remarks: `Site inspection carried out for milestone "${m.name}". Materials and assembly verified. Found in compliance with technical benchmarks and engineering designs. Quality index standard met.`,
              inspector,
              status: 'approved' as const,
              date: new Date(new Date(m.releaseDate!).getTime() - 24 * 60 * 60 * 1000).toISOString()
            });
          }
        });
        
        tenderDoc.inspectionReports = reports;
        tenderDoc.releasedBudget = milestones.filter(m => m.status === 'released').reduce((sum, m) => sum + m.amount, 0);
        
        if (isCompleted) {
          tenderDoc.completionProof = {
            remarks: 'All project milestones have been successfully completed, inspected, and commissioned. Final handover report signed by both contractor and port authorities.',
            submittedAt: new Date(new Date(pDate).getTime() + 148 * 24 * 60 * 60 * 1000).toISOString(),
            documents: [
              { name: `Completion_Certificate_Joint_${tenderId}.pdf`, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' }
            ]
          };
          tenderDoc.completionReview = {
            status: 'approved' as const,
            remarks: 'Final inspection satisfactory. Operations handed over to Marine traffic desk. Project closed officially.',
            reviewedAt: new Date(new Date(pDate).getTime() + 150 * 24 * 60 * 60 * 1000).toISOString(),
            reviewedBy: 'admin_1'
          };
        }
      }

      generatedTenders.push(tenderDoc);

      // Generate Bids (150+ Bids total)
      // Only generate bids for published, evaluation, awarded, completed, closed tenders
      if (group.status !== 'draft' && group.status !== 'review') {
        // Select 3 to 4 random vendors from the approved pool
        const bidCount = 3 + (tenderCounter % 2); // 3 or 4 bids per tender
        const selectedBidders: any[] = [];
        
        // Try to include winning bidder first if awarded or completed
        if (isContract) {
          selectedBidders.push(approvedVendorsPool.find(v => v.uid === tenderDoc.awardedToBidderId));
        }

        while (selectedBidders.length < bidCount) {
          const randVendor = approvedVendorsPool[Math.floor(Math.random() * approvedVendorsPool.length)];
          if (!selectedBidders.some(v => v.uid === randVendor.uid)) {
            selectedBidders.push(randVendor);
          }
        }

        // Sort bids financially so that L1 is realistically marked
        const tempBids = selectedBidders.map((vendor, idx) => {
          let bidAmt = 0;
          if (isContract && vendor.uid === tenderDoc.awardedToBidderId) {
            bidAmt = tenderDoc.contractAmount; // Ensure winner bid matches contract amount
          } else {
            bidAmt = Math.round(budget * (0.85 + idx * 0.08 + Math.random() * 0.05));
          }

          const techScore = 75 + Math.round(Math.random() * 23); // 75 to 98
          return {
            vendor,
            bidAmt,
            techScore
          };
        });

        // Sort by bidAmt ascending (lower price is better for financial rank)
        tempBids.sort((a, b) => a.bidAmt - b.bidAmt);

        tempBids.forEach((bObj, rankIdx) => {
          const bidderId = bObj.vendor.uid;
          const bidId = `bid_${tenderId}_${bidderId}`;
          const rank = rankIdx + 1;
          const finScore = Math.round(100 - (bObj.bidAmt - tempBids[0].bidAmt) / tempBids[0].bidAmt * 100);
          
          let bidStatus: any = 'submitted';
          if (isContract) {
            if (bidderId === tenderDoc.awardedToBidderId) {
              bidStatus = 'selected';
            } else {
              bidStatus = 'rejected';
            }
          } else if (group.status === 'evaluation') {
            bidStatus = Math.random() > 0.4 ? 'shortlisted' : 'submitted';
          }

          createdBids.push({
            id: bidId,
            tenderId,
            bidderId,
            technicalQuote: `Detailed technical proposal submitted by ${bObj.vendor.companyName} for project "${title}". We have extensive capabilities in executing port works. All core milestones, equipment specifications, and machinery certifications comply with standard Indian Ports Act codes. Supporting documents are enclosed.`,
            financialQuote: bObj.bidAmt,
            status: bidStatus,
            submittedAt: new Date(new Date(pDate).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            documents: [
              { name: `Technical_Proposal_${bidderId}.pdf`, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'technical' },
              { name: `Priced_BOQ_Form_${bidderId}.xlsx`, url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'financial' }
            ],
            technicalScore: bObj.techScore,
            financialScore: Math.max(10, finScore),
            finalRank: rank,
            rejectionReason: bidStatus === 'rejected' ? 'Financial quote exceeded the L1 baseline offer.' : undefined,
            selectionReason: bidStatus === 'selected' ? 'Declared L1 bidder with lowest compliant financial price quotation and robust technical evaluation score.' : undefined
          });
        });
      }

      tenderCounter++;
    }
  }

  await TenderModel.insertMany(generatedTenders as any);
  await BidModel.insertMany(createdBids as any);

  console.log(`> Seeded ${generatedTenders.length} tenders, including ${generatedTenders.filter(t => t.status === 'awarded' || t.status === 'completed').length} contracts.`);
  console.log(`> Seeded ${createdBids.length} bids.`);

  console.log('> Generating 50 realistic notifications...');
  const notificationsSeed: any[] = [];
  const adminUsersList = ['admin_1', 'admin_2', 'admin_dept_civil', 'admin_dept_marine', 'admin_dept_mechanical', 'admin_dept_traffic', 'admin_dept_finance', 'admin_dept_administration'];
  
  const notificationTemplates = [
    { title: 'New Bid Submitted 📄', message: 'Apex Marine has submitted a technical bid for Dredging tender.', type: 'info' },
    { title: 'Tender Closing Soon ⏰', message: 'Tender NMPA/CIVIL/2026/114 closes in 24 hours. Bidding portal locking.', type: 'warning' },
    { title: 'Vendor Approval Request 👤', message: 'New vendor registration request from Coastal Dredging Ltd.', type: 'info' },
    { title: 'Payment Released 💰', message: 'Milestone payment of ₹45,00,000 approved for solar panel installation.', type: 'success' },
    { title: 'Audit Trail Triggered 🛡️', message: 'Financial ledger report downloaded by Department Admin.', type: 'warning' },
    { title: 'Contract Expiring Soon ⚠️', message: 'Maintenance agreement contract for Railway Siding closes in 30 days.', type: 'error' },
    { title: 'Technical Evaluation Complete ✅', message: 'Technical compliance checklist scored for reach stacker procurement.', type: 'success' }
  ];

  for (let i = 1; i <= 50; i++) {
    const isForAdmin = i % 2 === 0;
    const targetUserId = isForAdmin 
      ? adminUsersList[i % adminUsersList.length] 
      : approvedVendorsPool[i % approvedVendorsPool.length].uid;
      
    const template = notificationTemplates[i % notificationTemplates.length];
    
    notificationsSeed.push({
      id: `note_seed_${i}`,
      userId: targetUserId,
      title: template.title,
      message: `${template.message} (Reference Code #${1000 + i})`,
      read: i % 3 === 0,
      createdAt: new Date(Date.now() - (i % 10) * 12 * 60 * 60 * 1000).toISOString(),
      type: template.type
    });
  }
  await NotificationModel.insertMany(notificationsSeed as any);

  console.log('> Generating 105 realistic audit logs...');
  const auditLogsSeed: any[] = [];
  const auditActions = [
    { action: 'TENDER_CREATE', title: 'Tender Created', details: 'Created draft document for tender NMPA/CIVIL/2026/', entity: 'Tender', module: 'Tenders' },
    { action: 'TENDER_PUBLISH', title: 'Tender Published', details: 'Published tender notice and bidding portal for NMPA/ELEC/2026/', entity: 'Tender', module: 'Tenders' },
    { action: 'USER_APPROVAL', title: 'Vendor Registered', details: 'Approved vendor registration for vendor_', entity: 'User', module: 'Vendors' },
    { action: 'BID_SUBMISSION', title: 'Bid Submitted', details: 'Submitted bid quotation for tender NMPA/', entity: 'Bid', module: 'Bids' },
    { action: 'TENDER_AWARD', title: 'Contract Awarded', details: 'Awarded contract for tender NMPA/', entity: 'Tender', module: 'Contracts' },
    { action: 'BUDGET_PAYMENT_RELEASE', title: 'Payment Released', details: 'Released milestone payment of ₹', entity: 'Tender', module: 'Finance' },
    { action: 'SYSTEM_LOGIN', title: 'User Login Success', details: 'Logged in securely to dashboard interface', entity: 'System', module: 'Security' },
    { action: 'PROFILE_UPDATE', title: 'Profile Modified', details: 'Updated registration address and GST certificate details', entity: 'User', module: 'Vendors' }
  ];

  for (let i = 1; i <= 105; i++) {
    const act = auditActions[i % auditActions.length];
    const adminUser = adminUsersList[i % adminUsersList.length];
    const ip = `192.168.${1 + (i % 3)}.${10 + (i % 90)}`;
    
    let description = act.details;
    let ref = `REF-${1000 + i}`;
    
    if (act.action === 'TENDER_CREATE' || act.action === 'TENDER_PUBLISH') {
      description += `${100 + i}`;
      ref = `NMPA/TEND/${100 + i}`;
    } else if (act.action === 'USER_APPROVAL') {
      description += `${10 + i}`;
      ref = `vendor_${10 + i}`;
    } else if (act.action === 'BUDGET_PAYMENT_RELEASE') {
      description += `${(i + 1) * 200000}`;
      ref = `PAY-${5000 + i}`;
    }

    auditLogsSeed.push({
      id: `log_seed_${i}`,
      actionType: act.title,
      title: act.title,
      description,
      performedBy: adminUser === 'admin_1' ? 'NMPA Admin Authority' : (adminUser === 'admin_2' ? 'NMPA Security Officer' : `Dept Admin: ${adminUser.replace('admin_dept_', '')}`),
      entityType: act.entity,
      entityReference: ref,
      previousValue: i % 4 === 0 ? 'pending' : 'draft',
      newValue: i % 4 === 0 ? 'approved' : 'published',
      remarks: 'Automated ledger entries validated against state credentials.',
      userId: adminUser,
      action: act.action,
      details: description,
      timestamp: new Date(Date.now() - (i % 15) * 24 * 60 * 60 * 1000 - (i % 24) * 60 * 60 * 1000).toISOString(),
      ipAddress: ip,
      module: act.module
    });
  }
  await AuditLogModel.insertMany(auditLogsSeed as any);

  console.log('> Seeding 5 inquiries...');
  // 6. Seed Enquiries
  for (const enquiry of SAMPLE_ENQUIRIES) {
    const enquiryId = 'enquiry_' + Math.random().toString(36).substring(2, 15);
    await EnquiryModel.create({ ...enquiry, id: enquiryId } as any);
  }
}

