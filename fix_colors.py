import re

css_file = 'styles.css'
with open(css_file, 'r') as f:
    css = f.read()

# Replace root variables
css = re.sub(r'--color-bg-sand:\s*#[0-9a-fA-F]+;', '--color-bg-sand: #111315;', css)
css = re.sub(r'--color-accent-blue:\s*#[0-9a-fA-F]+;', '--color-accent-blue: #C5A059;', css)
css = re.sub(r'--color-terracotta:\s*#[0-9a-fA-F]+;', '--color-terracotta: #D4AF37;', css)
css = re.sub(r'--color-terracotta-hover:\s*#[0-9a-fA-F]+;', '--color-terracotta-hover: #E3C155;', css)
css = re.sub(r'--color-text-slate:\s*#[0-9a-fA-F]+;', '--color-text-slate: #F5F5F0;', css)
css = re.sub(r'--color-text-light:\s*#[0-9a-fA-F]+;', '--color-text-light: #A0A5A8;', css)
css = re.sub(r'--color-white:\s*#[0-9a-fA-F]+;', '--color-white: #1A1D20;', css)

css = re.sub(r'--shadow-soft:\s*0 10px 30px rgba\([^)]+\);', '--shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.5);', css)
css = re.sub(r'--shadow-card:\s*0 20px 40px rgba\([^)]+\);', '--shadow-card: 0 20px 40px rgba(0, 0, 0, 0.7);', css)

# Fix specific rgb/rgba values
css = css.replace('rgba(249,248,246,1)', 'rgba(17,19,21,1)')
css = css.replace('rgba(162,185,195,0.4)', 'rgba(197,160,89,0.1)')
css = css.replace('rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.08)')
css = css.replace('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.05)')
css = css.replace('rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.04)')
css = css.replace('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.03)')
css = css.replace('rgba(208, 123, 100, 0.3)', 'rgba(212, 175, 55, 0.2)')
css = css.replace('rgba(162, 185, 195, 0.3)', 'rgba(255, 255, 255, 0.1)')
css = css.replace('rgba(46, 58, 69, 0.2)', 'rgba(0, 0, 0, 0.6)')
css = css.replace('rgba(16, 24, 31, 0.8) 0%, rgba(16, 24, 31, 0.2)', 'rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3)')
css = css.replace('rgba(0,0,0,0.3)', 'rgba(0, 0, 0, 0.8)')
css = css.replace('rgba(46, 58, 69, 0.6)', 'rgba(0, 0, 0, 0.8)')
css = css.replace('rgba(0,0,0,0.2)', 'rgba(0, 0, 0, 0.6)')
css = css.replace('rgba(46, 58, 69, 0.1)', 'rgba(255, 255, 255, 0.05)')
css = css.replace('rgba(0,0,0,0.05)', 'rgba(0, 0, 0, 0.4)')
css = css.replace('rgba(162, 185, 195, 0.25)', 'rgba(0, 0, 0, 0.4)')
css = css.replace('rgba(162, 185, 195, 0.2)', 'rgba(197, 160, 89, 0.15)')
css = css.replace('rgba(0,0,0,0.03)', 'rgba(0, 0, 0, 0.2)')
css = css.replace('rgba(162, 185, 195, 0.4)', 'rgba(255, 255, 255, 0.15)')
css = css.replace('rgba(162, 185, 195, 0.5)', 'rgba(255, 255, 255, 0.15)')

with open(css_file, 'w') as f:
    f.write(css)

# Also fix script.js
js_file = 'script.js'
with open(js_file, 'r') as f:
    js = f.read()

# Update gradients in script.js for luxury dark mode
# Morning
js = js.replace("linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(162,185,195,0.4) 100%)", "linear-gradient(135deg, rgba(17,19,21,1) 0%, rgba(35,30,22,1) 100%)")
js = js.replace("linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(162,185,195,0.5) 100%)", "linear-gradient(135deg, rgba(17,19,21,1) 0%, rgba(40,35,28,1) 100%)")
# Afternoon
js = js.replace("linear-gradient(135deg, rgba(249,248,246,1) 0%, rgba(208,123,100,0.15) 100%)", "linear-gradient(135deg, rgba(17,19,21,1) 0%, rgba(45,35,20,1) 100%)")
# Evening
js = js.replace("linear-gradient(135deg, rgba(220,215,210,1) 0%, rgba(46,58,69,0.3) 100%)", "linear-gradient(135deg, rgba(17,19,21,1) 0%, rgba(20,20,20,1) 100%)")
# Night
js = js.replace("linear-gradient(135deg, rgba(46,58,69,1) 0%, rgba(20,30,40,1) 100%)", "linear-gradient(135deg, rgba(10,11,12,1) 0%, rgba(5,5,5,1) 100%)")

# Remove color overrides in night mode since it's all dark now
js = js.replace("document.body.style.color = '#F9F8F6';", "")
js = js.replace("document.querySelector('.greeting-name').style.color = '#F9F8F6';", "")
js = js.replace("timeElement.style.color = '#F9F8F6';", "")

with open(js_file, 'w') as f:
    f.write(js)
