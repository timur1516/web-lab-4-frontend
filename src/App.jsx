import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from "./LoginForm/SignUpForm";
import SignInForm from "./LoginForm/SignInForm";
import Header from './Header';
import Footer from './Footer'
import PrivateRoute from './PrivateRoute';
import MainPage from './MainPage/MainPage';

function App() {
  return(
    <>
      <Header/>
      <div id="content">
            <Router>
                <Routes>
                  <Route path="/" element={<SignInForm />} />
                  <Route path="/sign-in" element={<SignInForm />} />
                  <Route path="/sign-up" element={<SignUpForm />} />
                  <Route
                    path="/main"
                    element={
                      <PrivateRoute>
                        <MainPage />
                      </PrivateRoute>
                    }
                  />
                </Routes>
            </Router>
        </div>
      <Footer/>
    </>
  );
}

export default App;
