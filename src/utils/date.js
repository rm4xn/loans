/**
 * Format a date relative to now (e.g., "Today", "3 days ago", "2w ago")
 * @param {Date|string} date
 * @param {(key: string, options?: object) => string} t - i18n translate function
 */
export function formatDate(date, t) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  const diff = Date.now() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return t ? t('Today') : 'Today'
  if (days === 1) return t ? t('Yesterday') : 'Yesterday'
  if (days < 7) return t ? t('days ago', { count: days }) : `${days} days ago`
  if (days < 30) return t ? t('weeks ago', { count: Math.floor(days / 7) }) : `${Math.floor(days / 7)}w ago`
  if (days < 365) return t ? t('months ago', { count: Math.floor(days / 30) }) : `${Math.floor(days / 30)}mo ago`
  return d.toLocaleDateString()
}

/**
 * Format a due date string relative to now (e.g., "Due today", "3d overdue")
 * @param {string} dateStr
 * @param {(key: string, options?: object) => string} t - i18n translate function
 */
export function formatDue(dateStr, t) {
  const due = new Date(dateStr)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = due.getTime() - now.getTime()
  const days = Math.ceil(diff / 86400000)
  if (days < 0) return t ? t('days overdue', { count: Math.abs(days) }) : `${Math.abs(days)}d overdue`
  if (days === 0) return t ? t('Due today') : 'Due today'
  if (days === 1) return t ? t('Due tomorrow') : 'Due tomorrow'
  return t ? t('days left', { count: days }) : `${days}d left`
}