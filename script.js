const products = [
  {
    name: "LED Crystal",
    description: "Светодиодная фара с прозрачным кольцом",
    price: "12 900 ₽",
    image: "assets/lamp-crystal.png"
  },
  {
    name: "LED Turbine",
    description: "Чёрная линзованная фара с динамичным дизайном",
    price: "14 500 ₽",
    image: "assets/lamp-turbine.png"
  },
  {
    name: "LED Black",
    description: "Затемнённая линзованная фара",
    price: "15 900 ₽",
    image: "assets/lamp-black.png"
  }
];

let current = 0;
let showingOriginal = false;

const lampLeft = document.querySelector("#lampLeft");
const lampRight = document.querySelector("#lampRight");
const productImage = document.querySelector("#productImage");
const productName = document.querySelector("#productName");
const productDescription = document.querySelector("#productDescription");
const productPrice = document.querySelector("#productPrice");
const counter = document.querySelector("#counter");
const dots = document.querySelector("#dots");
const carStage = document.querySelector("#carStage");
const toggleLight = document.querySelector("#toggleLight");
const compareOriginal = document.querySelector("#compareOriginal");

function renderDots() {
  dots.innerHTML = "";
  products.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (index === current ? " active" : "");
    dot.type = "button";
    dot.addEventListener("click", () => {
      current = index;
      showingOriginal = false;
      render();
    });
    dots.appendChild(dot);
  });
}

function render() {
  const product = products[current];

  lampLeft.src = product.image;
  lampRight.src = product.image;
  productImage.src = product.image;
  productImage.alt = product.name;
  lampLeft.alt = product.name;
  lampRight.alt = product.name;

  productName.textContent = product.name;
  productDescription.textContent = product.description;
  productPrice.textContent = product.price;
  counter.textContent = `${current + 1} / ${products.length}`;

  const opacity = showingOriginal ? "0" : "1";
  lampLeft.style.opacity = opacity;
  lampRight.style.opacity = opacity;
  compareOriginal.textContent = showingOriginal ? "Показать выбранные" : "Показать штатные";

  renderDots();
}

document.querySelector("#prev").addEventListener("click", () => {
  current = (current - 1 + products.length) % products.length;
  showingOriginal = false;
  render();
});

document.querySelector("#next").addEventListener("click", () => {
  current = (current + 1) % products.length;
  showingOriginal = false;
  render();
});

toggleLight.addEventListener("click", () => {
  carStage.classList.toggle("lights-on");
  toggleLight.textContent = carStage.classList.contains("lights-on")
    ? "Выключить свет"
    : "Включить свет";
});

compareOriginal.addEventListener("click", () => {
  showingOriginal = !showingOriginal;
  render();
});

let touchStartX = 0;
carStage.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

carStage.addEventListener("touchend", e => {
  const delta = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) < 45) return;
  current = delta < 0
    ? (current + 1) % products.length
    : (current - 1 + products.length) % products.length;
  showingOriginal = false;
  render();
}, { passive: true });

render();
