const images = document.getElementsByClassName('slider-image');
const btnPrevious = document.getElementById('btn-previous');
const btnNext = document.getElementById('btn-next');
const btnReset = document.getElementById('btn-reset');
const btnPlay = document.getElementById('btn-play');
const imageUrl = document.getElementById('image-url');
const btnAddImage = document.getElementById('btn-add-image');


let showPreviousImage = () => {
    let currVisibleImage = document.querySelector('.slider-image[data-visible="visible"]');
    let prevImage = Array.from(images).indexOf(currVisibleImage) - 1;
    if (prevImage < 0) return;

    currVisibleImage.setAttribute('data-visible', 'hidden');
    images[prevImage].setAttribute('data-visible', 'visible');
}

let showNextImage = () => {
    let currVisibleImage = document.querySelector('.slider-image[data-visible="visible"]');
    let prevImage = Array.from(images).indexOf(currVisibleImage) + 1;
    if (prevImage >= images.length) return;

    currVisibleImage.setAttribute('data-visible', 'hidden');
    images[prevImage].setAttribute('data-visible', 'visible');
}

let resetSlider = () => {
    let currVisibleImage = document.querySelector('.slider-image[data-visible="visible"]');
    currVisibleImage.setAttribute('data-visible', 'hidden');
    images[0].setAttribute('data-visible', 'visible');
}

let intervalId;
let handlePlaySlider = () => {
    const isPlaying = btnPlay.getAttribute('data-play')
    if (isPlaying == 1) {
        btnPlay.setAttribute('data-play', 0);
        btnPlay.innerText = 'Stop';

        intervalId = setInterval(showNextImage, 1000);
    } else {
        btnPlay.setAttribute('data-play', 1);
        btnPlay.innerText = 'Play';

        clearInterval(intervalId);
        intervalId = null;
    }
}


let handleAddingImage = () => {
    let url = imageUrl.value;
    let newImage = document.createElement('img');
    newImage.classList.add('slider-image');
    newImage.src = url;
    newImage.setAttribute('data-visible', 'hidden');
    document.querySelector('.slider').appendChild(newImage);
    imageUrl.value = '';
}

btnPrevious.addEventListener("click", showPreviousImage);
btnNext.addEventListener("click", showNextImage);
btnReset.addEventListener("click", resetSlider);
btnPlay.addEventListener("click", handlePlaySlider);
btnAddImage.addEventListener("click", handleAddingImage);