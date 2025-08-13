import { useDispatch } from "react-redux";
import authService from "../../../services/auth/auth";
import { logout } from "../../../store/Slices/AuthSlice/AuthSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await authService.logout();
      if (res) {
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
