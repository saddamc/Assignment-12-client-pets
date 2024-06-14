import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import useRole from "../hooks/useRole";
import PropTypes from 'prop-types'


const UserRoute = ({ children }) => {
    

    const [role, isLoading] = useRole()


    if(isLoading) return <LoadingSpinner />
    if(role === 'User') return children

    return <Navigate to='/dashboard' />
        
    
};

export default UserRoute;

UserRoute.propTypes = {
    children: PropTypes.element,
  }