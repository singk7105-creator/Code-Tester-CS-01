document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("galleryContainer");
    const filterButtons = document.querySelectorAll(".filter-btn");

    if (!galleryContainer) return;

    let allProjects = [];

    // Fetch dynamic project data from JSON
    fetch("data/projects.json")
        .then(response => {
            if (!response.ok) throw new Error("Unable to load project data.");
            return response.json();
        })
        .then(data => {
            allProjects = data;
            renderGallery(allProjects);
        })
        .catch(error => {
            console.error("Error loading JSON data:", error);
            galleryContainer.innerHTML = `<p style="text-align:center; color:#ff5252; grid-column: 1/-1;">Project data loading failed. Please check network connection.</p>`;
        });

    // Render cards to gallery
    function renderGallery(projects) {
        galleryContainer.innerHTML = "";

        if (projects.length === 0) {
            galleryContainer.innerHTML = `<p style="text-align:center; color:#c5c6c7; grid-column: 1/-1;">No projects found in this category.</p>`;
            return;
        }

        projects.forEach(item => {
            const card = document.createElement("div");
            card.className = "gallery-item";

            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <span class="tag">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;

            galleryContainer.appendChild(card);
        });
    }

    // Category Filtering Feature
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            if (filterValue === "all") {
                renderGallery(allProjects);
            } else {
                const filtered = allProjects.filter(p => p.category === filterValue);
                renderGallery(filtered);
            }
        });
    });
});
