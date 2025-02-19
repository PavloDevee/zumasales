import { FC, useState } from "react";

import LoginForm from "@/components/forms/loginform/LoginForm";

const Login: FC = () => {
  const [login, setLogin] = useState<boolean>(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8  border border-gray-300 w-full max-w-md h-screen flex flex-col items-center justify-center gap-5">
        <h1 className="text-5xl font-semibold text-gray-900 dark:text-white text-center">
          Zuma Sales
        </h1>
        <LoginForm login={login} />
        <div className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?
          <button
            type="button"
            onClick={() => setLogin(!login)}
            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            {login ? 'Sign up here' : 'Login here'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;