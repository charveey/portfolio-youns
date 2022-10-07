#!/bin/bash
echo "-> Purging CSS"
purgecss -c purgecss.config.js --o _site/assets
echo "-> Minifying HTML"
html-minifier --file-ext html --input-dir ./_site --output-dir ./_site --minify-css --minify-js --remove-comments --collapse-whitespace --conservative-collapse --case-sensitive --no-include-auto-generated-tags
echo "-> Pre-Compressing assets"
FILES=`find _site/ -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.txt' -o -name '*.xml' -o -name '*.ipynb'`
for f in $FILES; do
    brotli -q 11 --keep --force $f
done