const slides = [
  {
    tabLabel: "Rostov-on-Don, Admiral",
    city: "Rostov-on-Don\nLCD admiral",
    area: "81 m²",
    time: "3.5 months",
    cost: "Upon request",
    image: "./images/slide-1.svg",
    imageAlt: "Rostov-on-Don Admiral project"
  },
  {
    tabLabel: "Sochi Thieves",
    city: "Sochi\nThieves district",
    area: "105 m²",
    time: "4 months",
    cost: "Upon request",
    image: "./images/slide-2.svg",
    imageAlt: "Sochi Thieves project"
  },
  {
    tabLabel: "Rostov-on-Don, Patriotic",
    city: "Rostov-on-Don\nPatriotic district",
    area: "93 m²",
    time: "3 months",
    cost: "Upon request",
    image: "./images/slide-3.svg",
    imageAlt: "Rostov-on-Don Patriotic project"
  }
];

const state = {
  activeIndex: 0
};

const tabsContainer = document.getElementById("sliderTabs");
const dotsContainer = document.getElementById("sliderDots");
const slideImage = document.getElementById("slideImage");
const slideCity = document.getElementById("slideCity");
const slideArea = document.getElementById("slideArea");
const slideTime = document.getElementById("slideTime");
const slideCost = document.getElementById("slideCost");
const prevButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");

const tabElements = [];
const dotElements = [];

function normalizeIndex(index) {
  return (index + slides.length) % slides.length;
}

function renderSlide(nextIndex) {
  state.activeIndex = normalizeIndex(nextIndex);
  const slide = slides[state.activeIndex];

  slideImage.src = slide.image;
  slideImage.alt = slide.imageAlt;
  slideCity.textContent = slide.city;
  slideArea.textContent = slide.area;
  slideTime.textContent = slide.time;
  slideCost.textContent = slide.cost;

  tabElements.forEach((tab, index) => {
    const isActive = index === state.activeIndex;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-current", String(isActive));
  });

  dotElements.forEach((dot, index) => {
    const isActive = index === state.activeIndex;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", String(isActive));
  });
}

function createNavigation() {
  slides.forEach((slide, index) => {
    const tabItem = document.createElement("li");
    const tabLink = document.createElement("a");
    tabLink.className = "slider__tab";
    tabLink.href = "#";
    tabLink.textContent = slide.tabLabel;
    tabLink.dataset.index = String(index);
    tabLink.setAttribute("role", "button");
    tabLink.addEventListener("click", (event) => {
      event.preventDefault();
      renderSlide(index);
    });
    tabItem.append(tabLink);
    tabsContainer.append(tabItem);
    tabElements.push(tabLink);

    const dotButton = document.createElement("button");
    dotButton.className = "slider__dot";
    dotButton.type = "button";
    dotButton.dataset.index = String(index);
    dotButton.setAttribute("aria-label", `Open slide ${index + 1}`);
    dotButton.addEventListener("click", () => {
      renderSlide(index);
    });
    dotsContainer.append(dotButton);
    dotElements.push(dotButton);
  });
}

createNavigation();
renderSlide(state.activeIndex);

prevButton.addEventListener("click", () => {
  renderSlide(state.activeIndex - 1);
});

nextButton.addEventListener("click", () => {
  renderSlide(state.activeIndex + 1);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    renderSlide(state.activeIndex - 1);
  }

  if (event.key === "ArrowRight") {
    renderSlide(state.activeIndex + 1);
  }
});
