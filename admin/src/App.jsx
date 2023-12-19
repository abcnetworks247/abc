import { Routes, Route } from "react-router-dom";
// import UpdatePassword from "./pages/auth/updatepasswor
import SignUp from "./pages/auth/sign-up";
import SignIn from "./pages/auth/sign-in";
import Recover from "./pages/auth/recover";
import UpdatePassword from "./pages/auth/updatepassword";
import Dashboard from "./layouts/dashboard";
function App() {
  return (
<Routes>
  <Route element={<SignUp />} path="/signup" />
  
  <Route element={<SignIn />} path="/" />
  <Route element={<Recover />} path="/recover" />
  <Route element={<UpdatePassword />} path="/updatepassword" />
  <Route element={<Dashboard />} path="/dashboard/*" />
</Routes>
  );
}

export default App;
