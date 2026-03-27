import re

with open('styles.css', 'r') as f:
    content = f.read()

content = content.replace('background: linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(162,185,195,0.4) 100%);', 'background: linear-gradient(135deg, #10181f 0%, #1a252f 100%);')

with open('styles.css', 'w') as f:
    f.write(content)
