import { BookUser, House, Settings } from 'lucide-react'
import { NavLink, Outlet } from 'react-router'
import { useTranslation } from 'react-i18next'

function App() {
  const { t } = useTranslation()
  return (
    <>
      <Outlet />
      <div className="dock max-w-lg mx-auto shadow-sm border-t border-base-300/40">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'dock-active' : '')}
        >
          <button className="flex flex-col items-center gap-0.5">
            <House className="size-5" />
            <span className="dock-label text-[10px] font-medium">{t('Home')}</span>
          </button>
        </NavLink>

        <NavLink
          to="/contacts"
          className={({ isActive }) => (isActive ? 'dock-active' : '')}
        >
          <button className="flex flex-col items-center gap-0.5">
            <BookUser className="size-5" />
            <span className="dock-label text-[10px] font-medium">{t('Contacts')}</span>
          </button>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) => (isActive ? 'dock-active' : '')}
        >
          <button className="flex flex-col items-center gap-0.5">
            <Settings className="size-5" />
            <span className="dock-label text-[10px] font-medium">{t('Settings')}</span>
          </button>
        </NavLink>
      </div>
    </>
  )
}

export default App