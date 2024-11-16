// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Landing page loaded!");

    // Fade-in effect for the landing content
    const landingContainer = document.querySelector(".landing-container");
    landingContainer.style.opacity = 0;
    landingContainer.style.transition = "opacity 1.5s ease-in-out";
    setTimeout(() => {
        landingContainer.style.opacity = 1;
    }, 300);

    // Smooth scroll for login and sign-up buttons
    const buttons = document.querySelectorAll(".card-buttons .btn");
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const target = button.getAttribute("href");
            if (target.startsWith("#")) {
                document.querySelector(target).scrollIntoView({ behavior: "smooth" });
            } else {
                window.location.href = target; // Navigate to another page
            }
        });
    });

    // Hover animation for buttons
    buttons.forEach(button => {
        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.1)";
            button.style.transition = "transform 0.2s ease";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1)";
        });
    });
});
