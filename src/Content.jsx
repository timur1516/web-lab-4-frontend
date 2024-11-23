import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignInForm from "./LoginForm/SignInForm.jsx";
import SignUpForm from "./LoginForm/SignUpForm.jsx";
import MainPage from "./MainPage/MainPage.jsx";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";

function Content() {
    return (
        <div id="content">
            <Router>
                <Routes>
                    <Route path="/" element={<SignInForm/>}/>
                    <Route path="/sign-in" element={<SignInForm/>}/>
                    <Route path="/sign-up" element={<SignUpForm/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/error" element={<ErrorPage/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default Content;
