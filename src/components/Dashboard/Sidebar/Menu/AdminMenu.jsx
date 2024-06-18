import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { MdOutlinePets } from "react-icons/md";


const AdminMenu = () => {
    return (
        <>
           {/* Manage Users */}
           <MenuItem label='Manage Users' address='manage-users' icon={FaUserCog} />

           {/* Manage Pets */}
           <MenuItem label='Manage Pets' address='manage-pets' icon={MdOutlinePets} />
        </>
    );
};

export default AdminMenu;