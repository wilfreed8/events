import  { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppProvider";

const login = () => {  

  const {  setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log(formData);
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/Home");
      console.log(data);
    }
  }

  return (
    <div className="flex items-center justify-center pt-10 bg-gray-100">
      <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Login</h2>
        </div>
       
        <form onSubmit={handleLogin}>
         
          <div className="mb-6 text-left">
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input"
            />
            {errors.email && (
              <span className="error text-red-200">{errors.email[0]}</span>
            )}
          </div>

          <div className="mb-6 text-left">
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input"
            />
            {errors.password && (
              <span className="error text-red-200">{errors.password}</span>
            )}
          </div>
          

          <button
            type="submit"
            className=" btn md:btn-soft btn-primary w-full py-3  font-semibold rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-purple-600">
          <button type="reset" className="btn btn-error md:btn-soft">
            reset
          </button>
          <span>
            already have an account?
            <Link
              to="/register"
              className="btn btn-sm animation-bounce transition-colors duration-200"
            >
              Sign UP
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default login;
