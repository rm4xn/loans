import { useTranslation } from 'react-i18next'
import { useStore } from '../store'
import { Globe, Sun, Moon, Monitor, Wallet, MessageSquareText } from 'lucide-react'
import { CURRENCIES } from '../utils/currency'
import SettingsCard from '../components/SettingsCard'

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
  const whatsappMessage = useStore((state) => state.whatsappMessage)
  const setWhatsappMessage = useStore((state) => state.setWhatsappMessage)

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

      <SettingsCard
        icon={Globe}
        title={t('Language')}
        description={t('Change the app language')}
      >
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
      </SettingsCard>

      <SettingsCard
        icon={Wallet}
        title={t('Default Currency')}
        description={t('Set the default currency for new loans')}
      >
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
      </SettingsCard>

      <SettingsCard
        icon={Sun}
        title={t('Theme')}
        description={t('Choose between system, light or dark')}
      >
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
      </SettingsCard>

      <SettingsCard
        icon={MessageSquareText}
        title={t('WhatsApp Message')}
        description={t('Customize the WhatsApp reminder template')}
      >
        <textarea
          className="textarea textarea-bordered w-full text-sm leading-relaxed min-h-24"
          value={whatsappMessage}
          onChange={(e) => setWhatsappMessage(e.target.value)}
        />
        <p className="text-xs text-base-content/30 mt-2">
          {t('Use {{amount}} and {{currency}} as placeholders')}
        </p>
      </SettingsCard>
    </>
  )
}

export default Settings
