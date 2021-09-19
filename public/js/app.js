console.log("Client side js is loaded");

const url = "http://localhost:3000/weather?address=";
const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const list = document.querySelector("ul");

const adjustData = (data) => {
  return Object.values(data).join(" ");
};

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = input.value;
  fetch(url + encodeURIComponent(address))
    .then((res) => res.json())
    .then((data) =>
      data.error
        ? (list.innerHTML = `<li>${data.error}</li>`)
        : (list.innerHTML = `<li>${adjustData(data)}</li>`)
    );
});
