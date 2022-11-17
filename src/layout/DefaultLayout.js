import { AppContent, AppSidebar, AppHeader } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="flex-grow-1 d-flex">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
