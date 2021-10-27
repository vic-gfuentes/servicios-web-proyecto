import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import AdminPage from "../../pages/admin";
import MaintenancePage from "../../pages/maintenance";
import SecurityPage from "../../pages/security";
import ConsecutivePage from "../../pages/consecutive";
import CustomerPage from "../../pages/customer";

const Dashboard = () => {
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = user;

  const renderDashboard = () => {
    switch (currentUser.role) {
      case 1:
        return <AdminPage />;
      case 2:
        return <MaintenancePage />;
      case 3:
        return <SecurityPage />;
      case 4:
        return <ConsecutivePage />;
      case 5:
        return <CustomerPage />;
      default:
        return <div>No content to show sorry, you dont have any role</div>;
    }
  };

  return <div>{renderDashboard()}</div>;
};

export default Dashboard;
