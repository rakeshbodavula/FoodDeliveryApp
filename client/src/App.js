import { useState, useContext, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import OrderFood from "./Components/OrderFood";
import ItemDetails from "./Components/ItemDetails";

// create a context for authentication
export const AuthContext = createContext()

const App = () => {
  // set initial state for authentication token
  const [authToken, setAuthToken] = useState(null);

  // check for authentication token in local storage on initial render
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  // log out user by removing authentication token from local storage and resetting authToken state
  const logout = () => {
    console.log("Called!")
    localStorage.removeItem('token')
    setAuthToken(null)
  }

  return (
    // set up router and provide authentication context
    <Router>
      <AuthContext.Provider value={{ authToken, setAuthToken, logout }}>
        <div className="App">
          {/* render navbar component */}
          <Navbar></Navbar>
          {/* set up routes */}
          <Routes>
            {/* set up route for home page */}
            <Route exact path="/" element={<Home></Home>}></Route>
            {/* set up route for login page; if user is already logged in, redirect to home page */}
            <Route exact path="/login" element={authToken ? <Navigate to="/" /> : <Login></Login>}></Route>
            {/* set up route for order page; if user is not logged in, prompt them to log in */}
            <Route exact path="/order" element={authToken ? <OrderFood></OrderFood> : <h1>Please Login to gain access!</h1>}></Route>
            {/* set up route for item details page; if user is not logged in, prompt them to log in */}
            <Route exact path="/itemdetails/:category" element={authToken ? <ItemDetails></ItemDetails> : <h1>Please login to gain access</h1>}></Route>
          </Routes>
        </div>
      </AuthContext.Provider>
    </Router >
  );
}

// export App component as default
export default App;
