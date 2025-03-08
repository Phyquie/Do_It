import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import  users from "../mockdata/mockData"
import  toast  from "react-hot-toast";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Find user with matching email and password
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      try {
        // Store login status and user ID in localStorage
        window.localStorage.setItem('isLoggedIn', 'true');
        window.localStorage.setItem('userId', user.id.toString());
        window.localStorage.setItem('userName', user.name);
        window.localStorage.setItem('userEmail', user.email);
        window.localStorage.setItem('userProfilePicture', user.profilePicture);
        

        toast.success("Login successful");
        navigate("/");
      } catch (error) {
        console.error('localStorage error:', error);
        toast.error("Error storing login data");
      }
    } else {
      toast.error("Invalid email or password");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white flex flex-col items-center justify-center">
       <div className=" text-green-700 text-4xl font-bold my-4">DoIt</div> 
      <div className="w-96 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Sign In
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              
            />
            {/* Toggle Password Visibility */}
            {showPassword ? (
              <EyeOff
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 flex items-center justify-center gap-2"
          >
            <Lock size={16} /> Sign In
          </button>
        </form>

    
      </div>
    </div>
  );
};

export default Login;
