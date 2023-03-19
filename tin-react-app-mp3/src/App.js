import Header from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/other/MainContent";
import Footer from "./components/fragments/Footer";
import { Route, Routes } from "react-router-dom";
import CustomerList from "./components/Customer/List/CustomerList";
import CustomerDetails from "./components/Customer/details/CustomerDetails";
import CustomerForm from "./components/Customer/CustomerForm";
import CarList from "./components/Car/CarList";
import CarForm from "./components/Car/CarForm";
import RentList from "./components/Rent/RentList";
import CarDetails from "./components/Car/CarDetails";
import RentDetails from "./components/Rent/RentDetails";
import RentForm from "./components/Rent/RentForm";
import { useState } from "react";
import LoginForm from "./components/other/LoginForm";
import ProtectedRoute from "./components/other/ProtectedRoute";

function App() {
  const [user, setUser] = useState();

  const handleLogin = (user) => {
    localStorage.setItem("user", user);
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return (
    <>
      <Header />
      <Navigation handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="customers">
          <Route
            exact
            index={true}
            element={
              <ProtectedRoute>
                <CustomerList />
              </ProtectedRoute>
            }
          />
          <Route exact path="details/:customerId" element={<CustomerDetails />}/>
          <Route exact path="add" element={<CustomerForm />} />
          <Route exact path="edit/:customerId" element={<CustomerForm />} />
        </Route>
        <Route path="cars">
          <Route
            exact
            index={true}
            element={
              <ProtectedRoute>
                <CarList />
              </ProtectedRoute>
            }
          />
          <Route exact path="details/:carId" element={<CarDetails />} />
          <Route exact path="add" element={<CarForm />} />
          <Route exact path="edit/:carId" element={<CarForm />} />
        </Route>
        <Route path="rents">
          <Route
            exact
            index={true}
            element={
              <ProtectedRoute>
                <RentList />
              </ProtectedRoute>
            }
          />
          <Route exact path="details/:rentId" element={<RentDetails />} />
          <Route exact path="add" element={<RentForm />} />
          <Route exact path="edit/:rentId" element={<RentForm />} />
        </Route>
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
