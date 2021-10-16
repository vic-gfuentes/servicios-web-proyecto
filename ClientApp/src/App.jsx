import React, { useState } from "react";
import AppContext from "./context/AppContext";
import Layout from "./components/layout";
import Routes from "./router";

const App = () => {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <AppContext.Provider
      value={{
        user: [currentUser, setCurrentUser],
      }}
    >
      <Layout>
        <Routes />
      </Layout>
    </AppContext.Provider>
  );
};

export default App;
