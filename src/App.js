import React from "react";
import AppNavigator from "./routes/AppNavigator";
import AuthProvider from "./auth/AuthContext";
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
