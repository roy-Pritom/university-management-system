import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Navigate } from "react-router-dom";
import { TUser, logout } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
type TProtectedRouteProps = {
       children: ReactNode;
       role: string | undefined;
}
const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
       const token = useAppSelector((state: RootState) => state.auth.token);
       // const user=useAppSelector((state:RootState)=>state.auth.user);
       const dispatch = useAppDispatch();

       let user;
       if (token) {
              user = (verifyToken(token) as TUser)
       }
       // console.log(user);
       // console.log(role);
       if (role !== undefined && role !== user?.role) {
              // console.log('lll');
              dispatch(logout())
              return <Navigate to='/login' replace={true}></Navigate>
       }
       if (!token) {
              return <Navigate to='/login' replace={true}></Navigate>
       }
       return children;
};

export default ProtectedRoute;