import { Link, routes } from '@redwoodjs/router'

const AppLayout = ({ children }) => {
  return (
    <div className="mx-auto max-w-screen-lg pb-16 xl:max-w-screen-xl">
      <header className="px-4 pb-4 pt-6">
        <h1 className="text-3xl font-semibold text-white">
          <Link to={routes.home()} className="hover:underline">
            photowood
          </Link>
        </h1>
      </header>
      <main className="">{children}</main>
    </div>
  )
}

export default AppLayout
