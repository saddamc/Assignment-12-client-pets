import React from 'react';
import useAuth from '../../../../hooks/useAuth';

const UserHome = () => {
    const {user} = useAuth()
    return (
        <div>
             <h2 className='text-3xl'></h2>
            <span>Hi, Welcome to </span>
            {
                user.displayName ? user.displayName : 'Back'
            }
        </div>
    );
};

export default UserHome;