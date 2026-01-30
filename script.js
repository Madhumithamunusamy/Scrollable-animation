const canvas = document.getElementById("scroll-canvas");
const context = canvas.getContext("2d");

const frameCount = 208;
const currentFrame = index =>
  `images/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
let dosa = { frame: 0 };

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Draw image
const render = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[dosa.frame], 0, 0, canvas.width, canvas.height);
};

// Scroll animation
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const maxScrollTop =
    document.documentElement.scrollHeight - window.innerHeight;

  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  dosa.frame = frameIndex;
  requestAnimationFrame(render);
});

// Initial draw
images[0].onload = render;

// Resize support
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});
