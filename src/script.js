const title = document.querySelector(".title");
const subtitle = document.querySelector(".subtitle");
const content = document.querySelector(".content");
const loader = document.querySelector(".loader");

const PATH = "./src/data/";
const TYPE = ".json";

document.addEventListener("DOMContentLoaded", (event) => {
  location.hash = "home";
  uploadContent("home");
});

const uploadContent = (page) => {
  const request = new XMLHttpRequest();
  request.open("GET", PATH + page + TYPE);
  request.send();
  request.onload = function () {
    const data = JSON.parse(request.response)
    title.textContent = data.title;
    subtitle.textContent = data.subtitle;
    content.appendChild(templateEngine(data.body));
    loader.classList.add("loader_none");
  };
}

content.addEventListener("click", () => {
  event.preventDefault();
  const { target } = event;
  if (target.hash == undefined) {
    return;
  } else {
    const way = target.hash.slice(1);
    title.innerHTML = "";
    content.innerHTML = "";
    subtitle.innerHTML = "";
    loader.classList.remove("loader_none");
    uploadContent(way);
  }
})

