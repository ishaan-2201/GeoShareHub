import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Users from "./users/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./users/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useCallback, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login=useCallback(()=>{
    setIsLoggedIn(true);

  },[])

  const logout=useCallback(()=>{
    setIsLoggedIn(false);

  },[])


  let routes;
  if (!isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
