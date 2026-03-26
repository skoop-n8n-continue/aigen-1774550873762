document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Time, Date, and Dynamic Background Logic
    // -------------------------------------------------------------------------

    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const greetingElement = document.querySelector('.greeting-sub');
    const bgElement = document.getElementById('dynamic-bg');

    function updateDateTime() {
        const now = new Date();

        // Format Time
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const timeString = hours + ':' + minutes + ' ' + ampm;
        timeElement.textContent = timeString;

        // Format Date
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        dateElement.textContent = dateString;

        updateTimeBasedUI(now.getHours());
    }

    function updateTimeBasedUI(currentHour) {
        let greeting = 'Good Morning,';
        // Define gradients based on time of day
        let bgGradient = 'linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(162,185,195,0.4) 100%)'; // Default / Morning

        if (currentHour >= 5 && currentHour < 12) {
            greeting = 'Good Morning,';
            bgGradient = 'linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(162,185,195,0.5) 100%)'; // Soft Morning Blue
        } else if (currentHour >= 12 && currentHour < 17) {
            greeting = 'Good Afternoon,';
            bgGradient = 'linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(208,123,100,0.15) 100%)'; // Warm Afternoon Terracotta tint
        } else if (currentHour >= 17 && currentHour < 21) {
            greeting = 'Good Evening,';
            bgGradient = 'linear-gradient(135deg, rgba(220,215,210,1) 0%, rgba(46,58,69,0.3) 100%)'; // Dusk Slate tint
        } else {
            greeting = 'Good Night,';
            bgGradient = 'linear-gradient(135deg, rgba(46,58,69,1) 0%, rgba(20,30,40,1) 100%)'; // Deep Night Slate
            document.body.style.color = '#F9F8F6';
            document.querySelector('.greeting-name').style.color = '#F9F8F6';
            timeElement.style.color = '#F9F8F6';
        }

        greetingElement.textContent = greeting;
        bgElement.style.background = bgGradient;
    }

    // Initialize and set interval
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute

    // -------------------------------------------------------------------------
    // 2. Mock Data & Content Injection
    // -------------------------------------------------------------------------

    const attractions = [
        {
            id: 'attr-1',
            title: 'Coastal Cliff Walk',
            desc: 'A scenic 3-mile trail overlooking the ocean.',
            img: 'assets/cliff-walk.jpg',
            fullDesc: 'Experience breathtaking panoramic views of the rugged coastline. This moderate 3-mile trail is perfect for a morning run or a leisurely sunset stroll. Keep an eye out for local marine life in the coves below.',
            action: 'Get Directions'
        },
        {
            id: 'attr-2',
            title: 'Historic Lighthouse',
            desc: 'Guided tours of the 19th-century beacon.',
            img: 'assets/lighthouse.jpg',
            fullDesc: 'Step back in time at the region\'s oldest functioning lighthouse. Climb the 112 spiral steps for a 360-degree view of the bay. Guided tours run every hour on the hour.',
            action: 'Book Tour'
        },
        {
            id: 'attr-3',
            title: 'Artisan Market',
            desc: 'Local crafts, jewelry, and fresh produce.',
            img: 'assets/market.jpg',
            fullDesc: 'Browse stalls from over 50 local artisans and farmers. Find unique handcrafted ceramics, custom jewelry, and taste farm-fresh organic produce. Open Fridays through Sundays.',
            action: 'View Map'
        },
        {
            id: 'attr-4',
            title: 'Sunset Sailing',
            desc: 'Private charter experiences on the bay.',
            img: 'assets/sailing.jpg',
            fullDesc: 'Embark on a luxurious 2-hour private catamaran cruise. Enjoy complimentary champagne and hors d\'oeuvres while you watch the sun dip below the horizon.',
            action: 'Check Availability'
        }
    ];

    const container = document.getElementById('attractions-container');

    function renderAttractions() {
        attractions.forEach((attr) => {
            const card = document.createElement('div');
            card.className = 'polaroid-card';
            card.setAttribute('data-id', attr.id);

            card.innerHTML = `
                <img src="${attr.img}" alt="${attr.title}" class="polaroid-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%23A2B9C3\\'/></svg>'">
                <h4 class="polaroid-title">${attr.title}</h4>
                <p class="polaroid-desc">${attr.desc}</p>
            `;

            // Add click listener to open details
            card.addEventListener('click', () => openOverlay(attr));
            container.appendChild(card);
        });
    }

    renderAttractions();

    // -------------------------------------------------------------------------
    // 3. Interactive Overlay Logic
    // -------------------------------------------------------------------------

    const overlay = document.getElementById('content-overlay');
    const closeBtn = document.getElementById('close-overlay');
    const overlayBody = document.getElementById('overlay-body');

    function openOverlay(data) {
        overlayBody.innerHTML = `
            <img src="${data.img}" alt="${data.title}" class="expanded-detail-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%23A2B9C3\\'/></svg>'">
            <h2 class="expanded-detail-title">${data.title}</h2>
            <p class="expanded-detail-text">${data.fullDesc}</p>
            <button class="expanded-action">${data.action}</button>
        `;
        overlay.classList.remove('hidden');
    }

    closeBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
    });

    // Close on backdrop click
    document.querySelector('.overlay-backdrop').addEventListener('click', () => {
        overlay.classList.add('hidden');
    });

    // -------------------------------------------------------------------------
    // 4. Navigation Button Logic
    // -------------------------------------------------------------------------

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all
            navButtons.forEach(b => b.classList.remove('active'));
            // Add to clicked
            const targetBtn = e.currentTarget;
            targetBtn.classList.add('active');

            // Simple animation feedback
            targetBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                targetBtn.style.transform = '';
            }, 150);

            // In a real app, this would route to different views.
            console.log('Navigated to:', targetBtn.dataset.target);
        });
    });

    // Widget click listeners
    const widgets = document.querySelectorAll('.widget-card');
    widgets.forEach(widget => {
        widget.addEventListener('click', () => {
            const title = widget.querySelector('h3').textContent;
            openOverlay({
                title: title,
                img: widget.querySelector('.card-bg').style.backgroundImage.slice(5, -2) || '',
                fullDesc: 'This feature is a demonstration. In a production environment, this would open the detailed view for ' + title + ', allowing the guest to make reservations or view schedules.',
                action: 'Confirm Selection'
            });
        });
    });
});