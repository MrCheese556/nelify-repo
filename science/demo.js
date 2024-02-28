const canvas = document.getElementById("canv");

const c = canvas.getContext('2d');

const bg = new Image();
const start = new Image(); // Create new img element
bg.addEventListener(
  "load",
  () => {
    c.drawImage(bg, 0 , 0)
  },
  false
);
start.addEventListener(
    "load",
    () => {
      setTimeout(() => {
        c.drawImage(start, 338, 315.5)
      }, 100);
    },
    false
  );
bg.src = "./crispr.png";
start.src = "./Start.png";
start.style.zIndex = 15;

var level = 1;
    canvas.onmousedown = function(e){
        animate();
    };

function animate(){


    console.log("test");

    requestAnimationFrame(animate);
}
