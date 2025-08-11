import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/Slices/AuthSlice/AuthSlice";
import authService from "./services/auth/auth";
import { Header, Footer } from "./components/index.";
import "./components/CSS/Global.css";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  console.log(import.meta.env.VITE_APPWRITE_URL, "CHECK ENV");
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login({ userData: user }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        console.log("User checked");
      });
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <div className="min-h-screen flex flex-wrap justify-between bg-gray-400">
          <div className="w-full block">
            <Header />
            <main>{/* <Outlet /> */}</main>
            <Footer />
          </div>
        </div>
      ) : (
        <h1>Chalta ha bhai</h1>
      )}
    </>
  );
}

export default App;
