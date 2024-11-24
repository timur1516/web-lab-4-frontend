import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SignInPage from "./pages/SignInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<SignInPage/>}/>
                    <Route path="/sign-in" element={<SignInPage/>}/>
                    <Route path="/sign-up" element={<SignUpPage/>}/>
                    <Route path="/main" element={<MainPage/>}/>
                    <Route path="/error" element={<ErrorPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>
        </>
    );
}

export default App;
