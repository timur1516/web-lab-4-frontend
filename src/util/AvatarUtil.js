import {toSvg} from "jdenticon";
import axiosUtil from "./AxiosUtil.js";

export function generateAvatar(username, size = 100) {
    const svgString = toSvg(username, size);
    return btoa(svgString);
}

export async function sendAvatarToServer(base64, type) {
    await axiosUtil.post("main/upload-avatar", {base64: base64, type: type});
}
