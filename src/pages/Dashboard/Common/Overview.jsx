import useRole from "../../../hooks/useRole";
import AdminHome from "./Overview/AdminHome";
import UserHome from "./Overview/UserHome";


const Overview = () => {
    const [role, isLoading] = useRole()
    return (
        <div>
            {role === 'Admin' &&  <AdminHome /> }
            {role === 'User' &&  <UserHome /> }
        </div>
    );
};

export default Overview;
