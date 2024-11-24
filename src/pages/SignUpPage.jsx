import Header from "../components/Layout/Header.jsx";
import ContentContainer from "../components/Layout/ContentContainer.jsx";
import Footer from "../components/Layout/Footer.jsx";
import SignUpForm from "../components/LoginForm/SignUpForm.jsx";

function SignUpPage(){
    return(
        <>
            <Header/>
            <ContentContainer>
                <SignUpForm/>
            </ContentContainer>
            <Footer/>
        </>
    );
}

export default SignUpPage;
