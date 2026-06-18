import { Outlet } from 'react-router'

function BaseLayout() {
  return (
    <main className="max-w-lg mx-auto p-4 relative">
      <Outlet />
    </main>
  )
}

export default BaseLayout
