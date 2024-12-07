import Cookies from "js-cookie";

function saveTokenToCookies(token, name){
    // const accessTokenExpires = new Date(JSON.parse(atob(token.split(".")[1])).exp * 1000);
    Cookies.set(name, token, {
        expires: 7,
        sameSite: "Strict",
        path: "/",
    });
}

export default saveTokenToCookies;
