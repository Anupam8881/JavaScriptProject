const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
let uploadedImage = null;

document.getElementById('imageInput').addEventListener('change', function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;
    img.onload = function () {
      uploadedImage = img;
      drawMeme();
    };
  };
  if (file) reader.readAsDataURL(file);
});

function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (uploadedImage) {
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
  }
  ctx.font = '40px Impact, Arial';
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.textAlign = 'center';

  const topText = document.getElementById('topText').value.toUpperCase();
  ctx.fillText(topText, canvas.width / 2, 50);
  ctx.strokeText(topText, canvas.width / 2, 50);
  const bottomText = document.getElementById('bottomText').value.toUpperCase();
  ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
  ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
}

document.getElementById('generateBtn').addEventListener('click', drawMeme);
