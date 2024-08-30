import { ReactNode } from "react";

import { Navigate, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/Token/verifyToken";
import { SignOut } from "@/redux/features/userSlice";
import toast from "react-hot-toast";

export type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token);

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  // @ts-expect-error: Unreachable code error
  if (role !== undefined && role !== user?.role) {
    dispatch(SignOut());
    toast.error(
      "You are not authorized to access this page, please sign in again with correct role"
    );

    return <Navigate to="/sign-in" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/sign-in" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
