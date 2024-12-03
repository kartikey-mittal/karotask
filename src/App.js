import React from "react";
import AppNavigator from "./routes/AppNavigator";
import AuthProvider from "./auth/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
