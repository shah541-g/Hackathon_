import { useState } from "react";
import {  continueWithGithub, continueWithGoogle, signUpWithMail } from "../API/auth";
import { Bolt } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
// import { sendAuthenticationToken } from "../API/auth";
import toast from "react-hot-toast";
import { useAuth } from "../Context/authContext";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
const {setCurrentUser} = useAuth();
  const [isPending, setIsPending] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGooglrLogin = async (provider) => {
     setLoadingProvider(provider);
     setError(null);
     try {
       const backendUser = await continueWithGoogle();
       toast.success(`${provider} SignUp successful!`);
       setCurrentUser(backendUser);
       navigate(
         backendUser.onboarding == "true" ? "/" : "/onBoarding",
         { replace: true } 
       );
     } catch (err) {
       console.error(err);
       const msg = err?.response?.data?.message || err.message || "Login failed";
       toast.error(msg);
       setError(msg);
     } finally {
       setLoadingProvider(null);
     }
   };
   const handleGithubLogin = async (provider) => {
     setLoadingProvider(provider);
     setError(null);
     try {
       const backendUser = await continueWithGithub();
       toast.success(`${provider} login successful!`);
       setCurrentUser(backendUser);
       navigate(
         backendUser.onboarding == "true" ? "/" : "/onBoarding",
         { replace: true } 
       );
     } catch (err) {
       console.error(err);
       const msg = err?.response?.data?.message || err.message || "Login failed";
       toast.error(msg);
       setError(msg);
     } finally {
       setLoadingProvider(null);
     }
   };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsPending(true);
  setError(null);

  try {
    const res = await signUpWithMail(data);
    const { token, user } = res.data.data;
    setCurrentUser(user)

    localStorage.setItem("token", token);

    toast.success(res.data.message);
  } catch (err) {
    console.error(err);
    const errorMsg =
      err.response?.data?.message || err.message || "Signup failed.";
    toast.error(errorMsg);

    setError(errorMsg);
  } finally {
    setIsPending(false);
  }
};

  return (
   <div className="min-h-screen flex justify-center items-center px-4 py-12 md:p-8 bg-base-200 overflow-auto">

      <div className="flex flex-col md:flex-row rounded-xl overflow-hidden">
        {/* Left Panel */}
        <div className="flex flex-col justify-start items-start border border-primary/25 rounded-l-xl p-6 bg-base-100 shadow-lg w-full md:w-1/2">
          <section className="flex justify-start items-center gap-2 mb-1">
            <Bolt className="size-9 text-primary" />
            <h1 className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              PromStack
            </h1>
          </section>

          {error && (
            <div className="alert alert-error shadow-lg mb-2 w-full">
              <span className="text-white">{error}</span>
            </div>
          )}

          <section className="flex flex-col items-start justify-start mb-4">
            <h2 className="text-2xl">Sign Up</h2>
            <p className="text-xs">
              Create your PromStack account to start building and collaborating
            </p>
          </section>

          <form onSubmit={handleSubmit} className="w-full space-y-2">
            <div className="flex gap-3">

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={data.firstName}
                onChange={handleChange}
                placeholder="John"
                className="input input-bordered rounded-md w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={data.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="input input-bordered rounded-md w-full"
              />
            </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                required
                value={data.email}
                onChange={handleChange}
                placeholder="john@gmail.com"
                className="input input-bordered rounded-md w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                required
                value={data.password}
                onChange={handleChange}
                placeholder="********"
                className="input input-bordered rounded-md w-full"
              />
            </div>

            <button
              className="btn btn-primary w-full mt-6"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner text-secondary" />
              ) : (
                "Sign Up"
              )}
            </button>

            <p className="flex justify-center items-center text-sm">
              Already have an account?
              <Link to="/login" className="link link-primary ml-1">
                Sign in
              </Link>
            </p>
          </form>

          <div className="w-full flex flex-col gap-2 mt-4">
            <button
              onClick={() => handleGooglrLogin("google")}
              className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-black font-medium px-6 py-2 rounded hover:bg-gray-100 transition"
              disabled={loadingProvider === "google"}
            >
              {loadingProvider === "google" ? (
                "Signing Up..."
              ) : (
                <>
                  <FcGoogle className="text-xl" />
                  Continue with Google
                </>
              )}
            </button>

            <button
              onClick={() => handleGithubLogin("github")}
              className="flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              disabled={loadingProvider === "github"}
            >
              {loadingProvider === "github" ? (
                "Signing Up..."
              ) : (
                <>
                  <FaGithub className="text-xl" />
                  Continue with GitHub
                </>
              )}
            </button>
          </div>
        </div>
        {/* Right Panel */}
        <div className="hidden md:flex flex-col justify-center items-center border border-primary/25 rounded-r-xl p-6 bg-base-100 shadow-lg bg-primary/10 w-1/2">
          <img
            className="w-3/4 h-auto"
            src="/Sign up-bro.svg"
            alt="Video call illustration"
          />
          <section className="flex flex-col items-center justify-center text-center mt-4">
            <p className="font-bold text-xl">
              Start Building with Developers Around the World
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Join PromStack to collaborate, launch projects, and grow with a
              global tech community.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signup;
