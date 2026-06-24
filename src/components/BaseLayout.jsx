import { Outlet } from 'react-router'

function BaseLayout() {
  return (
    <main className="mx-auto max-w-lg min-h-dvh pb-24 pt-6 px-4">
      <Outlet />
    </main>
  )
}

export default BaseLayout