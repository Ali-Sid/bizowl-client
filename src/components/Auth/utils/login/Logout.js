import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "config/firebase";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      await auth.signOut();
    };

    logout();
  }, []);

  // Redirect to the login page after logout
  return <Redirect to="/login" />;
};

export default Logout;
