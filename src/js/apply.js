import "../sass/apply.scss";

document.addEventListener("DOMContentLoaded", function() {

    const hamburgerMenu = document.querySelector('.hamburger');
    const sideBar = document.querySelector('.responsive-sidebar');

    hamburgerMenu.addEventListener('click', () => {
        sideBar.classList.toggle('responsive-sidebar-toggle');
        hamburgerMenu.classList.toggle('hamburger-animation');
    });
});