import re

with open('script.js', 'r') as f:
    content = f.read()

old_logic = """    function updateTimeBasedUI(currentHour) {
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
    }"""

new_logic = """    function updateTimeBasedUI(currentHour) {
        let greeting = 'Good Morning,';
        if (currentHour >= 12 && currentHour < 17) greeting = 'Good Afternoon,';
        else if (currentHour >= 17 && currentHour < 21) greeting = 'Good Evening,';
        else if (currentHour >= 21 || currentHour < 5) greeting = 'Good Night,';

        let bgGradient = 'linear-gradient(135deg, #10181f 0%, #1a252f 100%)'; // Deep NYE Slate
        document.body.style.color = '#F9F8F6';
        document.querySelector('.greeting-name').style.color = '#D4AF37'; // Gold
        timeElement.style.color = '#F9F8F6';

        greetingElement.textContent = greeting;
        bgElement.style.background = bgGradient;
    }"""

content = content.replace(old_logic, new_logic)

with open('script.js', 'w') as f:
    f.write(content)

