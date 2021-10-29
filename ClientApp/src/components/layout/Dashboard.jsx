import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import GeneralPage from "./pages/GeneralPage";
import CustomerPage from "./pages/CustomerPage";
import NonAuthorized from "./pages/NonAuthorized";

const Dashboard = () => {
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = user;

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 1:
      case 2:
      case 3:
      case 4:
        return <GeneralPage />;
      case 5:
        return <CustomerPage />;
      default:
        return <NonAuthorized />;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default Dashboard;
