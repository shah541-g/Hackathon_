import React, { useState } from "react";
import { useAuth } from "../Context/authContext";
import { Camera, Globe, Shuffle } from "lucide-react";
import { onBoardingData } from "../API/auth";
import toast from "react-hot-toast";

const OnBoardingPage = () => {
  const { currentUser, setCurrentUser } = useAuth();

  const [formData, setFormData] = useState({
    userName: currentUser?.username || "",
    bio: currentUser?.bio || "",
    avatar: currentUser?.avatar || "",
  });
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeAvatar = (e) => {
    e.preventDefault();
    const index = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = currentUser?.photoURL || `https://avatar.iran.liara.run/public/${index}`;
    setFormData((prev) => ({
      ...prev,
      avatar: randomAvatar,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const userId = currentUser?.id;
      if (!userId) {
        toast.error("You have no Account");
        return;
      }

      const { userName, bio, avatar } = formData;

      const res = await onBoardingData({ id: userId, userName, bio, avatar });
      toast.success(res.data.message);

      
      const isOnboarded = Boolean(res?.data.data?.user?.onboarding); 
      localStorage.setItem("onBoarded", String(isOnboarded)); 

      setCurrentUser(res.data.data.user);
      console.log("user updated data ", res.data.data.user);
      // Assuming setCurrentUser comes from useAuth()
    } catch (error) {
      const message =
        error?.response?.data?.message || "Error during onboarding";
      toast.error(message);
      console.error("Error during onboarding:", error);
    } finally {
      setIsPending(false);
    }
  };

  // const {currentUser} = useAuth()
  console.log("On boarding user ", currentUser);

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 p-6">
      <div className="w-full max-w-xl bg-base-200 rounded-xl shadow-lg border border-primary/20 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-primary mb-6">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-secondary shadow-md"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center border border-dashed border-primary rounded-full text-base-content opacity-50">
                <Camera className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
            )}
            <button
              onClick={handleChangeAvatar}
              className="btn btn-outline btn-secondary flex items-center gap-2 text-sm"
            >
              <Shuffle size={16} />
              Generate Avatar
            </button>
          </div>

          <div>
            <label
              htmlFor="userName"
              className="block text-sm text-primary mb-1"
            >
              User Name
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              placeholder="JohnDoe"
              className="input input-secondary w-full rounded-md"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm text-primary mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Write a short bio..."
              className="textarea textarea-secondary w-full rounded-md"
            />
          </div>

          <button
            className="btn btn-primary w-full flex justify-center items-center gap-2"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <span className="loading loading-spinner text-secondary"></span>
            ) : (
              <>
                <Globe size={16} />
                Complete Onboarding
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnBoardingPage;
