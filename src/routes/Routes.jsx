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
import AdoptRequest from '../pages/Dashboard/User/AdoptRequest'
import CreateCampaign from '../pages/Dashboard/User/CreateCampaign'
import MyCampaigns from '../pages/Dashboard/User/MyCampaigns'
import MyDonation from '../pages/Dashboard/User/MyDonation'
import AllUsers from '../pages/Dashboard/User/AllUsers'
import Profile from '../pages/Dashboard/Common/Profile'

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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: 'all-users',
        element: <AllUsers />,
      },
      {
        path: 'add-pet',
        element: <AddPet />,
      },
      {
        path: 'my-pets',
        element: <MyPets />,
      },
      {
        path: 'adopt',
        element: <AdoptRequest />,
      },
      {
        path: 'campaign',
        element: <CreateCampaign />,
      },
      {
        path: 'my-campaigns',
        element: <MyCampaigns />,
      },
      {
        path: 'my-donations',
        element: <MyDonation />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  }
])
