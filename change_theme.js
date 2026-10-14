// ============== change theme ==============
var theme = localStorage.getItem("saved_theme");
if (theme == null) {
	theme = "light";
	localStorage.setItem("saved_theme", theme);
	// set the icon to sun
}
setTheme(theme);

document.querySelector("#change-theme").addEventListener("click", function () {
	if (theme == "light") {
		theme = "dark";
	} else {
		theme = "light";
	}
	setTheme(theme);
	localStorage.setItem("saved_theme", theme);
});

// function to set theme every time
function setTheme(theme) {
	if (theme == "light") {
		document.querySelector("body").style.backgroundColor = "#ffffff";
		// set the icon to sun
	} else {
		document.querySelector("body").style.backgroundColor = "#222222";
		// set the icon to moon
	}
}
