let mediaQuery = null

function handleSystemChange(e) {
  document.documentElement.setAttribute(
    'data-theme',
    e.matches ? 'dark' : 'light',
  )
}

export function applyTheme(theme) {
  if (theme === 'system') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', handleSystemChange)
  } else if (mediaQuery) {
    mediaQuery.removeEventListener('change', handleSystemChange)
    mediaQuery = null
  }

  document.documentElement.setAttribute('data-theme', theme)
}
