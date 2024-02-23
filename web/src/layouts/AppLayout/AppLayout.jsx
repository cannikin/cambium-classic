import { Link, routes } from '@redwoodjs/router'

const AppLayout = ({ children }) => {
  return (
    <div className="mx-auto max-w-screen-lg pb-16 xl:max-w-screen-xl">
      <header className="px-4 pb-4 pt-6">
        <h1 className="flex items-start text-3xl font-semibold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-white">
            <div className="h-4 w-6 bg-neutral-800">&nbsp;</div>
          </div>
          <Link to={routes.home()} className="ml-2 hover:underline">
            cambium
          </Link>
        </h1>
      </header>
      <main className="">{children}</main>
    </div>
  )
}

export default AppLayout
