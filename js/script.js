
/* =========================================
   SHUBHAM DIGITAL STUDIO
   MAIN JAVASCRIPT
========================================= */


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuToggle.innerHTML = isOpen ? "✕" : "☰";

    });


    // CLOSE MENU AFTER CLICKING A LINK

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

            menuToggle.innerHTML = "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // CLOSE MENU WHEN CLICKING OUTSIDE

    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {

            navLinks.classList.remove("show");

            menuToggle.innerHTML = "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}



/* AUTOMATIC COPYRIGHT YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}



/* CONTACT FORM - WHATSAPP */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const formData = new FormData(bookingForm);

        const name = formData.get("name");
        const phone = formData.get("phone");
        const service = formData.get("service");
        const details = formData.get("date");

        
        // REPLACE WITH YOUR WHATSAPP NUMBER

        const whatsappNumber = "91XXXXXXXXXX";


        const message =
`Hello Shubham Digital Studio!

I would like to enquire about your services.

Name: ${name}

Phone: ${phone}

Service: ${service}

Event Details: ${details || "Not provided"}

Please share your availability and packages.

Thank you.`;


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

}



/* IMAGE LOADING SUPPORT */

document.querySelectorAll("img").forEach(image => {

    image.loading = "lazy";

});


/* CONSOLE BRAND MESSAGE */

console.log(
    "Shubham Digital Studio | Capturing Moments, Creating Memories."
);
