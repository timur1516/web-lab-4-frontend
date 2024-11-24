import ErrorMessage from "../components/ErrorMessage/ErrorMessage.jsx";
import ErrorMessageContainer from "../components/ErrorMessageContainer/ErrorMessageContainer.jsx";

function ErrorPage() {
    return (
        <ErrorMessageContainer>
            <ErrorMessage
                error={"Возникла ошибка на сервере. Пожалуйста, попробуйте повторить попытку позже"}
            />
        </ErrorMessageContainer>
    );
}

export default ErrorPage;
