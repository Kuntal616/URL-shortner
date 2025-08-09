import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async({context}) => { 
    try {
        const{ store, queryClient} = context;
        // Fetch the current user to check authentication status
        const user = await queryClient.ensureQueryData({
            queryKey: ['currentUser'],
            queryFn: getCurrentUser
        });
        if(!user){ 
             return redirect({ to: '/auth' });
        } // No user data means not authenticated
        store.dispatch(login(user));
        const {isAuthenticated} = store.getState().auth;
        if(!isAuthenticated) return redirect({ to: '/auth' });
        return true; // User is authenticated
    } catch (error) {
        return redirect({ to: '/auth' });
    }

   
}