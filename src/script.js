// Variables
const btnMobile = document.getElementById("btn-mobile");
const header = document.querySelector(".header");
const btnShortenLink = document.getElementById("btnShortenLink");
const shortenLinkDisplay = document.querySelector(".shorten-links");
const inputWrapper = document.querySelector(".input-wrapper");

// Functions
const ShortenLink = (link) => {
  fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error_code) {
        inputWrapper.classList.add("error");
      }

      let div = document.createElement("div");
      let p = document.createElement("p");
      let span = document.createElement("span");
      let anchor = document.createElement("a");
      let button = document.createElement("button");

      p.textContent = link;
      anchor.href = data.result.short_link2;
      anchor.textContent = data.result.short_link2;
      button.textContent = "Copy";
      button.id = "copyButton";
      button.value = data.result.short_link2;

      shortenLinkDisplay.appendChild(div);
      div.appendChild(p);
      div.appendChild(span);
      span.appendChild(anchor);
      span.appendChild(button);

      div.classList.add("link-shortened-wrapper");
      span.classList.add("wrapper");
    });
};

// Events
btnMobile.addEventListener("click", () => {
  header.classList.toggle("active");
});

btnShortenLink.addEventListener("click", () => {
  let inputLink = document.getElementById("linkInput");
  if (ShortenLink(inputLink.value) != undefined) {
    ShortenLink(inputLink);
    inputWrapper.classList.remove("error");
  }
  inputWrapper.classList.remove("error");
  inputLink.value = "";
});

document.addEventListener("click", (e) => {
  let target = e.target;

  if (target.id === "copyButton") {
    navigator.clipboard.writeText(target.value);
    target.textContent = "Copied!";
    target.style.backgroundColor = "hsl(257, 27%, 26%)";
  }
});
