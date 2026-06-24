/**
 * Format a date relative to now (e.g., "Today", "3 days ago", "2w ago")
 */
export function formatDate(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  const diff = Date.now() - d.getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)}w ago`
  if (days < 365) return `${Math.floor(days / 30)}mo ago`
  return d.toLocaleDateString()
}

/**
 * Format a due date string relative to now (e.g., "Due today", "3d overdue")
 */
export function formatDue(dateStr) {
  const due = new Date(dateStr)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const diff = due.getTime() - now.getTime()
  const days = Math.ceil(diff / 86400000)
  if (days < 0) return `${Math.abs(days)}d overdue`
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  return `${days}d left`
}