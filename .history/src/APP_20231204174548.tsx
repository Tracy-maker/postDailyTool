import { Route, Routes } from "react-router-dom";
import "./globals.css";
import SigninForm from "./_auth/forms/SigninForm";
import { Home } from "./_root/pages";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";

const App = () => {
  return (
    <main className="flex h-screen">
      <Route>
        <Route element={<AuthLayout />} >
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
</Route>

        <Route index element={<Home />} />
      </Routes>
    </main>
  );
};

export default App;
