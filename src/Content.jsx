import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignInForm from "./LoginForm/SignInForm.jsx";
import SignUpForm from "./LoginForm/SignUpForm.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import MainPage from "./MainPage/MainPage.jsx";

function Content() {
    return (
        <div id="content">
            <Router>
                <Routes>
                    <Route path="/" element={<SignInForm/>}/>
                    <Route path="/sign-in" element={<SignInForm/>}/>
                    <Route path="/sign-up" element={<SignUpForm/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    {/*<Route*/}
                    {/*    path="/main"*/}
                    {/*    element={*/}
                    {/*        <PrivateRoute>*/}
                    {/*            <MainPage/>*/}
                    {/*        </PrivateRoute>*/}
                    {/*    }*/}
                    {/*/>*/}
                </Routes>
            </Router>
        </div>
    );
}

export default Content;
