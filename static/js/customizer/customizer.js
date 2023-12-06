const CLASS_SELECTED = "selected";

document.addEventListener("DOMContentLoaded", () => {
  setDefaultCustomizations();

  const customizationOptions = document.querySelectorAll(
    ".customization-option"
  );

  customizationOptions.forEach((customizationOption) => {
    customizationOption.addEventListener("click", () => {
      const customizationType = customizationOption.dataset.type;
      const customizationValue = customizationOption.dataset.value;

      const customizedSpecs = document.getElementById("customized-char-specs");
      const customizedEyebrows = document.getElementById(
        "customized-char-eyebrows"
      );
      const customizedEyes = document.getElementById("customized-char-eyes");
      const customizedMouth = document.getElementById("customized-char-mouth");
      const customizedEmotion = document.getElementById(
        "customized-char-emotion"
      );

      if (customizationType === "customization-specs") {
        const customizationSpecs = document.querySelectorAll(
          ".customization-specs"
        );
        customizationSpecs.forEach((elem) => {
          elem.parentElement.style.fontWeight = "normal";
        });
        customizationOption.parentElement.style.fontWeight = "bold";

        if (customizationValue === "none") {
          customizedSpecs.src = "";
        } else {
          customizedSpecs.src = `/img/mao_shibisaki/stationary/${customizationValue}.png?`;
        }
        customizedSpecs.onload = () => {
          updateCanvas();
        };
      }

      if (customizationType === "customization-eyebrows") {
        const customizationEyebrows = document.querySelectorAll(
          ".customization-eyebrows"
        );
        customizationEyebrows.forEach((elem) => {
          elem.parentElement.style.fontWeight = "normal";
        });
        customizationOption.parentElement.style.fontWeight = "bold";

        if (customizationValue === "none") {
          customizedEyebrows.src = "";
        } else {
          customizedEyebrows.src = `/img/mao_shibisaki/eyebrows/${customizationValue}.png`;
        }
        customizedEyebrows.onload = () => {
          updateCanvas();
        };
      }

      if (customizationType === "customization-eyes") {
        const customizationEyes = document.querySelectorAll(
          ".customization-eyes"
        );
        customizationEyes.forEach((elem) => {
          elem.parentElement.style.fontWeight = "normal";
        });
        customizationOption.parentElement.style.fontWeight = "bold";

        if (customizationValue === "none") {
          customizedEyes.src = "";
        } else {
          customizedEyes.src = `/img/mao_shibisaki/eyes/${customizationValue}.png`;
        }
        customizedEyes.onload = () => {
          updateCanvas();
        };
      }

      if (customizationType === "customization-mouth") {
        const customizationMouth = document.querySelectorAll(
          ".customization-mouth"
        );
        customizationMouth.forEach((elem) => {
          elem.parentElement.style.fontWeight = "normal";
        });
        customizationOption.parentElement.style.fontWeight = "bold";

        if (customizationValue === "none") {
          customizedMouth.src = "";
        } else {
          customizedMouth.src = `/img/mao_shibisaki/mouth/${customizationValue}.png`;
        }
        customizedMouth.onload = () => {
          updateCanvas();
        };
      }

      if (customizationType === "customization-emotion") {
        const customizationEmotion = document.querySelectorAll(
          ".customization-emotion"
        );
        customizationEmotion.forEach((elem) => {
          elem.parentElement.style.fontWeight = "normal";
        });
        customizationOption.parentElement.style.fontWeight = "bold";

        if (customizationValue === "none") {
          customizedEmotion.src = "";
        } else {
          customizedEmotion.src = `/img/mao_shibisaki/emotion/${customizationValue}.png?`;
        }
        customizedEmotion.onload = () => {
          updateCanvas();
        };
      }
      updateCanvas();
    });
  });
});

window.addEventListener("load", (event) => {
  updateCanvas();
  renderIcons();
  renderIconSelections();
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

function setDefaultCustomizations() {
  document.getElementById(
    "customization-specs1"
  ).parentElement.style.fontWeight = "bold";
  document.getElementById(
    "customization-eyebrows1"
  ).parentElement.style.fontWeight = "bold";
  document.getElementById(
    "customization-eyes5"
  ).parentElement.style.fontWeight = "bold";
  document.getElementById(
    "customization-mouth4"
  ).parentElement.style.fontWeight = "bold";
  document.getElementById(
    "customization-emotion-cheeks"
  ).parentElement.style.fontWeight = "bold";
}

function renderIcons() {
  const iconList = [
    "emotion",
    "mouth",
    "eyes",
    "sweat_tears",
    "glasses",
    "eyebrows",
  ];
  const iconsArea = document.getElementById("icons-area");

  for (const icon of iconList) {
    const iconImg = new Image();
    iconImg.src = `../img/icons/${icon}.png`;
    iconImg.style.width = "50px";
    //iconImg.style.height = "50px";
    iconImg.style.margin = "5px";
    iconImg.dataset.category = icon;

    iconImg.addEventListener("click", () => {
      for (const iconsAreaChild of iconsArea.children) {
        iconsAreaChild.classList.remove(CLASS_SELECTED);
      }
      iconImg.classList.add(CLASS_SELECTED);
    });

    iconsArea.appendChild(iconImg);
  }
}

function renderIconSelections() {
  const iconsSelectionArea = document.getElementById("icons-selection-area");
  const emotions = [
    "emotion1",
    "emotion2",
    "emotion3",
    "emotion4",
    "emotion5",
    "emotion6",
  ];

  for (const emotion of emotions) {
    const emotionImg = new Image();
    emotionImg.src = `/img/mao_shibisaki/emotion/${emotion}.png`;
    const cropX = 335; // X-coordinate of the top-left corner of the cropped area
    const cropY = 150; // Y-coordinate of the top-left corner of the cropped area
    const cropWidth = 300; // Width of the cropped area

    const optionCanvas = document.getElementById("option-canvas");
    optionCanvas.width = cropWidth;
    optionCanvas.height = cropWidth;

    const context = optionCanvas.getContext("2d");
    context.clearRect(0, 0, optionCanvas.width, optionCanvas.height);
    context.drawImage(
      emotionImg,
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
    finalImg.style.width = "75px";
    finalImg.style.margin = "5px";
    finalImg.style.border = "2px solid blue";
    finalImg.style.borderRadius = "10px";
    finalImg.onload = () => {
      console.log(`${emotion} loaded`);
    };
    finalImg.src = optionCanvas.toDataURL();

    iconsSelectionArea.appendChild(finalImg);
  }
}

function renderOption() {
  // Define the dimensions of the cropped area
  const cropX = 350; // X-coordinate of the top-left corner of the cropped area
  const cropY = 150; // Y-coordinate of the top-left corner of the cropped area
  const cropWidth = 300; // Width of the cropped area
  const cropHeight = 200; // Height of the cropped area

  const image1 = new Image();
  image1.src = "/img/mao_shibisaki/eyes/eyes1.png";
  const image2 = new Image();
  image2.src = "/img/mao_shibisaki/eyes/eyes2.png";
  const image3 = new Image();
  image3.src = "/img/mao_shibisaki/eyes/eyes4.png";

  const optionCanvas = document.getElementById("option-canvas");
  optionCanvas.width = cropWidth;
  optionCanvas.height = cropHeight;

  const context = optionCanvas.getContext("2d");
  //context.drawImage(image, 0, 0);
  context.drawImage(
    image1,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  const customizedOption1 = document.getElementById("option-img1");
  customizedOption1.width = 100;
  customizedOption1.src = optionCanvas.toDataURL();

  context.clearRect(0, 0, optionCanvas.width, optionCanvas.height);

  context.drawImage(
    image2,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  const customizedOption2 = document.getElementById("option-img2");
  customizedOption2.width = 100;
  customizedOption2.src = optionCanvas.toDataURL();

  context.clearRect(0, 0, optionCanvas.width, optionCanvas.height);

  context.drawImage(
    image3,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  const customizedOption3 = document.getElementById("option-img3");
  customizedOption3.width = 100;
  customizedOption3.src = optionCanvas.toDataURL();
}
