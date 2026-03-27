import re

with open('script.js', 'r') as f:
    content = f.read()

# 1. Update Attractions Data
old_attractions = """    const attractions = [
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
            fullDesc: 'Step back in time at the region\\'s oldest functioning lighthouse. Climb the 112 spiral steps for a 360-degree view of the bay. Guided tours run every hour on the hour.',
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
            fullDesc: 'Embark on a luxurious 2-hour private catamaran cruise. Enjoy complimentary champagne and hors d\\'oeuvres while you watch the sun dip below the horizon.',
            action: 'Check Availability'
        }
    ];"""

new_attractions = """    const attractions = [
        {
            id: 'attr-1',
            title: 'Midnight Fireworks',
            desc: 'Spectacular display over the bay.',
            img: 'https://skoop-dev-code-agent.s3.us-east-1.amazonaws.com/n8n-continue%2Faigen-1774550873762%2Fassets%2Ffireworks-1774579129971.png',
            fullDesc: 'Join us on the terrace or view from your room as we light up the sky with a world-class fireworks display to ring in the New Year. The show begins exactly at midnight.',
            action: 'View Schedule'
        },
        {
            id: 'attr-2',
            title: 'Champagne Toast',
            desc: 'Complimentary Moët & Chandon.',
            img: 'https://skoop-dev-code-agent.s3.us-east-1.amazonaws.com/n8n-continue%2Faigen-1774550873762%2Fassets%2Fchampagne-1774579153070.png',
            fullDesc: 'Enjoy a complimentary glass of vintage champagne at our grand lobby countdown. We will be pouring starting at 11:30 PM.',
            action: 'RSVP'
        },
        {
            id: 'attr-3',
            title: 'NYE Party Favors',
            desc: 'Get your hats and noisemakers.',
            img: 'https://skoop-dev-code-agent.s3.us-east-1.amazonaws.com/n8n-continue%2Faigen-1774550873762%2Fassets%2Ffavors-1774579175078.png',
            fullDesc: 'We have prepared exclusive gift bags with elegant NYE party favors, including golden top hats, tiaras, and premium noisemakers. Available at the concierge desk.',
            action: 'Request Delivery'
        },
        {
            id: 'attr-4',
            title: 'Live DJ Gala',
            desc: 'Dance into the new year.',
            img: 'https://skoop-dev-code-agent.s3.us-east-1.amazonaws.com/n8n-continue%2Faigen-1774550873762%2Fassets%2Fdj-1774579195362.png',
            fullDesc: 'Experience the ultimate NYE party in our grand ballroom with a live international DJ, state-of-the-art laser light show, and premium open bar.',
            action: 'Get Tickets'
        }
    ];"""

content = content.replace(old_attractions, new_attractions)

# 2. Add Countdown logic
countdown_logic = """
    // -------------------------------------------------------------------------
    // 1.5 NYE Countdown Logic
    // -------------------------------------------------------------------------
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');

    function updateCountdown() {
        if (!cdDays) return;
        const now = new Date();
        const nextYear = new Date(now.getFullYear() + 1, 0, 1);
        const diff = nextYear - now;

        if (diff <= 0) {
            cdDays.textContent = '00';
            cdHours.textContent = '00';
            cdMins.textContent = '00';
            cdSecs.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        cdDays.textContent = days.toString().padStart(2, '0');
        cdHours.textContent = hours.toString().padStart(2, '0');
        cdMins.textContent = minutes.toString().padStart(2, '0');
        cdSecs.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
"""

# Insert right after updateDateTime interval setup
target = "setInterval(updateDateTime, 60000); // Update every minute"
content = content.replace(target, target + "\n" + countdown_logic)

with open('script.js', 'w') as f:
    f.write(content)

