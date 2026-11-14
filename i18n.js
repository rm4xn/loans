import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      // Navigation
      Home: 'Home',
      Contacts: 'Contacts',

      // Home page
      'My Loans': 'My Loans',
      'active loan_one': '{{count}} active loan',
      'active loan_other': '{{count}} active loans',
      total: '{{count}} total',
      'No loans yet': 'No loans yet',
      'Create your first loan to get started':
        'Create your first loan to get started',

      // Contacts page
      'Add Contact': 'Add Contact',
      contact_one: '{{count}} contact',
      contact_other: '{{count}} contacts',
      'No contacts yet': 'No contacts yet',
      'Add your first contact to start tracking loans':
        'Add your first contact to start tracking loans',
      'Edit contact': 'Edit contact',
      'Delete contact': 'Delete contact',

      // Dates
      Today: 'Today',
      Yesterday: 'Yesterday',
      'days ago': '{{count}} days ago',
      'weeks ago': '{{count}}w ago',
      'months ago': '{{count}}mo ago',
      'days overdue': '{{count}}d overdue',
      'Due today': 'Due today',
      'Due tomorrow': 'Due tomorrow',
      'days left': '{{count}}d left',

      // Status badges
      Paid: 'Paid',
      Active: 'Active',

      // Loan detail
      'Loan not found': 'Loan not found',
      Amount: 'Amount',
      Created: 'Created',
      'Due Date': 'Due Date',
      'Edit Loan': 'Edit Loan',
      'WhatsApp Reminder': 'WhatsApp Reminder',
      'Delete Loan': 'Delete Loan',
      'You owe': 'You owe',
      'You are owed': 'You are owed',
      'Due date': 'Due date',
      'Edit loan': 'Edit loan',
      'Delete loan': 'Delete loan',

      // Contact form
      'Edit Contact': 'Edit Contact',
      'New Contact': 'New Contact',
      Name: 'Name',
      'Phone Number': 'Phone Number',
      Cancel: 'Cancel',
      'Save Changes': 'Save Changes',
      'Create Contact': 'Create Contact',

      // Loan form
      'New Loan': 'New Loan',
      'I lent': 'I lent',
      'I borrowed': 'I borrowed',
      Contact: 'Contact',
      'Search contacts...': 'Search contacts...',
      'Amount ($)': 'Amount ($)',
      'Payment Date': 'Payment Date',
      optional: 'optional',
      'Create Loan': 'Create Loan',

      // Settings
      Settings: 'Settings',
      'Configure your preferences': 'Configure your preferences',
      Language: 'Language',
      'Change the app language': 'Change the app language',
      'Default Currency': 'Default Currency',
      'Set the default currency for new loans':
        'Set the default currency for new loans',
      'WhatsApp Message': 'WhatsApp Message',
      'Customize the WhatsApp reminder template':
        'Customize the WhatsApp reminder template',
      'Use {{amount}} and {{currency}} as placeholders':
        'Use {{amount}} and {{currency}} as placeholders',

      // Logged out
      'Logged out': 'Logged out',

      // Delete confirmations
      'Delete contact confirmation':
        'Are you sure you want to delete this contact?',
      'Delete loan confirmation': 'Are you sure you want to delete this loan?',

      // WhatsApp
      'WhatsApp reminder message':
        'Reminder: You are owed ${{amount}} by me. Please pay back as soon as possible.',
    },
  },
  es: {
    translation: {
      // Navigation
      Home: 'Inicio',
      Contacts: 'Contactos',

      // Home page
      'My Loans': 'Mis Préstamos',
      'active loan_one': '{{count}} préstamo activo',
      'active loan_other': '{{count}} préstamos activos',
      total: '{{count}} total',
      'No loans yet': 'Sin préstamos',
      'Create your first loan to get started':
        'Crea tu primer préstamo para empezar',

      // Contacts page
      'Add Contact': 'Añadir Contacto',
      contact_one: '{{count}} contacto',
      contact_other: '{{count}} contactos',
      'No contacts yet': 'Sin contactos',
      'Add your first contact to start tracking loans':
        'Añade tu primer contacto para empezar',
      'Edit contact': 'Editar contacto',
      'Delete contact': 'Eliminar contacto',

      // Dates
      Today: 'Hoy',
      Yesterday: 'Ayer',
      'days ago': 'hace {{count}} días',
      'weeks ago': 'hace {{count}} sem.',
      'months ago': 'hace {{count}} meses',
      'days overdue': '{{count}}d vencido',
      'Due today': 'Vence hoy',
      'Due tomorrow': 'Vence mañana',
      'days left': '{{count}}d restantes',

      // Status badges
      Paid: 'Pagado',
      Active: 'Activo',

      // Loan detail
      'Loan not found': 'Préstamo no encontrado',
      Amount: 'Monto',
      Created: 'Creado',
      'Due Date': 'Fecha de Vencimiento',
      'Edit Loan': 'Editar Préstamo',
      'WhatsApp Reminder': 'Recordatorio WhatsApp',
      'Delete Loan': 'Eliminar Préstamo',
      'You owe': 'Debes',
      'You are owed': 'Te deben',
      'Due date': 'Fecha de vencimiento',
      'Edit loan': 'Editar préstamo',
      'Delete loan': 'Eliminar préstamo',

      // Contact form
      'Edit Contact': 'Editar Contacto',
      'New Contact': 'Nuevo Contacto',
      Name: 'Nombre',
      'Phone Number': 'Teléfono',
      Cancel: 'Cancelar',
      'Save Changes': 'Guardar Cambios',
      'Create Contact': 'Crear Contacto',

      // Loan form
      'New Loan': 'Nuevo Préstamo',
      'I lent': 'Presté',
      'I borrowed': 'Me prestaron',
      Contact: 'Contacto',
      'Search contacts...': 'Buscar contactos...',
      'Amount ($)': 'Monto ($)',
      'Payment Date': 'Fecha de Pago',
      optional: 'opcional',
      'Create Loan': 'Crear Préstamo',

      // Settings
      Settings: 'Ajustes',
      'Configure your preferences': 'Configura tus preferencias',
      Language: 'Idioma',
      'Change the app language': 'Cambiar el idioma de la aplicación',
      'Default Currency': 'Moneda por Defecto',
      'Set the default currency for new loans':
        'Establecer la moneda por defecto para nuevos préstamos',
      'WhatsApp Message': 'Mensaje de WhatsApp',
      'Customize the WhatsApp reminder template':
        'Personaliza la plantilla del recordatorio de WhatsApp',
      'Use {{amount}} and {{currency}} as placeholders':
        'Usa {{amount}} y {{currency}} como marcadores de posición',

      // Logged out
      'Logged out': 'Sesión cerrada',

      // Delete confirmations
      'Delete contact confirmation': '¿Estás seguro de eliminar este contacto?',
      'Delete loan confirmation': '¿Estás seguro de eliminar este préstamo?',

      // WhatsApp
      'WhatsApp reminder message':
        'Recordatorio: Me debes ${{amount}}. Por favor paga lo antes posible.',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
