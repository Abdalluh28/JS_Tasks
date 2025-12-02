const srcs = [
    './assets/1.gif', './assets/2.gif', './assets/3.gif', './assets/1.gif',
    './assets/5.gif', './assets/2.gif', './assets/6.gif', './assets/4.gif',
    './assets/3.gif', './assets/5.gif', './assets/6.gif', './assets/4.gif',
];
let moonImage = './assets/Moon.gif';

let images = document.querySelectorAll('.memory-game-image')

let isBusy = false;
let flipped = [];
let handleImageClick = (image, index) => {
    if (isBusy) return; // to avoid quick double click

    if (image.classList.contains('matched')) return // to avoid already matched images
    if (flipped.includes(index)) return; // to avoid double click on the same image

    image.src = srcs[index];
    flipped.push(index);

    if (flipped.length == 2) {
        compareFlipped();
    }

}
let compareFlipped = () => {
    let [first, second] = flipped;
    let match = srcs[first] === srcs[second];

    if (match) {
        // found a match
        images[first].classList.add('matched');
        images[second].classList.add('matched');
        flipped = [];
    } else {
        // not a match, flip them back
        isBusy = true;

        setTimeout(() => {
            images[first].src = moonImage;
            images[second].src = moonImage;
            isBusy = false;
            flipped = [];
        }, 1000);
    }
}

images.forEach((image, index) => {
    image.addEventListener("click", () => handleImageClick(image, index));
})