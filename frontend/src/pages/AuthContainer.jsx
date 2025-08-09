
import { useState } from "react";
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';
import { useSearch } from "@tanstack/react-router";

export default function AuthContainer() {
  const {mode} = useSearch({from: "/auth"});
  const [login, setLogin] = useState(mode !== "register");

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {login ? (
          <LoginForm
            state={setLogin}
          />
        ) : (
          <RegisterForm
            state={setLogin}
          />
        )}
      </div>
    </div>
  );
}
