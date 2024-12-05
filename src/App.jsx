import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignInPage from "./pages/AuthPage/SignInPage.jsx";
import SignUpPage from "./pages/AuthPage/SignUpPage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import "./index.css"
import "./themes.css"
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import {useEffect} from "react";
import {setTheme} from "./util/ThemeUtil.js";

function App() {

    useEffect(() => {
        setTheme();
    }, [])

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SignInPage/>}/>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/error" element={<ErrorPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
