import Header from "../components/Layout/Header.jsx";
import ContentContainer from "../components/Layout/ContentContainer.jsx";
import Footer from "../components/Layout/Footer.jsx";
import SignInForm from "../components/LoginForm/SignInForm.jsx";

function SignInPage(){
    return(
        <>
            <Header/>
            <ContentContainer>
                <SignInForm/>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default SignInPage;
