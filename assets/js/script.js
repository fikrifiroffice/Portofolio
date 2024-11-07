// Navbar
const navbar = document.getElementById("navbar");
window.onscroll = function () {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

// Atur Padding Main agar tidak tertutupi oleh Header
window.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector(".navbar");
    const main = document.querySelector(".main");
    main.style.paddingTop = `${navbar.offsetHeight}px`;
});