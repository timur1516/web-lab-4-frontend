import ErrorMessage from "../components/ErrorMessage/ErrorMessage.jsx";
import ErrorMessageContainer from "../components/ErrorMessageContainer/ErrorMessageContainer.jsx";

function NotFoundPage(){
    return(
        <ErrorMessageContainer>
            <ErrorMessage
                error={"Похоже данной страницы не существует"}
            />
        </ErrorMessageContainer>
    );
}

export default NotFoundPage;
