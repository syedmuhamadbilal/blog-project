import { type ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { AuthState } from "../../store/Slices/AuthSlice/AuthSlice";

type Props = {
  children: ReactNode;
  authentication: boolean;
};

const ProtectedRoute = ({ children, authentication = true }: Props) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state: AuthState) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus === authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>...Loading</h1> : { children };
};

export default ProtectedRoute;
