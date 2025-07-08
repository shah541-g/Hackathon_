import React, { useEffect, useState } from "react";
import { deleteAccount, getUserProfile, updateUserProfile } from "../API/user";
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Shuffle } from "lucide-react";
import { useAuth } from "../Context/authContext";
import { logoutUser } from "../API/auth";

const SettingsPage = () => {
  const [userData, setUserData] = useState(null);
  const { currentUser, setCurrentUser } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    bio: "",
    avatar: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserProfile();
        const user = response.data.user;
        setUserData(user);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          username: user.username || "",
          bio: user.bio || "",
          avatar: user.avatar || "",
        });
      } catch (error) {
        toast.error("Failed to load profile.");
        console.error("Profile fetch error:", error);
      }
    };
    getData();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed.");
      console.error(err);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const res = await deleteAccount();
      if (res?.message) {
        toast.success(res.message);
        setTimeout(() => {
        navigate("/home");
      }, 1500);
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const generateRandomAvatar = () => {
    const index = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${index}`;
    setFormData({ ...formData, avatar: randomAvatar });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await updateUserProfile(formData);
      if (res?.data?.user) {
        setCurrentUser(res.data.user);
        toast.success("Profile updated successfully!");
        navigate("/");
        console.log("Updated user:", res.data.user);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Update error:", error);
      const msg =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong!";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-semibold text-base-content mb-6 border-b border-base-300 pb-2 pt-5">
        Profile Settings
      </h1>

      {userData ? (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={formData.avatar}
              alt="Avatar"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full  border-2 shadow"
            />
            <button
              onClick={generateRandomAvatar}
              className="btn btn-sm btn-outline btn-accent"
            >
              <Shuffle size={16} />
              Generate Avatar
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="input input-bordered w-full"
              />
            </div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="userName: e.g. john_doe (letters, numbers, and underscores only)"
              className="input input-bordered w-full"
            />
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Bio"
              rows="3"
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <button
              onClick={handleUpdateProfile}
              className="btn btn-sm btn-primary"
            >
              Update
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline btn-primary"
            >
              Sign Out
            </button>
            <button
              onClick={handleDeleteAccount}
              className="btn btn-sm btn-outline btn-error ml-auto"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <div className="text-base-content/70">Loading profile...</div>
      )}
    </div>
  );
};

export default SettingsPage;
