import { RiStickyNoteAddFill } from "react-icons/ri";
import MenuItem from "./MenuItem";
import { CiViewList } from "react-icons/ci";
import { SiEclipseadoptium } from "react-icons/si";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { MdOutlineCampaign } from "react-icons/md";
import { BiSolidDonateHeart } from "react-icons/bi";


const UserMenu = () => {
    return (
        <>
                {/* Add Pet */}
                <MenuItem label='Add Pet' address='add-pet' icon={RiStickyNoteAddFill} />
         
              {/* My Added Pets */}     
              <MenuItem label='My Pets' address='my-pets' icon={CiViewList} />          
              

             {/* Adoption Request */}
             <MenuItem label='Adopt Pets' address='my-adopt' icon={SiEclipseadoptium} />  
            

             {/* Create Donation Campaign */}
             <MenuItem label='Create Campaign' address='campaign' icon={VscGitPullRequestCreate} />  
            

             {/* My Donation Campaigns */}
             <MenuItem label='My Campaigns' address='my-campaigns' icon={MdOutlineCampaign} />  
             
             {/* My Donations */}
             <MenuItem label='My Donations' address='my-donations' icon={BiSolidDonateHeart} />  
        </>
    );
};

export default UserMenu;