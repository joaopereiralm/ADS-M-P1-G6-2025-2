const slides = document.querySelectorAll('.hero-bg-slide');
const dots = document.querySelectorAll('.hero-bg-dot');

let currentIndex = 0;
let autoPlayTimer;

// Troca a foto de fundo ativa (crossfade de opacidade controlado pelo CSS)
const goToSlide = (index) => {
    if (index < 0) {
        currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
    });
};

// Troca automática a cada 5 segundos
const startAutoPlay = () => {
    autoPlayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, 5000);
};

const resetAutoPlay = () => {
    clearInterval(autoPlayTimer);
    startAutoPlay();
};

// Permite pular para uma foto específica clicando na bolinha
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoPlay();
    });
});

startAutoPlay();