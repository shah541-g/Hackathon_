import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "../FireBase/firebaseConfig.js";
import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", // full backend base URL
});

const auth = getAuth(app);

export const continueWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const fullName = user.displayName || "";
    const [firstName = "", lastName = ""] = fullName.split(" ");
    const token = await user.getIdToken();

    const payload = {
      googleId: user.uid,
      email: user.email,
      firstName,
      lastName,
      avatar: user.photoURL,
    };

    const response = await api.post(`/auth/google`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { user: backendUser, token: backendToken } = response.data.data;

    localStorage.setItem("token", backendToken);
    const isOnboarded = Boolean(response?.data.data?.user?.onboarding);
    localStorage.setItem("onBoarded", String(isOnboarded));

    // toast.success("Signed in successfully with Google");

    return backendUser;
  } catch (error) {
    console.error("Google login error:", error);

    if (error.code === "auth/network-request-failed") {
      toast.error("Network error. Please check your internet connection.");
    } else {
      const errMsg =
        error?.response?.data?.message || error.message || "Google login failed.";
      toast.error(errMsg);
    }

    throw error; // so you can handle it further where you call this function
  }
};

export const continueWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Get GitHub OAuth access token
    const credential = GithubAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    let githubUsername = "defaultgithub";
    let avatarUrl = user.photoURL;

    try {
      const githubResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (githubResponse.ok) {
        const githubData = await githubResponse.json();
        githubUsername = githubData.login || githubUsername;
        avatarUrl = githubData.avatar_url || avatarUrl;
      } else {
        toast.error("Failed to fetch GitHub username");
      }
    } catch (fetchError) {
      console.error("GitHub user data fetch error:", fetchError);
      toast.error("GitHub user data fetch failed");
    }

    const token = await user.getIdToken();
    const fullName = user.displayName || "";
    const [firstName = "", lastName = ""] = fullName.split(" ");

    const payload = {
      githubId: user.uid,
      email: user.email,
      firstName,
      lastName,
      username: githubUsername,
      avatar: avatarUrl,
    };

    const response = await api.post(`/auth/github`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { user: backendUser, token: backendToken } = response.data.data;

    localStorage.setItem("token", backendToken);
    localStorage.setItem("onBoarded", String(Boolean(backendUser?.onboarding)));
    localStorage.setItem("user", JSON.stringify(backendUser));

    // toast.success("Signed in successfully with GitHub");

    return backendUser;
  } catch (error) {
    console.error("GitHub login error:", error);

    if (error.code === "auth/network-request-failed") {
      toast.error("Network error. Please check your internet connection.");
    } else {
      const errMsg = error?.response?.data?.message || error.message || "GitHub login failed.";
      toast.error(errMsg);
    }

    throw error;
  }
};

export const loginWithMail = async ({ email, password }) => {
  return await api.post("/auth/login", { email, password });
};
export const signUpWithMail = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  return await api.post("/auth/register", {
    firstName,
    lastName,
    email,
    password,
  });
};

export const onBoardingData = async ({ id, bio, userName, avatar }) => {
  return await api.post(`/auth/onBoarding/${id}`, {
    bio,
    userName,
    avatar,
  });
};

export const sendAuthenticationToken = async ({ token }) => {
  try {
    const response = await api.post("/api/firebaseAuthToken", { token });

    if (response.status === 200) {
      console.log("Token sent successfully");
    } else {
      console.log("Unexpected response status:", response.status);
    }
  } catch (error) {
    console.error("Failed to send token:", error);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.clear(); 
    console.log("User logged out and localStorage cleared");
  } catch (error) {
    console.error("Logout error:", error.message);
  }
};

