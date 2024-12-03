import {toSvg} from "jdenticon";
import axiosUtil from "./AxiosUtil.js";

export function generateAvatar(username, size) {
    const svgString = toSvg(username, size);
    return btoa(svgString);
}

export function sendAvatarToServer(base64, type) {
    axiosUtil
        .post("main/upload-avatar", {base64: base64, type: type})
        .then();
}
