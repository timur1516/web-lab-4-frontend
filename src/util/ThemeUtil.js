const themes = ["theme1", "theme2", "theme3", "theme4", "theme5", "theme6"];

export function switchTheme() {
    const currentThemeIndex = themes.indexOf(localStorage.getItem("theme") || "");
    const theme = themes
        .slice(0, currentThemeIndex)
        .concat(themes.slice(currentThemeIndex + 1))[Math.floor(Math.random() * (themes.length - 1))];
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

export function loadTheme() {
    let theme = localStorage.getItem("theme") || "";
    document.documentElement.setAttribute("data-theme", theme);
}

export function setDefaultTheme() {
    localStorage.setItem("theme", "");
    loadTheme();
}

export function setErrorPageTheme(){
    localStorage.setItem("theme", "error");
    loadTheme();
}

export function setNotFoundPageTheme(){
    localStorage.setItem("theme", "notFound");
    loadTheme();
}

export function dropTheme() {
    localStorage.removeItem("theme");
    loadTheme();
}