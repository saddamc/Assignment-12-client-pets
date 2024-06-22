import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PetDetails from '../pages/PetDetails/PetDetails'
import DashboardLayout from '../layouts/DashboardLayout'
import Overview from '../pages/Dashboard/Common/Overview'
import AddPet from '../pages/Dashboard/User/AddPet'
import MyPets from '../pages/Dashboard/User/MyPets'
import CreateCampaign from '../pages/Dashboard/User/CreateCampaign'
import MyDonation from '../pages/Dashboard/User/MyDonation'
import AllUsers from '../pages/Dashboard/Admin/AllUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
// import UserRoute from './UserRoute'
import AdoptPets from '../pages/Dashboard/User/AdoptPets'
import MyCampaigns from '../pages/Dashboard/User/MyCampaigns'
import ManagePets from '../pages/Dashboard/Admin/ManagePets'
import Donation from '../components/Donation/Donation'
import Payment from '../components/Dashboard/Payment/Payment'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/pet/:id',
        element: <PetDetails/>,
      },
    ],
  },
  {
    path: 'donation',
    element: (
      <PrivateRoute>
          <Donation />
      </PrivateRoute>
    ),
  },
  {
    path: 'payment',
    element: (
      <PrivateRoute>
          <Payment />
      </PrivateRoute>
    ),
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><Overview /></PrivateRoute>,
      },

      // Admin Route
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUsers />
            </AdminRoute>
          </PrivateRoute>
        ),   
      },
      {
        path: 'manage-pets',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManagePets />
            </AdminRoute>
          </PrivateRoute>
        ),   
      },

      // User Route
      {
        path: 'add-pet',
        element: (
          <PrivateRoute>
            
              <AddPet />
            
          </PrivateRoute>
        ),
      },
      {
        path: 'my-pets',
        element: (
          <PrivateRoute>
            
              <MyPets />
            
          </PrivateRoute>
        ),
      },
      {
        path: 'my-adopt',
        element: (
          <PrivateRoute>
            
              <AdoptPets />
            
          </PrivateRoute>
        ),
      },
      {
        path: 'campaign',
        element: (
          <PrivateRoute>
            
              <CreateCampaign />
           
          </PrivateRoute>
        ),
      },
      {
        path: 'my-campaigns',
        element: (
          <PrivateRoute>
            
              <MyCampaigns />
            
          </PrivateRoute>
        ),
      },
      {
        path: 'my-donations',
        element: (
          <PrivateRoute>
            
              <MyDonation />
            
          </PrivateRoute>
        ),
      },
      
      {
        path: 'profile',
        element: (
          <PrivateRoute>
              <Profile />
          </PrivateRoute>
        ),
      },
    ],
  }
])
