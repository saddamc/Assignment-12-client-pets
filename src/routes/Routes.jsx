import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import Main from '../layouts/Main'
import AllUsers from '../pages/Dashboard/Admin/AllUsers'
import Overview from '../pages/Dashboard/Common/Overview'
import Profile from '../pages/Dashboard/Common/Profile'
import AddPet from '../pages/Dashboard/User/AddPet'
import CreateCampaign from '../pages/Dashboard/User/CreateCampaign'
import MyPets from '../pages/Dashboard/User/MyPets'
import ErrorPage from '../pages/ErrorPage'
import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import PetDetails from '../pages/PetDetails/PetDetails'
import SignUp from '../pages/SignUp/SignUp'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'
// import UserRoute from './UserRoute'
import Payment from '../components/Dashboard/Payment/Payment'
import Donation from '../components/Donation/Donation'
import DonationDetails from '../components/Donation/DonationDetails'
import ManagePets from '../pages/Dashboard/Admin/ManagePets'
import AdoptPets from '../pages/Dashboard/User/AdoptPets'
import MyCampaigns from '../pages/Dashboard/User/MyCampaigns'
import MyDonation from '../pages/Dashboard/User/MyDonation'

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
      // Donation 

      {
        path: 'donation',
        element: (
          <PrivateRoute>
              <Donation />
          </PrivateRoute>
        ),
      },
      {
        path: 'donation/:id',
        element: (
          <PrivateRoute>
              <DonationDetails />
          </PrivateRoute>
        ),
      },
    ],
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
      // payment
      {
        path: 'payment',
        element: (
          <PrivateRoute>
            <Payment />
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
