import re

with open('styles.css', 'r') as f:
    content = f.read()

# Replace hardcoded RGBA values
content = content.replace('rgba(162, 185, 195,', 'rgba(212, 175, 55,')
content = content.replace('rgba(208, 123, 100,', 'rgba(244, 208, 63,')

# Replace slate shadows with black shadows
content = content.replace('rgba(46, 58, 69,', 'rgba(0, 0, 0,')

# Replace semi-transparent white backgrounds with dark card backgrounds
content = content.replace('background: rgba(255, 255, 255, 0.6);', 'background: rgba(31, 42, 51, 0.6);')
content = content.replace('background: rgba(255, 255, 255, 0.3);', 'background: rgba(31, 42, 51, 0.3);')
content = content.replace('background: rgba(255, 255, 255, 0.2);', 'background: rgba(31, 42, 51, 0.2);')
content = content.replace('background: rgba(255, 255, 255, 0.5);', 'background: rgba(31, 42, 51, 0.5);')

# Fix a gradient issue
content = content.replace('background: linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(212, 175, 55, 0.4) 100%);', 'background: linear-gradient(135deg, #10181f 0%, #1a252f 100%);')

with open('styles.css', 'w') as f:
    f.write(content)

