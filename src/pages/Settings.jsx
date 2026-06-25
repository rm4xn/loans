import { useTranslation } from 'react-i18next'
import { useStore } from '../store'
import { Globe, Sun, Moon, Monitor, Wallet } from 'lucide-react'
import { CURRENCIES } from '../utils/currency'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

const THEMES = [
  { key: 'system', icon: Monitor, label: 'System' },
  { key: 'light', icon: Sun, label: 'Light' },
  { key: 'dark', icon: Moon, label: 'Dark' },
]

function Settings() {
  const { t } = useTranslation()
  const language = useStore((state) => state.language)
  const setLanguage = useStore((state) => state.setLanguage)
  const defaultCurrency = useStore((state) => state.defaultCurrency)
  const setDefaultCurrency = useStore((state) => state.setDefaultCurrency)
  const theme = useStore((state) => state.theme)
  const setTheme = useStore((state) => state.setTheme)

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-base-content">
          {t('Settings')}
        </h1>
        <p className="text-sm text-base-content/50 mt-1">
          {t('Configure your preferences')}
        </p>
      </div>

      <div className="card card-border bg-base-100 mb-4">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Globe className="size-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{t('Language')}</p>
              <p className="text-xs text-base-content/40 mt-0.5">
                {t('Change the app language')}
              </p>
            </div>
          </div>

          <div className="join join-horizontal w-full">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                className={
                  'btn join-item flex-1 btn-sm' +
                  (language === lang.code ? ' btn-primary' : '')
                }
                onClick={() => setLanguage(lang.code)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card card-border bg-base-100 mb-4">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Wallet className="size-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{t('Default Currency')}</p>
              <p className="text-xs text-base-content/40 mt-0.5">
                {t('Set the default currency for new loans')}
              </p>
            </div>
          </div>

          <select
            className="select w-full"
            value={defaultCurrency}
            onChange={(e) => setDefaultCurrency(e.target.value)}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.symbol} — {c.label} ({c.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card card-border bg-base-100">
        <div className="card-body">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Sun className="size-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">{t('Theme')}</p>
              <p className="text-xs text-base-content/40 mt-0.5">
                {t('Choose between system, light or dark')}
              </p>
            </div>
          </div>

          <div className="join join-horizontal w-full">
            {THEMES.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                className={
                  'btn join-item flex-1 btn-sm' +
                  (theme === key ? ' btn-primary' : '')
                }
                onClick={() => setTheme(key)}
              >
                <Icon className="size-4" />
                {t(label)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings