const CLASS_SELECTED = "selected";
const CLASS_INVISIBLE = "invisible";

window.addEventListener("load", (event) => {
  updateCanvas();

  addCSSClassToChildElements("icons-selection-area", CLASS_INVISIBLE);
  renderIcons();
  const categories = [
    ["cheeks", 2],
    ["emotion", 7],
    ["mouth", 12],
    ["eyes", 10],
    ["sweat", 3],
    ["specs", 2],
    ["eyebrows", 5],
  ];
  for (const category of categories) {
    renderIconSelections("mao_shibisaki", category[0], category[1]);
  }
});

function updateCanvas() {
  const customizedCanvas = document.getElementById("customized-canvas");
  const context = customizedCanvas.getContext("2d");

  const images = Array.from(document.querySelectorAll(".customized-char-part"));

  images.sort((a, b) => {
    const zIndexA = parseInt(getComputedStyle(a).zIndex);
    const zIndexB = parseInt(getComputedStyle(b).zIndex);
    return zIndexA - zIndexB;
  });

  images.forEach((image) => {
    context.drawImage(image, 0, 0);
  });

  const combinedImageURL = customizedCanvas.toDataURL();

  const customizedChar = document.getElementById("customized-char");
  customizedChar.src = combinedImageURL;
}

function renderIcons() {
  const iconCategories = [
    "cheeks",
    "emotion",
    "mouth",
    "eyes",
    "sweat",
    "specs",
    "eyebrows",
  ];
  const iconsArea = document.getElementById("icons-area");

  for (const category of iconCategories) {
    const iconImg = new Image();
    iconImg.src = `../img/icons/${category}.png`;
    iconImg.style.width = "50px";
    iconImg.style.margin = "5px";

    const iconSelectionArea = document.getElementById(`icons-${category}`);

    iconImg.addEventListener("click", () => {
      for (const iconsAreaChild of iconsArea.children) {
        iconsAreaChild.classList.remove(CLASS_SELECTED);
      }
      iconImg.classList.add(CLASS_SELECTED);

      addCSSClassToChildElements("icons-selection-area", CLASS_INVISIBLE);
      iconSelectionArea.classList.remove(CLASS_INVISIBLE);
    });

    iconsArea.appendChild(iconImg);
  }
}

function renderIconSelections(character, category, numItems) {
  const iconsSelectionArea = document.getElementById(`icons-selection-area`);

  const iconsSelectionCategory = document.getElementById(`icons-${category}`);
  iconsSelectionCategory.classList.add(CLASS_INVISIBLE);

  const iconSelections = [];
  for (let i = 1; i < numItems + 1; i++) {
    iconSelections.push(`${category}${i}`);
  }

  for (const iconSelection of iconSelections) {
    const iconSelectionImg = new Image();
    iconSelectionImg.src = `/img/${character}/${category}/${iconSelection}.png`;
    const cropX = 335; // X-coordinate of the top-left corner of the cropped area
    const cropY = 150; // Y-coordinate of the top-left corner of the cropped area
    const cropWidth = 300; // Width of the cropped area

    const optionCanvas = document.getElementById("option-canvas");
    optionCanvas.width = cropWidth;
    optionCanvas.height = cropWidth;

    const context = optionCanvas.getContext("2d");
    context.clearRect(0, 0, optionCanvas.width, optionCanvas.height);
    context.drawImage(
      iconSelectionImg,
      cropX,
      cropY,
      cropWidth,
      cropWidth,
      0,
      0,
      cropWidth,
      cropWidth
    );
    const finalImg = new Image();
    finalImg.style.width = "90px";
    finalImg.style.margin = "5px";
    finalImg.style.border = "2px solid blue";
    finalImg.style.borderRadius = "10px";
    finalImg.onload = () => {
      console.log(`${iconSelection} loaded`);
    };
    finalImg.src = optionCanvas.toDataURL();

    finalImg.addEventListener("click", () => {
      const customizedEmotion = document.getElementById(
        `customized-char-${category}`
      );
      customizedEmotion.src = `/img/${character}/${category}/${iconSelection}.png?`;
      updateCanvas();

      for (const peerImg of finalImg.parentElement.children) {
        peerImg.classList.remove(CLASS_SELECTED);
      }
      finalImg.classList.add(CLASS_SELECTED);

      customizedEmotion.onload = () => {
        updateCanvas();
      };
    });

    iconsSelectionCategory.appendChild(finalImg);
  }

  iconsSelectionArea.appendChild(iconsSelectionCategory);
}

function addCSSClassToChildElements(parentId, cssClass) {
  const parentElem = document.getElementById(parentId);

  for (const child of parentElem.children) {
    child.classList.add(cssClass);
  }
}
