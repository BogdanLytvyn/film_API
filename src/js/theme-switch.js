const Theme = {
  LIGHT: "light-theme",
  DARK: "dark-theme",
};

const input = document.querySelector("#theme-switch-toggle");
const footerRef = document.querySelector(".footer");

input.addEventListener("change", changeTheme);

setDefaultTheme();
darkThemeCheck();
function setDefaultTheme() {
  document.body.classList.add(Theme.LIGHT);
  footerRef.classList.add(Theme.LIGHT);

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    const parsedTheme = JSON.parse(savedTheme);
    document.body.classList.add(parsedTheme);
    footerRef.classList.add(parsedTheme);
  }
}

function changeTheme(event) {
  if (event.target.checked) {
    document.body.classList.replace(Theme.LIGHT, Theme.DARK);
    footerRef.classList.replace(Theme.LIGHT, Theme.DARK);
    localStorage.setItem("theme", JSON.stringify(Theme.DARK));
  } else {
    document.body.classList.replace(Theme.DARK, Theme.LIGHT);
    footerRef.classList.replace(Theme.DARK, Theme.LIGHT);
    localStorage.setItem("theme", JSON.stringify(Theme.LIGHT));
  }
}

function darkThemeCheck() {
  if (document.body.classList.contains(Theme.DARK)) {
    input.checked = true;
    document.body.classList.remove(Theme.LIGHT);
    footerRef.classList.remove(Theme.LIGHT);
  }
}
