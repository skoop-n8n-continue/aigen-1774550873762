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
        let greeting = 'Congratulations,';
        // Define gradients based on time of day
        let bgGradient = 'linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(162,185,195,0.4) 100%)'; // Default / Morning

        if (currentHour >= 5 && currentHour < 12) {
            greeting = 'Congratulations,';
            bgGradient = 'linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(162,185,195,0.5) 100%)'; // Soft Morning Blue
        } else if (currentHour >= 12 && currentHour < 17) {
            greeting = 'Congratulations,';
            bgGradient = 'linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(208,123,100,0.15) 100%)'; // Warm Afternoon Terracotta tint
        } else if (currentHour >= 17 && currentHour < 21) {
            greeting = 'Congratulations,';
            bgGradient = 'linear-gradient(135deg, rgba(220,215,210,1) 0%, rgba(46,58,69,0.3) 100%)'; // Dusk Slate tint
        } else {
            greeting = 'Congratulations,';
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
    // 2. View Navigation Logic
    // -------------------------------------------------------------------------
    
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewSections = document.querySelectorAll('.view-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active from all buttons
            navButtons.forEach(b => b.classList.remove('active'));
            
            // Add to clicked
            const targetBtn = e.currentTarget;
            targetBtn.classList.add('active');

            // Simple animation feedback
            targetBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                targetBtn.style.transform = '';
            }, 150);

            // Switch Views
            const targetViewId = 'view-' + targetBtn.dataset.target;
            viewSections.forEach(section => {
                if(section.id === targetViewId) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    });

    // -------------------------------------------------------------------------
    // 3. Mock Data & Content Injection (Home View)
    // -------------------------------------------------------------------------

    const attractions = [
        {
            id: 'attr-1',
            title: 'Sunset Sailing',
            desc: 'Private catamaran cruise on the bay.',
            img: 'assets/sailing.jpg',
            fullDesc: 'Embark on a luxurious 2-hour private catamaran cruise. Enjoy complimentary champagne and hors d\'oeuvres while you watch the sun dip below the horizon.',
            action: 'Check Availability'
        },
        {
            id: 'attr-2',
            title: 'Couples Spa Package',
            desc: 'Ultimate relaxation for two.',
            img: 'assets/spa.jpg',
            fullDesc: 'Indulge in a 90-minute couples massage followed by exclusive access to the private thermal suite, complete with champagne and chocolate-covered strawberries.',
            action: 'Book Spa'
        },
        {
            id: 'attr-3',
            title: 'Candlelit Dining',
            desc: 'Private beachside dinner under the stars.',
            img: 'assets/dining.jpg',
            fullDesc: 'A private table set on the beach with a curated 5-course tasting menu and wine pairing, served by a dedicated private butler as the waves crash nearby.',
            action: 'Reserve Table'
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
            card.addEventListener('click', () => openAttractionOverlay(attr));
            container.appendChild(card);
        });
    }

    renderAttractions();

    // -------------------------------------------------------------------------
    // 4. Interactive Overlay Logic (Global)
    // -------------------------------------------------------------------------

    const overlay = document.getElementById('content-overlay');
    const closeBtn = document.getElementById('close-overlay');
    const overlayBody = document.getElementById('overlay-body');

    function closeOverlay() {
        overlay.classList.add('hidden');
    }

    closeBtn.addEventListener('click', closeOverlay);
    document.querySelector('.overlay-backdrop').addEventListener('click', closeOverlay);

    // Global expose functions for inline onclick attributes
    window.openDiningReservation = function() {
        overlayBody.innerHTML = `
            <h2 class="expanded-detail-title">Reserve a Table</h2>
            <p class="expanded-detail-text">Book your dining experience instantly.</p>
            
            <div class="reservation-form">
                <div class="form-group">
                    <label>Restaurant</label>
                    <select>
                        <option>The Ocean Grill</option>
                        <option>Market Cafe</option>
                        <option>The Horizon Bar</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" value="2024-10-25">
                </div>
                <div class="form-group">
                    <label>Time</label>
                    <input type="time" value="19:30">
                </div>
                <div class="form-group">
                    <label>Party Size</label>
                    <select>
                        <option>1 Person</option>
                        <option selected>2 People</option>
                        <option>3 People</option>
                        <option>4 People</option>
                        <option>5+ People</option>
                    </select>
                </div>
                <button class="submit-btn" onclick="alert('Reservation Confirmed! You will receive a notification shortly.'); document.getElementById('close-overlay').click();">Confirm Reservation</button>
            </div>
        `;
        overlay.classList.remove('hidden');
    };

    window.openSpaSchedule = function() {
        overlayBody.innerHTML = `
            <h2 class="expanded-detail-title">Tranquility Spa Schedule</h2>
            <p class="expanded-detail-text">View today's available wellness sessions.</p>
            
            <div class="spa-schedule-container">
                <table class="spa-schedule">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Session</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>08:00 AM</td>
                            <td>Sunrise Yoga</td>
                            <td><button class="book-class-btn" onclick="this.innerText='Booked'; this.disabled=true; this.style.opacity=0.5;">Book</button></td>
                        </tr>
                        <tr>
                            <td>10:00 AM</td>
                            <td>Deep Tissue Massage</td>
                            <td><button class="book-class-btn" onclick="this.innerText='Booked'; this.disabled=true; this.style.opacity=0.5;">Book</button></td>
                        </tr>
                        <tr>
                            <td>01:00 PM</td>
                            <td>Hot Stone Therapy</td>
                            <td><button class="book-class-btn" onclick="this.innerText='Booked'; this.disabled=true; this.style.opacity=0.5;">Book</button></td>
                        </tr>
                        <tr>
                            <td>04:00 PM</td>
                            <td>Evening Meditation</td>
                            <td><button class="book-class-btn" onclick="this.innerText='Booked'; this.disabled=true; this.style.opacity=0.5;">Book</button></td>
                        </tr>
                    </tbody>
                </table>
                <p style="font-size: 0.9rem; color: var(--color-text-light); text-align: center; margin-top: 1rem;">For private sessions or custom packages, please contact the Spa Concierge directly from your room phone (Dial 4).</p>
            </div>
        `;
        overlay.classList.remove('hidden');
    };

    function openAttractionOverlay(data) {
        let actionHTML = '';
        if (data.action === 'Get Directions' || data.action === 'View Map') {
            actionHTML = `
                <div class="map-placeholder">Interactive Map View</div>
                <p style="margin-bottom: 1rem;"><strong>Directions:</strong> Turn right out of the hotel lobby. Head straight for 2 blocks until you reach the coastal highway. The destination is clearly marked on your left.</p>
                <button class="expanded-action" onclick="alert('Directions sent to your mobile device!'); document.getElementById('close-overlay').click();">Send to Mobile</button>
            `;
        } else {
            actionHTML = `<button class="expanded-action" onclick="alert('${data.action} request submitted.'); document.getElementById('close-overlay').click();">${data.action}</button>`;
        }

        overlayBody.innerHTML = `
            <img src="${data.img}" alt="${data.title}" class="expanded-detail-img" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'100\\' height=\\'100\\'><rect width=\\'100\\' height=\\'100\\' fill=\\'%23A2B9C3\\'/></svg>'">
            <h2 class="expanded-detail-title">${data.title}</h2>
            <p class="expanded-detail-text">${data.fullDesc}</p>
            ${actionHTML}
        `;
        overlay.classList.remove('hidden');
    }

    // -------------------------------------------------------------------------
    // 5. Room Service Logic
    // -------------------------------------------------------------------------

    const roomServiceMenu = {
        'breakfast': [
            { id: 'm1', name: 'Classic American Breakfast', desc: 'Two eggs any style, bacon or sausage, hash browns, and toast.', price: 24.00 },
            { id: 'm2', name: 'Avocado Toast', desc: 'Smashed avocado on artisanal sourdough, poached egg, chili flakes.', price: 18.00 },
            { id: 'm3', name: 'Buttermilk Pancakes', desc: 'Stack of three pancakes, seasonal berries, maple syrup.', price: 16.00 }
        ],
        'all-day': [
            { id: 'm4', name: 'Club Sandwich', desc: 'Roasted turkey, bacon, lettuce, tomato, mayo on toasted brioche.', price: 22.00 },
            { id: 'm5', name: 'Wagyu Beef Burger', desc: '8oz Wagyu patty, aged cheddar, caramelized onions, truffle fries.', price: 28.00 },
            { id: 'm6', name: 'Caesar Salad', desc: 'Romaine, parmesan, garlic croutons. Add grilled chicken (+$6).', price: 16.00 },
            { id: 'm7', name: 'Margarita Pizza', desc: 'Fresh mozzarella, tomato sauce, basil, olive oil.', price: 20.00 }
        ],
        'beverages': [
            { id: 'm8', name: 'Fresh Orange Juice', desc: 'Freshly squeezed daily.', price: 8.00 },
            { id: 'm9', name: 'Artisan Coffee', desc: 'Locally roasted drip coffee or espresso.', price: 6.00 },
            { id: 'm10', name: 'Sparkling Water', desc: 'San Pellegrino or Perrier 500ml.', price: 5.00 },
            { id: 'm11', name: 'Craft Beer', desc: 'Selection of local IPAs and lagers.', price: 9.00 }
        ]
    };

    let cart = [];
    const menuItemsContainer = document.querySelector('.menu-items-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    window.showMenuCat = function(category) {
        // Update active button state
        document.querySelectorAll('.menu-cat-btn').forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');

        // Render items
        menuItemsContainer.innerHTML = '';
        const items = roomServiceMenu[category] || [];
        
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-item-card';
            card.innerHTML = `
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
                <div class="menu-item-price-row">
                    <span class="menu-price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart('${item.id}', '${item.name.replace(/'/g, "\\'")}', ${item.price})">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            `;
            menuItemsContainer.appendChild(card);
        });
    };

    window.addToCart = function(id, name, price) {
        cart.push({ id, name, price });
        updateCartUI();
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartUI();
    };

    function updateCartUI() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Cart is empty</p>';
            cartTotalPrice.innerText = '$0.00';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const cartEl = document.createElement('div');
            cartEl.className = 'cart-item';
            cartEl.innerHTML = `
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${index})">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartEl);
        });

        cartTotalPrice.innerText = '$' + total.toFixed(2);
    }

    window.placeOrder = function() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before placing an order.');
            return;
        }
        
        // In a real app, this would send an API request
        alert(`Order Placed Successfully! Your total of $${cart.reduce((a,b)=>a+b.price, 0).toFixed(2)} will be charged to your room. It will arrive in approximately 30 minutes.`);
        
        // Clear cart
        cart = [];
        updateCartUI();
    };

    // Initialize default menu category
    showMenuCat('breakfast');
});
