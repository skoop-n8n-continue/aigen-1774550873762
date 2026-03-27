import re

with open('styles.css', 'r') as f:
    content = f.read()

content = content.replace('background-color: #e5e3df;', 'background-color: #1a252f;')

with open('styles.css', 'w') as f:
    f.write(content)


with open('script.js', 'r') as f:
    js_content = f.read()

js_content = js_content.replace('fill=\\\'%23A2B9C3\\\'', 'fill=\\\'%23D4AF37\\\'')

with open('script.js', 'w') as f:
    f.write(js_content)

