# Example Optimization Commands

```bash
magick background.jpg -resize 1921x1080 -quality 85 -define webp:lossless=false output.webp

cwebp -q 85 -m 6 input.jpg -o output.webp

pngquant --quality=75-85 --ext=.png --force image.png

avifenc -a end-usage=q -a cq-level=15 -a tune=ssim -s 0 --min 0 --max 30 image.png output.avif

svgcleaner input.svg output.svg --remove-metadata=true --remove-nonsvg-attributes=true --remove-xmlns-xlink-attribute=true

svgo

optimimg
```
