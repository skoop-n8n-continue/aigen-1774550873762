import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Update Cache Buster
content = re.sub(r'\?v=xyz1234', '?v=nye2026', content)

# 2. Add Countdown and Change Title
old_html = """                <!-- HOME VIEW -->
                <div id="view-home" class="view-section active">
                    <section class="widget-section">
                        <h3 class="section-title">Discover Local Attractions</h3>"""

new_html = """                <!-- HOME VIEW -->
                <div id="view-home" class="view-section active">
                    
                    <!-- NYE Countdown -->
                    <section class="countdown-section">
                        <div class="countdown-container">
                            <h3>Countdown to New Year</h3>
                            <div class="countdown-timer">
                                <div class="time-box">
                                    <span id="cd-days">00</span>
                                    <span class="time-label">Days</span>
                                </div>
                                <span class="colon">:</span>
                                <div class="time-box">
                                    <span id="cd-hours">00</span>
                                    <span class="time-label">Hours</span>
                                </div>
                                <span class="colon">:</span>
                                <div class="time-box">
                                    <span id="cd-mins">00</span>
                                    <span class="time-label">Mins</span>
                                </div>
                                <span class="colon">:</span>
                                <div class="time-box">
                                    <span id="cd-secs">00</span>
                                    <span class="time-label">Secs</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="widget-section">
                        <h3 class="section-title">Curated NYE Experiences</h3>"""

content = content.replace(old_html, new_html)

# 3. Update bottom widgets text to be NYE related
content = content.replace('<h3>The Ocean Grill</h3>\n                                <p>Michelin-starred seafood just steps away.</p>', '<h3>New Year Gala Dinner</h3>\n                                <p>Exclusive 5-course NYE tasting menu at The Ocean Grill.</p>')
content = content.replace('<h3>Tranquility Spa</h3>\n                                <p>Book your complimentary morning yoga session.</p>', '<h3>NYE Recovery Spa</h3>\n                                <p>Start the new year refreshed with our signature detox treatment.</p>')

with open('index.html', 'w') as f:
    f.write(content)

