document.addEventListener("DOMContentLoaded", () => {
    // Header
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        fetch("components/header.html")
            .then(res => res.text())
            .then(data => {
                headerContainer.innerHTML = data;
            })
            .catch(err => console.error("Error cargando el header:", err));
    }

    // Footer
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch("components/footer.html")
            .then(res => res.text())
            .then(data => {
                footerContainer.innerHTML = data;
            })
            .catch(err => console.error("Error cargando el footer:", err));
    }
});