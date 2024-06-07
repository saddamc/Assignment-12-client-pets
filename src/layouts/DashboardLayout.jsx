import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import Navbar from '../components/Shared/Navbar/Navbar'

const DashboardLayout = () => {
  return (
    <div className='relative min-h-screen md:flex'>
      {/* Sidebar */}
      <Navbar />

      
      <Sidebar />

      {/* Outlet --> Dynamic content */}
      <div className='flex-1 md:ml-64 pt-24'>
        <div className='p-5'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout