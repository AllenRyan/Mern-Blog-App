import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function AdminPrivateRouter({children}) {
    const {currentUser} = useSelector(state => state.user);
    return currentUser && currentUser.isAdmin ? children : <Navigate to= '/sign-in' />;
}

export default AdminPrivateRouter
