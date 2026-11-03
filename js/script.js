document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("galleryContainer");

    // JSON file se data fetch karna
    fetch("data/projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            galleryContainer.innerHTML = ""; // Container clear karein
            
            data.forEach(item => {
                // Har project ke liye HTML element banana
                const galleryItem = document.createElement("div");
                galleryItem.className = "gallery-item";

                galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="gallery-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `;

                galleryContainer.appendChild(galleryItem);
            });
        })
        .catch(error => {
            console.error("Error loading projects data:", error);
            galleryContainer.innerHTML = `<p style="text-align: center; color: #ff5252;">Failed to load projects. Please try again later.</p>`;
        });
});
