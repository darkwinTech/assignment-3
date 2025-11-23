// ===== Mobile drawer =====
const sidebar = document.querySelector('.sidebar');
// grab the sidebar element so later we can show/hide it
function showSidebar() {
    // Show the sidebar (mobile menu)
    sidebar.classList.add('show');
    sidebar.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function hideSidebar() {
    // Hide the sidebar (mobile menu)
    sidebar.classList.remove('show');
    sidebar.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// ===== Smooth scroll with fixed-nav offset =====
const NAV_HEIGHT = 76;
document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ===== Simple tab logic =====
const tabLinks = document.getElementsByClassName('tab-links');
const tabContents = document.getElementsByClassName('tab-contents');

function openTab(event, tabId) {
    Array.from(tabLinks).forEach((el) => el.classList.remove('active-link'));
    Array.from(tabContents).forEach((el) => el.classList.remove('active-tab'));
    event.currentTarget.classList.add('active-link');
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active-tab');
}

// Expose to inline HTML handler
window.openTab = openTab;
window.showSidebar = showSidebar;
window.hideSidebar = hideSidebar;

// === Personalized Greeting ===
const greetingText = document.getElementById('greetingText');
const nameInput = document.getElementById('nameInput');
const nameForm = document.getElementById('nameForm');
const clearName = document.getElementById('clearName');

// Function to show the greeting based on the time of the day
function updateGreeting() {
    const hour = new Date().getHours();
    const partOfDay = hour < 12 ? "Good Morning": hour < 18 ?"Good Afternoon": "Good Evening";
    const savedName = localStorage.getItem("visitorName") || "";
    greetingText.textContent = savedName
        ? `${partOfDay}, ${savedName}!`
        : `${partOfDay}!`;
    greetingText.classList.remove("fade-in");
    void greetingText.offsetWidth; // forces reflow (restarts animation)
    greetingText.classList.add("fade-in");
}

// When user saves their name
nameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
        localStorage.setItem("visitorName", name);
        updateGreeting();
    }
});

// When user clears their name
clearName.addEventListener("click", () => {
    localStorage.removeItem("visitorName");
    nameInput.value = "";
    updateGreeting();
});

// Run greeting on page load
updateGreeting();

// ===== Time on Site Counter =====
const timeDisplay = document.getElementById("timeDisplay");
let startTime = Date.now();
let timeInterval;

function updateTimeOnSite() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000); // seconds
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Update every second
timeInterval = setInterval(updateTimeOnSite, 1000);
updateTimeOnSite(); // Initial call


// // Sort By Date
// document.getElementById("sortBtn").addEventListener("click", function () {
//     const grid = document.getElementById("projectsGrid");
//     const projects = Array.from(grid.children);
//
//     // Sort by descending date (newest first)
//     projects.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
//
//     // Re-append in new order
//     projects.forEach((project) => grid.appendChild(project));
// });

// ===== Project Filtering and Sorting =====
const projectsGrid = document.getElementById("projectsGrid");
const categoryFilter = document.getElementById("categoryFilter");
const sortByDateBtn = document.getElementById("sortByDate");
const sortByNameBtn = document.getElementById("sortByName");
const skillLevel = document.getElementById("skillLevel");
const noProjectsMessage = document.getElementById("noProjectsMessage");

// Store all projects (cloned to preserve original order)
let allProjects = Array.from(projectsGrid.children);
let currentSortType = "date"; // Track current sort type

// Category mapping for display
const categoryNames = {
    "web": "Web Project",
    "ml": "Machine Learning",
    "platform": "Platform/App"
};

// Function to initialize project metadata (year and category)
function initializeProjectMetadata() {
    allProjects.forEach(project => {
        const date = project.dataset.date;
        const category = project.dataset.category;

        // Extract year from date
        const year = date ? new Date(date).getFullYear() : "";

        // Get category display name
        const categoryName = categoryNames[category] || category;

        // Find or create project-meta div
        let metaDiv = project.querySelector(".project-meta");
        if (!metaDiv) {
            metaDiv = document.createElement("div");
            metaDiv.className = "project-meta";
            const img = project.querySelector("img");
            if (img && img.nextSibling) {
                project.insertBefore(metaDiv, img.nextSibling);
            } else if (img) {
                project.appendChild(metaDiv);
            }
        }

        // Update or create year and category spans
        let yearSpan = metaDiv.querySelector(".project-year");
        let categorySpan = metaDiv.querySelector(".project-category");

        if (!yearSpan) {
            yearSpan = document.createElement("span");
            yearSpan.className = "project-year";
            metaDiv.appendChild(yearSpan);
        }
        yearSpan.textContent = year;

        if (!categorySpan) {
            categorySpan = document.createElement("span");
            categorySpan.className = "project-category";
            metaDiv.appendChild(categorySpan);
        }
        categorySpan.textContent = categoryName;
    });
}

// Initialize metadata on page load
initializeProjectMetadata();

// Set initial active state
sortByDateBtn.classList.add("active");

function filterAndSortProjects(sortType = currentSortType) {
    currentSortType = sortType;
    const selectedCategory = categoryFilter.value;
    const selectedLevel = skillLevel.value;

    // Filter projects
    let filtered = allProjects.filter(project => {
        const categoryMatch = selectedCategory === "all" || project.dataset.category === selectedCategory;
        const levelMatch = selectedLevel === "all" || project.dataset.level === selectedLevel;
        return categoryMatch && levelMatch;
    });

    // Sort projects
    filtered.sort((a, b) => {
        if (sortType === "date") {
            // Sort by date (newest first)
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        } else if (sortType === "name") {
            // Sort by name (A-Z)
            return (a.dataset.name || a.querySelector("h3").textContent).localeCompare(b.dataset.name || b.querySelector("h3").textContent);
        }
        return 0;
    });

    // Clear grid and re-append filtered/sorted projects
    projectsGrid.innerHTML = "";
    if (filtered.length === 0) {
        noProjectsMessage.style.display = "block";
    } else {
        noProjectsMessage.style.display = "none";
        filtered.forEach(project => projectsGrid.appendChild(project));
    }

    // Update button active states
    sortByDateBtn.classList.toggle("active", sortType === "date");
    sortByNameBtn.classList.toggle("active", sortType === "name");
}

// Event listeners for filtering
categoryFilter.addEventListener("change", () => filterAndSortProjects());
skillLevel.addEventListener("change", () => filterAndSortProjects());

// Event listeners for sorting buttons
sortByDateBtn.addEventListener("click", () => filterAndSortProjects("date"));
sortByNameBtn.addEventListener("click", () => filterAndSortProjects("name"));



// Contact Form Handling
const contactForm = document.getElementById("contactForm");
const statusMsg = contactForm.querySelector(".form-status");

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    statusMsg.textContent = "";

    const formData = new FormData(contactForm);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    // Simple validation
    if (!name || !email || !message) {
        statusMsg.textContent = "Please fill out all fields.";
        statusMsg.style.color = "#ff6b6b";
        return;
    }

    // Email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        statusMsg.textContent = "Please enter a valid email address.";
        statusMsg.style.color = "#ff6b6b";
        return;
    }

    // Simulate data handling (store locally)
    try {
        const submissions = JSON.parse(localStorage.getItem("contactSubmissions") || "[]");
        submissions.push({ name, email, message, time: new Date().toISOString() });
        localStorage.setItem("contactSubmissions", JSON.stringify(submissions));

        statusMsg.textContent = "Thank you! Your message has been sent.";
        statusMsg.style.color = "#6bff91";
        contactForm.reset();
    } catch (error) {
        statusMsg.textContent = "Something went wrong. Please try again later.";
        statusMsg.style.color = "#ff6b6b";
    }
});

// Show/Hide Projects Section with State Persistence
const toggleProjectsBtn = document.getElementById("toggleProjects");
const projectsContent = document.getElementById("projectsContent");
let projectsVisible = localStorage.getItem("projectsVisible") !== "false"; // Default to visible

function updateProjectsVisibility() {
    if (projectsVisible) {
        projectsContent.style.display = "block";
        toggleProjectsBtn.textContent = "Hide Projects";
    } else {
        projectsContent.style.display = "none";
        toggleProjectsBtn.textContent = "Show Projects";
    }
}

toggleProjectsBtn.addEventListener("click", () => {
    projectsVisible = !projectsVisible;
    localStorage.setItem("projectsVisible", projectsVisible.toString());
    updateProjectsVisibility();
});

// Initialize projects visibility on page load
updateProjectsVisibility();

// Git Hub API
const reposContainer = document.getElementById("reposContainer");
const GitHubUserName = "darkwinTech"; // Change this to your GitHub username

async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GitHubUserName}/repos?sort=updated&per_page=6`);

        if (!response.ok) {
            throw new Error(`Failed to fetch repositories: ${response.status}`);
        }
        const repos = await response.json();

        reposContainer.innerHTML = repos.map(repo => `
            <article class="repo-card">
                <div class="repo-header">
                    <h3>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
                            ${repo.name}
                        </a>
                    </h3>
                    <span class="repo-badge public">Public</span>
                </div>
                <p class="repo-description">${repo.description || 'No description available.'}</p>
                <div class="repo-meta">
                    <span class="repo-language">
                        ${repo.language ? `<span class="language-dot"></span>${repo.language}` : ''}
                    </span>

                    <span class="repo-updated">Updated ${formatDate(repo.updated_at)}</span>
                </div>
            </article>
        `).join('');
    } catch (error) {
        reposContainer.innerHTML = `
            <div class="error-state">
                <p>Unable to load repositories at this time.</p>
                <p class="error-detail">${error.message}</p>
                <p class="error-hint">Please check your internet connection and try again later.</p>
            </div>
        `;
        console.error("GitHub API Error:", error);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
}

// Fetch repositories when page loads
fetchGitHubRepos();

// THE CAT API - RANDOM PHOTO
const photoBtn = document.getElementById("fetchPhoto");
const photoContent = document.getElementById("photoContent");

photoBtn.addEventListener("click", async () => {
    photoContent.innerHTML = `
    <div class="loader"></div>
    <p>Loading a cute cat...</p>
  `;

    try {
        // Fetch a random cat image
        const response = await fetch("https://api.thecatapi.com/v1/images/search");
        if (!response.ok) throw new Error("Failed to fetch image.");

        const data = await response.json();
        const imageUrl = data[0].url; // Extract the image URL

        photoContent.innerHTML = `
      <img src="${imageUrl}" alt="Random Cat" class="random-img" />
      <p>Here's a random cat for you </p>
    `;
    } catch (error) {
        photoContent.innerHTML = `<p> Could not load photo. Please try again later.</p>`;
        console.error("Cat API Error:", error);
    }
});

