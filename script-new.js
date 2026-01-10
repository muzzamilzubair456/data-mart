function loopTyping(element, text, speed = 40) {
    let index = 0;

    function type() {
        if (index <= text.length) {
            element.textContent = text.substring(0, index);
            index++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => erase(), 1500);
        }
    }

    function erase() {
        if (index >= 0) {
            element.textContent = text.substring(0, index);
            index--;
            setTimeout(erase, 25);
        } else {
            setTimeout(type, 1200);
        }
    }

    type();
}

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".rev-box");

    cards.forEach((card, i) => {
        const textElement = card.querySelector(".rev-text");
        const text = card.getAttribute("data-text");

        setTimeout(() => {
            loopTyping(textElement, text);
        }, i * 800);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".rev-box");

    cards.forEach((card, i) => {
        const textElement = card.querySelector(".rev-text");
        const text = card.getAttribute("data-text");

        setTimeout(() => {
            loopTyping(textElement, text);
        }, i * 800);
    });
});


// ===== Counter Animation =====

function animateCounter(element, target, duration = 1500) {
    let start = 0;
    let startTime = null;

    function update(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // smooth easing
        const value = Math.floor(start + (target - start) * ease);

        element.textContent = value.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ===== Trigger when visible =====

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute("data-count"), 10);

                    if (!el.dataset.done) {
                        animateCounter(el, target, 1800);
                        el.dataset.done = "true";
                    }
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
});




  window.addEventListener('scroll', function () {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

window.onload = () => {

    const text = document.getElementById("heroText");
    const img = document.getElementById("heroImg");

    setTimeout(() => {
        text.style.opacity = "1";
        text.style.transform = "translateY(0px)";
    }, 200);

    setTimeout(() => {
        img.style.opacity = "1";
        img.style.transform = "translateX(0px)";
    }, 500);

};


