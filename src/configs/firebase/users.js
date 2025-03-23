import { fbAuth } from ".";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

export const createUser = async (email, password, name) => {
  try {
    const user = await createUserWithEmailAndPassword(fbAuth, email, password);

    if (fbAuth.currentUser) {
      await updateProfile(fbAuth.currentUser, {
        displayName: name,
      });
    }
    localStorage.setItem("is_logged", "true");
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating user");
  }
};

export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(fbAuth, email, password);
    const user = userCredential.user;
    localStorage.setItem("is_logged", "true");
    return user;
  } catch (error) {
    console.error("Signin error", error.code, error.message);
    throw error;
  }
};

export const refreshToken = async () => {
  const user = fbAuth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return token;
  }
  return null;
};

export const logOut = async () => {
  try {
    await fbAuth.signOut();
     localStorage.setItem("is_logged", "false");
  } catch (error) {
    console.error(error);
  }
};

export const isLogged = async () => {
  const isLoggedState =  localStorage.getItem("is_logged");
  const isLogged = isLoggedState === "true";
  return isLogged;
};
