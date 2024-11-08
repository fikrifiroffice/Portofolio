// Navbar
const navbar = document.getElementById("navbar");
const menuItems = document.querySelectorAll(".navbar-nav .nav-link");
const sections = document.querySelectorAll("section"); // Semua section pada halaman

// Fungsi untuk menambahkan kelas 'scrolled' pada navbar saat scroll lebih dari 50px
const handleScroll = () => {
    // Menambahkan atau menghapus kelas 'scrolled' pada navbar berdasarkan scroll Y
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    let currentSection = null;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200; // Menyesuaikan untuk padding atas
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section;
        }
    });

    // Menandai menu yang sesuai dengan section yang terlihat
    menuItems.forEach((item) => {
        const targetId = item.getAttribute("href").substring(1); // Ambil id dari menu
        const targetSection = document.getElementById(targetId);

        item.classList.toggle(
            "active",
            currentSection && targetSection === currentSection,
        );
    });
};

// Menambahkan event listener untuk scroll
window.addEventListener("scroll", handleScroll);

// Fungsi untuk menangani klik pada menu navbar
const handleMenuClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("href").substring(1); // Ambil id target section
    const targetSection = document.getElementById(targetId);

    // Menggulung ke section yang sesuai dengan scroll halus
    targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });

    // Menambahkan kelas active ke menu yang diklik
    menuItems.forEach((menu) => menu.classList.remove("active"));
    e.currentTarget.classList.add("active");

    // Memperbarui URL tanpa reload halaman
    history.pushState(null, null, `#${targetId}`);
};

// Menambahkan event listener untuk setiap item menu
menuItems.forEach((item) => {
    item.addEventListener("click", handleMenuClick);
});

// Efek mengetik untuk elemen 'role'
const roleElement = document.getElementById("role");
const roles = [
    "Mahasiswa D3 PJJ Teknik Informatika",
    "Drafter Elektrik-Mekanik",
];

let currentRoleIndex = 0; // Indeks peran yang sedang ditampilkan
let currentText = ""; // Teks yang sedang diketik
let isDeleting = false; // Status apakah sedang menghapus teks
let timeout; // Untuk menyimpan timeout

// Fungsi efek mengetik
const typeEffect = () => {
    const currentRole = roles[currentRoleIndex]; // Peran yang sedang aktif
    currentText = currentRole.slice(
        0,
        isDeleting ? currentText.length - 1 : currentText.length + 1,
    );

    roleElement.textContent = currentText;

    if (!isDeleting && currentText === currentRole) {
        // Tunggu 3 detik setelah mengetik sebelum mulai menghapus
        timeout = setTimeout(() => {
            isDeleting = true;
            typeEffect();
        }, 3000);
    } else if (isDeleting && currentText === "") {
        // Setelah menghapus, beralih ke peran berikutnya
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        timeout = setTimeout(typeEffect, 150);
    } else {
        // Mengatur kecepatan mengetik dan menghapus
        timeout = setTimeout(typeEffect, isDeleting ? 100 : 50);
    }
};

// Memulai efek mengetik saat halaman dimuat
window.onload = typeEffect;
