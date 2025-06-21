document.addEventListener('DOMContentLoaded', function() {
    console.log('IIT Madras Clone site loaded successfully!');

    // Dropdown menu interactivity for mobile and click toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropbtn = dropdown.querySelector('.dropbtn');
        dropbtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.nextElementSibling.classList.toggle('show');
        });
    });

    // Close dropdown if clicked outside
    window.addEventListener('click', function(e) {
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.querySelector('.dropdown-content').classList.remove('show');
            }
        });
    });

    // Simple news/events slider (auto-scroll)
    const newsList = document.getElementById('news-list');
    if (newsList) {
        let scrollAmount = 0;
        setInterval(() => {
            scrollAmount += 1;
            if (scrollAmount >= newsList.scrollHeight - newsList.clientHeight) {
                scrollAmount = 0;
            }
            newsList.scrollTop = scrollAmount;
        }, 100);
    }

    // Popup notification close button
    const popup = document.getElementById('popupNotification');
    const closeBtn = document.getElementById('closePopup');
    if (popup && closeBtn) {
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    // Predictor form logic
    const predictorForm = document.getElementById('predictorForm');
    const resultContent = document.getElementById('resultContent');

    if (predictorForm) {
        predictorForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const rank = parseInt(document.getElementById('rank').value);
            const category = document.getElementById('category').value;
            const branch = document.getElementById('branch').value;

            // Static simulation logic for prediction based on rank and category
            // This is a simplified example using hypothetical rank ranges

            let predictedIITs = [];
            let predictedCourses = [];

            // Define rank ranges for categories (simplified)
            const rankRanges = {
                GEN: [1, 10000],
                OBC: [1, 15000],
                SC: [1, 20000],
                ST: [1, 25000]
            };

            // Check if rank is within category range
            if (rank < rankRanges[category][0] || rank > rankRanges[category][1]) {
                resultContent.innerHTML = `<p>Your rank is outside the expected range for category ${category}. Please check your input.</p>`;
                return;
            }

            // Predict IITs based on rank (simplified)
            if (rank <= 1000) {
                predictedIITs = ['IIT Madras', 'IIT Bombay', 'IIT Delhi'];
            } else if (rank <= 5000) {
                predictedIITs = ['IIT Kanpur', 'IIT Kharagpur', 'IIT Roorkee'];
            } else if (rank <= 10000) {
                predictedIITs = ['IIT Guwahati', 'IIT Hyderabad', 'IIT BHU'];
            } else {
                predictedIITs = ['IIT Gandhinagar', 'IIT Ropar', 'IIT Patna'];
            }

            // Predict courses based on branch preference
            const coursesByBranch = {
                CSE: ['Computer Science and Engineering'],
                ECE: ['Electronics and Communication Engineering'],
                ME: ['Mechanical Engineering'],
                CE: ['Civil Engineering'],
                CH: ['Chemical Engineering'],
                AE: ['Aerospace Engineering']
            };

            predictedCourses = coursesByBranch[branch] || [];

            // Display results
            let html = `<h3>Predicted IITs for Rank ${rank} (${category} category):</h3><ul>`;
            predictedIITs.forEach(iit => {
                html += `<li>${iit}</li>`;
            });
            html += `</ul>`;

            html += `<h3>Predicted Course(s) for Branch: ${branch}</h3><ul>`;
            predictedCourses.forEach(course => {
                html += `<li>${course}</li>`;
            });
            html += `</ul>`;

            resultContent.innerHTML = html;
        });
    }

    // Events data array
    const events = [
        {
            title: "Convocation Ceremony 2023",
            date: "2023-07-15",
            time: "10:00 AM",
            description: "Annual convocation ceremony for graduating students.",
            venue: "Main Auditorium"
        },
        {
            title: "Tech Symposium",
            date: "2023-08-05",
            time: "09:00 AM",
            description: "A symposium showcasing latest research and innovations.",
            venue: "Engineering Block"
        },
        {
            title: "Alumni Meet 2023",
            date: "2023-09-10",
            time: "05:00 PM",
            description: "Gathering of IIT Madras alumni from around the world.",
            venue: "Conference Hall"
        },
        {
            title: "Cultural Fest",
            date: "2023-10-20",
            time: "11:00 AM",
            description: "Annual cultural festival with music, dance, and drama.",
            venue: "Open Grounds"
        }
    ];

    // Function to render events dynamically
    function renderEvents() {
        const eventsList = document.getElementById('eventsList');
        if (!eventsList) return;

        eventsList.innerHTML = '';

        events.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';

            eventCard.innerHTML = `
                <h3 class="event-title">${event.title}</h3>
                <p class="event-date-time"><strong>Date:</strong> ${event.date} | <strong>Time:</strong> ${event.time}</p>
                <p class="event-description">${event.description}</p>
                <p class="event-venue"><strong>Venue:</strong> ${event.venue}</p>
            `;

            eventsList.appendChild(eventCard);
        });
    }

    // Call renderEvents on DOMContentLoaded
    renderEvents();
});
