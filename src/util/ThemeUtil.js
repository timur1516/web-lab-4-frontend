const themes = ["", "theme1", "theme2"];

export function switchTheme() {
    const currentThemeIndex = themes.indexOf(localStorage.getItem("theme") || "");
    const theme = themes
        .slice(0, currentThemeIndex)
        .concat(themes.slice(currentThemeIndex + 1))[Math.floor(Math.random() * (themes.length - 1))];
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}

export function setTheme() {
    let theme = localStorage.getItem("theme") || "";
    document.documentElement.setAttribute("data-theme", theme);
}

export function dropTheme() {
    localStorage.removeItem("theme");
    document.documentElement.setAttribute("data-theme", "");
}