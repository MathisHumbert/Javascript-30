// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

let flag = false;
// build our functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function toggleLogo() {
  video.paused ? (toggle.textContent = '►') : (toggle.textContent = '❚ ❚');
}

function inputChange() {
  let value = this.value;
  let name = this.name;
  console.log(name, value);
  video[name] = value;
}

function skipTime() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
  let time = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${time}%`;
}

function mouseProgress(e) {
  if (flag) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }
}
// hook up the event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('pause', toggleLogo);
video.addEventListener('play', toggleLogo);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
toggle.addEventListener('click', toggleLogo);

ranges.forEach((btn) => {
  btn.addEventListener('input', inputChange);
});
skipButtons.forEach((btn) => {
  btn.addEventListener('click', skipTime);
});

progress.addEventListener('mousemove', mouseProgress);
progress.addEventListener('mousedown', () => (flag = true));
progress.addEventListener('mouseup', () => (flag = false));

// progressBar.style.flexBasis =
