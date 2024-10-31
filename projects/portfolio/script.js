// Header blur
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) { // Adjust scroll threshold as needed
        header.classList.add('blurred');
        backToTop.classList.add('visible'); // Show button
    }
    else {
        header.classList.remove('blurred');
        backToTop.classList.remove('visible'); // Hide button
    }
});


// Navigation functionality ---------->
const backToTop = document.querySelector('#backTop');
const mobButton = document.querySelector('.mobile');
const navList = document.querySelector('nav ul');
const closeButton = document.querySelector('.close');

backToTop.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
})

const toggleMenu = () => {
    navList.classList.toggle('responsive')
}

const toggleModal = () => {
    overlay.classList.toggle('visible')
}

mobButton.addEventListener('click', toggleMenu)


// if (mobButton) {
//     mobButton.addEventListener('click', toggleMenu);
// }

// if (modalButton) {
//     modalButton.addEventListener('click', toggleModal);
// }

// if (closeButton) {
//     closeButton.addEventListener('click', toggleModal);
// }

// Navigation functionality <-----------


// Scroll animation starts ---------->
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Extracts the section ID from href
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Aligns the top of the target section with the top of the viewport
            });
        }
    });
});


// Scroll animation ends <-----------


// Prorgress bar animation starts ---------->
window.addEventListener('scroll', function () {
    var skillsSection = document.querySelector('.skills');
    var progressBars = document.querySelectorAll('.progress-bar');
    var sectionPos = skillsSection.getBoundingClientRect().top;
    var screenPos = window.innerHeight / 1.3; // Adjust when animation triggers (scroll point)

    if (sectionPos < screenPos) {
        progressBars.forEach(function (bar) {
            var percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
        });
    }
});
// Prorgress bar animation ends <-----------




// Overlay starts ---------->
// Function to open the overlay
function openOverlay(projectId) {
    document.getElementById(projectId).style.display = "flex";
    document.body.classList.add('no-scroll'); // Disable body scrolling
}

// Function to close the overlay
function closeOverlay() {
    const overlays = document.querySelectorAll('.overlay');
    overlays.forEach(overlay => {
        overlay.style.display = "none";
        document.body.classList.remove('no-scroll'); // Enable body scrolling
    });
}

// Overlay ends <-----------



