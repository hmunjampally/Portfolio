

document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById("body");

    const navLinks = document.querySelectorAll(".nav-link");
    const currentUrl = window.location.pathname.split("/").pop(); 

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentUrl) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    const isDarkMode = localStorage.getItem("dark-mode") === "true";
    if (isDarkMode) {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
    } else {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
    }


    fetch("components/navbar.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("nav-placeholder").innerHTML = html;

            const toggleSwitch = document.getElementById("modeSwitch");
            toggleSwitch?.addEventListener("click", () => {
                if (body.classList.contains("light-mode")) {
                    body.classList.remove("light-mode");
                    body.classList.add("dark-mode");
                    localStorage.setItem("dark-mode", "true");
                } else {
                    body.classList.remove("dark-mode");
                    body.classList.add("light-mode");
                    localStorage.setItem("dark-mode", "false");
                }
            });
        })
        .catch(error => console.error("Error loading navbar:", error));

        AOS.init({
            duration: 800, 
            easing: 'ease-in-out', 
            once: true, 
        });



        function showDetails(detailsId, cardId) {
            const detailsBlock = document.getElementById(detailsId);
            const cardBlock = document.getElementById(cardId);
            const screenWidth = window.innerWidth;
        
            if (screenWidth <= 768) {
                if (detailsBlock.style.display === "block") {
                    detailsBlock.style.display = "none";
                    cardBlock.style.display = "block"; 
                } else {
                    document.querySelectorAll(".details-block").forEach(block => {
                        block.style.display = "none";
                    });
                    document.querySelectorAll(".main-card").forEach(block => {
                        block.style.display = "block";
                    });
        
                    detailsBlock.style.display = "block";
                    cardBlock.style.display = "none";
                }
            } else {
                if (detailsBlock.style.display === "block") {
                    detailsBlock.style.display = "none"; 
                } else {
                    document.querySelectorAll(".details-block").forEach(block => {
                        block.style.display = "none";
                    });
        
                    detailsBlock.style.display = "block";
                }
            }
        }
        
        window.showDetails = showDetails;
});


