document.addEventListener('DOMContentLoaded', () => {

  setDefaultCustomizations();
  updateCanvas();

  const customizationOptions = document.querySelectorAll('.customization-option');

  customizationOptions.forEach(customizationOption => {
    customizationOption.addEventListener('click', () => {
      const customizationType = customizationOption.dataset.type;
      const customizationValue = customizationOption.dataset.value;

      const customizedSpecs = document.getElementById('customized-char-specs');
      const customizedEyebrows = document.getElementById('customized-char-eyebrows');
      const customizedEyes = document.getElementById('customized-char-eyes');
      const customizedMouth = document.getElementById('customized-char-mouth');
      const customizedEmotion = document.getElementById('customized-char-emotion');

      if (customizationType === 'customization-specs') {
        const customizationSpecs = document.querySelectorAll('.customization-specs');
        customizationSpecs.forEach(elem => {
          elem.parentElement.style.fontWeight = 'normal';
        })
        customizationOption.parentElement.style.fontWeight = 'bold';

        if (customizationValue === 'none') {
          customizedSpecs.src = "";
        } else {
          customizedSpecs.src = `/img/mao_shibisaki/stationary/${customizationValue}.png?` + new Date().getTime();
        }
        customizedSpecs.onload = function () {
          updateCanvas();
        }
      }

      if (customizationType === 'customization-eyebrows') {
        const customizationEyebrows = document.querySelectorAll('.customization-eyebrows');
        customizationEyebrows.forEach(elem => {
          elem.parentElement.style.fontWeight = 'normal';
        })
        customizationOption.parentElement.style.fontWeight = 'bold';

        if (customizationValue === 'none') {
          customizedEyebrows.src = "";
        } else {
          customizedEyebrows.src = `/img/mao_shibisaki/eyebrows/${customizationValue}.png`;
        }
        customizedEyebrows.onload = function () {
          updateCanvas();
        }
      }

      if (customizationType === 'customization-eyes') {
        const customizationEyes = document.querySelectorAll('.customization-eyes');
        customizationEyes.forEach(elem => {
          elem.parentElement.style.fontWeight = 'normal';
        })
        customizationOption.parentElement.style.fontWeight = 'bold';

        if (customizationValue === 'none') {
          customizedEyes.src = "";
        } else {
          customizedEyes.src = `/img/mao_shibisaki/eyes/${customizationValue}.png`;
        }
        customizedEyes.onload = function () {
          updateCanvas();
        }
      }

      if (customizationType === 'customization-mouth') {
        const customizationMouth = document.querySelectorAll('.customization-mouth');
        customizationMouth.forEach(elem => {
          elem.parentElement.style.fontWeight = 'normal';
        })
        customizationOption.parentElement.style.fontWeight = 'bold';

        if (customizationValue === 'none') {
          customizedMouth.src = "";
        } else {
          customizedMouth.src = `/img/mao_shibisaki/mouth/${customizationValue}.png`;
        }
        customizedMouth.onload = function () {
          updateCanvas();
        }
      }

      if (customizationType === 'customization-emotion') {
        const customizationEmotion = document.querySelectorAll('.customization-emotion');
        customizationEmotion.forEach(elem => {
          elem.parentElement.style.fontWeight = 'normal';
        })
        customizationOption.parentElement.style.fontWeight = 'bold';

        if (customizationValue === 'none') {
          customizedEmotion.src = "";
        } else {
          customizedEmotion.src = `/img/mao_shibisaki/emotion/${customizationValue}.png?`;
        }
        customizedEmotion.onload = function () {
          updateCanvas();
        }
      }
      updateCanvas();
    });
  });
});

function updateCanvas() {
  const customizedCanvas = document.getElementById('customized-canvas');
  const context = customizedCanvas.getContext('2d');

  const images = Array.from(document.querySelectorAll('.customized-char-part'));

  images.sort((a, b) => {
    const zIndexA = parseInt(getComputedStyle(a).zIndex);
    const zIndexB = parseInt(getComputedStyle(b).zIndex);
    return zIndexA - zIndexB;
  });

  images.forEach(image => {
    context.drawImage(image, 0, 0);
  });

  const combinedImageURL = customizedCanvas.toDataURL();

  const combinedImage = new Image();
  combinedImage.src = combinedImageURL;

  const customizedChar = document.getElementById('customized-char');
  customizedChar.src = combinedImageURL;
}

function setDefaultCustomizations() {
  document.getElementById('customization-specs1').parentElement.style.fontWeight = 'bold';
  document.getElementById('customization-eyebrows1').parentElement.style.fontWeight = 'bold';
  document.getElementById('customization-eyes5').parentElement.style.fontWeight = 'bold';
  document.getElementById('customization-mouth4').parentElement.style.fontWeight = 'bold';
  document.getElementById('customization-emotion-cheeks').parentElement.style.fontWeight = 'bold';
}