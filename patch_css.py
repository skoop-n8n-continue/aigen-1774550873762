import re

with open('styles.css', 'r') as f:
    content = f.read()

# 1. Update variables
content = content.replace('--color-bg-sand: #F9F8F6;', '--color-bg-sand: #10181f;')
content = content.replace('--color-accent-blue: #A2B9C3;', '--color-accent-blue: #D4AF37;')
content = content.replace('--color-terracotta: #D07B64;', '--color-terracotta: #F4D03F;')
content = content.replace('--color-terracotta-hover: #b96b56;', '--color-terracotta-hover: #F1C40F;')
content = content.replace('--color-text-slate: #2E3A45;', '--color-text-slate: #F9F8F6;')
content = content.replace('--color-text-light: #6A7C8C;', '--color-text-light: #BDBDBD;')
content = content.replace('--color-white: #FFFFFF;', '--color-white: #1f2a33;')

# 2. Add Countdown Styles
countdown_css = """
/* NYE Countdown Styles */
.countdown-section {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    padding: 1rem 0;
}

.countdown-container {
    text-align: center;
    background: rgba(212, 175, 55, 0.1);
    border: 1px solid var(--color-accent-blue);
    padding: 2rem 4rem;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
}

.countdown-container h3 {
    color: var(--color-accent-blue);
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.countdown-timer {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.time-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 80px;
}

.time-box span:first-child {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--color-text-slate);
    font-family: var(--font-heading);
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}

.time-label {
    font-size: 0.9rem;
    text-transform: uppercase;
    color: var(--color-accent-blue);
    letter-spacing: 1px;
    margin-top: 0.5rem;
}

.colon {
    font-size: 3rem;
    font-weight: bold;
    color: var(--color-accent-blue);
    margin-top: -1.5rem;
    animation: pulse 1s infinite alternate;
}

@keyframes pulse {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
}

"""

# Let's append it right after '.dashboard-area {' block
dash_target = ".dashboard-area {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    overflow: hidden;\n}"
if dash_target not in content:
    dash_target = ".dashboard-area {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n"

# I will just append the countdown styles to the end of the file.
content += countdown_css

# Make sure buttons look good with gold
content = content.replace('background: var(--color-white);', 'background: var(--color-white); border: 1px solid rgba(212,175,55,0.2);')

with open('styles.css', 'w') as f:
    f.write(content)

