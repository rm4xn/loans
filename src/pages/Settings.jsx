import { useTranslation } from 'react-i18next'
import { useStore } from '../store'
import { Globe } from 'lucide-react'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

function Settings() {
  const { t } = useTranslation()
  const language = useStore((state) => state.language)
  const setLanguage = useStore((state) => state.setLanguage)

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

      <div className="bg-base-100 rounded-2xl border border-base-200/50 p-5">
        <div className="flex items-center gap-3">
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

        <div className="mt-4 flex gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={
                'btn btn-sm flex-1 ' +
                (language === lang.code
                  ? 'btn-primary shadow-xs'
                  : 'btn-ghost text-base-content/60')
              }
              onClick={() => setLanguage(lang.code)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Settings