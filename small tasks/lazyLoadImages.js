let lazyLodadImages = () => {
    let images = document.querySelectorAll('img[data-src]');

    let observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                obs.unobserve(img);
            }
        })
    })

    images.forEach(img => {
        observer.observe(img);
    })
}

export { lazyLodadImages }