// Variables
const btnMobile = document.getElementById("btn-mobile");
const header = document.querySelector(".header");
const btnShortenLink = document.getElementById("btnShortenLink");
const shortenLinkDisplay = document.querySelector(".shorten-links");

// Functions
const ShortenLink = (link) => {
  fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error_code) {
        alert("Invalid Link");
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
  const inputLink = document.getElementById("linkInput").value;
  ShortenLink(inputLink);
});

document.addEventListener("click", (e) => {
  let target = e.target;

  if (target.id === "copyButton") {
    navigator.clipboard.writeText(target.value);
  }
});
