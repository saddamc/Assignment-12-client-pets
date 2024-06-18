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
import UserRoute from './UserRoute'
import AdoptPets from '../pages/Dashboard/User/AdoptPets'
import MyCampaigns from '../pages/Dashboard/User/MyCampaigns'
import ManagePets from '../pages/Dashboard/Admin/ManagePets'

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
            <UserRoute>
              <AddPet />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-pets',
        element: (
          <PrivateRoute>
            <UserRoute>
              <MyPets />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-adopt',
        element: (
          <PrivateRoute>
            <UserRoute>
              <AdoptPets />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'campaign',
        element: (
          <PrivateRoute>
            <UserRoute>
              <CreateCampaign />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-campaigns',
        element: (
          <PrivateRoute>
            <UserRoute>
              <MyCampaigns />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-donations',
        element: (
          <PrivateRoute>
            <UserRoute>
              <MyDonation />
            </UserRoute>
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
