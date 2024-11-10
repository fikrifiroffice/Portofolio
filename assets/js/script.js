// Navbar
const navbar = document.getElementById("navbar");
const menuItems = document.querySelectorAll(".navbar-nav .nav-link");
const sections = document.querySelectorAll("section"); // Semua section di halaman

// Fungsi untuk menambahkan kelas 'scrolled' pada navbar saat halaman discroll lebih dari 50px
const handleScroll = () => {
    // Tambah/hapus kelas 'scrolled' berdasarkan posisi scroll
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    let currentSection = null;

    // Mendeteksi section yang aktif (terlihat di layar)
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200; // Penyesuaian untuk jarak dari atas
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            currentSection = section;
        }
    });

    // Highlight menu item sesuai dengan section yang sedang terlihat
    menuItems.forEach((item) => {
        const targetId = item.getAttribute("href").substring(1); // Ambil ID dari href
        const targetSection = document.getElementById(targetId);

        // Aktifkan menu yang sesuai dengan section yang terlihat
        item.classList.toggle("active", currentSection && targetSection === currentSection);

        // Jika section aktif berubah, perbarui URL tanpa reload
        if (currentSection && targetSection === currentSection) {
            history.replaceState(null, null, `#${targetId}`);
        }
    });
};

// Menambahkan event listener untuk mendeteksi scroll
window.addEventListener("scroll", handleScroll);

// Fungsi untuk menangani klik pada menu navbar
const handleMenuClick = (e) => {
    e.preventDefault(); // Mencegah default behavior
    const targetId = e.currentTarget.getAttribute("href").substring(1); // Ambil ID section dari href
    const targetSection = document.getElementById(targetId);

    // Scroll halus ke section yang dituju
    targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });

    // Menambahkan kelas 'active' ke menu yang diklik
    menuItems.forEach((menu) => menu.classList.remove("active"));
    e.currentTarget.classList.add("active");

    // Perbarui URL tanpa reload halaman
    history.pushState(null, null, `#${targetId}`);
};

// Menambahkan event listener untuk klik pada setiap item menu
menuItems.forEach((item) => {
    item.addEventListener("click", handleMenuClick);
});

// Efek mengetik untuk elemen 'role'
const roleElement = document.getElementById("role");
const roles = [
    "Mahasiswa D3 PJJ Teknik Informatika",
    "Drafter Elektrik-Mekanik"
];

let currentRoleIndex = 0; // Indeks peran yang aktif
let currentText = ""; // Teks yang sedang ditampilkan
let isDeleting = false; // Status apakah sedang menghapus teks
let timeout; // Untuk menyimpan timeout

// Fungsi efek mengetik
const typeEffect = () => {
    const currentRole = roles[currentRoleIndex]; // Role yang sedang aktif
    currentText = currentRole.slice(
        0,
        isDeleting ? currentText.length - 1 : currentText.length + 1
    );

    roleElement.textContent = currentText;

    if (!isDeleting && currentText === currentRole) {
        // Jika selesai mengetik, tunggu 3 detik sebelum mulai menghapus
        timeout = setTimeout(() => {
            isDeleting = true;
            typeEffect();
        }, 3000);
    } else if (isDeleting && currentText === "") {
        // Jika selesai menghapus, lanjutkan ke role berikutnya
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        timeout = setTimeout(typeEffect, 150); // Mulai mengetik role berikutnya
    } else {
        // Atur kecepatan mengetik dan menghapus
        timeout = setTimeout(typeEffect, isDeleting ? 100 : 50);
    }
};

// Memulai efek mengetik setelah halaman dimuat
window.onload = typeEffect;

// Inisialisasi peta dengan koordinat Kampus PENS menggunakan Leaflet.js
var map = L.map('map').setView([-7.2825, 112.7749], 16); // Koordinat Kampus PENS

// Tambahkan tile layer dari OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Tambahkan marker untuk lokasi Kampus PENS
L.marker([-7.2825, 112.7749]).addTo(map)
    .bindPopup("<b>Kampus PENS</b><br>Lokasi kami.")
    .openPopup();
