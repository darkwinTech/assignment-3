# Aleen AlQarni – Personal Portfolio - Assignment 3

## 📌 Assignment Description
For Assignment 3, I enhanced my portfolio website by adding dynamic, interactive, and data-driven features using HTML, CSS, and JavaScript. The project integrates external APIs, applies complex logic for filtering and validation, manages user preferences with localStorage, and optimizes performance for a smooth experience.
Key improvements include fetching live GitHub repositories, project filtering and sorting, a randomized theme accent, and responsive design
## ✨ Features
### API Integration:
* Integrated the GitHub REST API to dynamically fetch and display my latest repositories. 
    * The section shows each repository’s name, description, language, and “last updated” time in a user-friendly format.
  Includes loading spinners and error messages to handle API downtime gracefully. <br></br>
* Integrated a second external API to fetch and display random cat photos when the user clicks a button.
  * Includes a loading animation and fallback message if the request fails.<br></br>
* Icon-Enhanced Navigation: Added icons beside main navigation links (About, Projects, GitHub, Contact) for improved visual clarity and professional appearance.

### Complex Logic:
I implemented several interactive features using conditions and multi-step logic:
* Projects Filter & Sort: Users can filter projects by category or skill level and sort them by date or name. If no projects match, a friendly message appears.
* Contact Form Validation: Checks for empty fields and valid email format before allowing submission. Displays success or error messages and stores data in localStorage.
* Timer: A live “Time on Site” counter updates every second.

### State Management:
* Randomized Theme Accent: The site lets users randomize the accent color with one click and remembers their chosen color using localStorage, keeping it consistent on reload.
* Projects Show/Hide State: The visibility of the Projects section is saved, so if a user hides it, the setting remains after page reload.
* Personalized Greeting: The user’s name is stored in localStorage and displayed in a custom greeting message that updates dynamically based on the time of day.

### Performance
* Optimized Code Structure: Used clean, efficient JavaScript and CSS
* Deferred Script Loading
* Responsive & Efficient Images: Used appropriately sized images for profile and project cards with fixed dimensions to prevent layout shifts and improve load time.
* CSS Variables for Theming: Implemented --accent color variables for quick theme changes without re-rendering or extra styles.

# How to run ?
1. Copy this link (https://github.com/darkwinTech/assignment-2.git) and clone it into your IDE (WebStorm or VSCode)
2. Click Trust Project
3. Go to index.html file and run it
4. It will direct you to the browser (e.g. Chrome)
5. Interact with the website and fill the Contact form 
6. To see local storage of the contact form:
    * Right Click > Inspect > Console > write "JSON.parse(localStorage.getItem("contactSubmissions"))" to see users entered data.

# 🤖 AI Use (Short Summary)
AI (ChatGPT) was used to:
Clean and organize my CSS file by removing redundancy, improving formatting, and ensuring consistent styling. It also helped optimize selectors and structure the stylesheet for better readability and performance.

## 📂 Project Structure
```
assignment-1/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```
