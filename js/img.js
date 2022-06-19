let images = document.querySelectorAll(".screenshots img");
body = document.body;
i = 0;
currentImg = 0;
isfullscreen = false;

function fullscreenImg() {
  isfullscreen = !isfullscreen;
  currentImg = this.id;
  this.classList.toggle("active");
  this.classList.add("animated");
  setTimeout(() => {
    this.classList.remove("animated");
  }, 500);
  body.classList.toggle("inActive");
  return currentImg, isfullscreen;
}

function curImg(plus) {
  if (plus) {
    currentImg++;
  } else {
    currentImg--;
  }
  if (currentImg > images.length) {
    currentImg = 1;
  } else if (currentImg < 1) {
    currentImg = images.length;
  }
  images.forEach((el) => {
    if (el.id != currentImg) {
      el.classList.remove("active");
    } else {
      el.classList.add("active");
    }
  });
}

images.forEach((el) => {
  i++;
  el.addEventListener("click", fullscreenImg);
  el.addEventListener("touchstart", touchStart);
  el.addEventListener("touchmove", touchMove);
  el.addEventListener("touchend", touchEnd);
  el.id = i;
});

//image switching by arrow keys
document.onkeyup = (e) => {
  if (isfullscreen) {
    switch (e["key"]) {
      case "ArrowRight":
        curImg(1);
        break;

      case "ArrowLeft":
        curImg(0);
        break;

      case "Escape":
        console.log("esc");
    }
  }
};

//swipes for switch images
// forked from: https://github.com/fsa/html5-snake/blob/main/src/index.js ,line 98-124

const sensitivity = 70;
let startX, endX, isRight, valid;

function touchStart(e) {
  startX = e.changedTouches[0].clientX;
}

function touchMove(e) {
  endX = e.changedTouches[0].clientX;
}

function touchEnd(e) {
  if (isfullscreen) {
    isRight = 0 - (startX - endX) > 0;
    valid = Math.abs(startX - endX) > sensitivity;
    if (isRight && valid) {
      curImg(0);
    } else if (valid) {
      curImg(1);
    }
  }
  startX = 0;
  endX = 0;
}
