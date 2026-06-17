import { BookUser, House } from 'lucide-react'
import { NavLink, Outlet } from 'react-router'

function App() {
  return (
    <>
      <main className='max-w-lg mx-auto p-4 relative'>
        <Outlet />
      </main>
      <div className='dock max-w-lg mx-auto'>
        <NavLink
          to='/'
          className={({ isActive }) => (isActive ? 'dock-active' : '')}
        >
          <button className='flex flex-col items-center'>
            <House />
            <span className='dock-label'>Home</span>
          </button>
        </NavLink>

        <NavLink
          to='/contacts'
          className={({ isActive }) => (isActive ? 'dock-active' : '')}
        >
          <button className='flex flex-col items-center'>
            <BookUser />
            <span className='dock-label'>Contacts</span>
          </button>
        </NavLink>
      </div>
    </>
  )
}

export default App
