import sharp from 'sharp';
import path from 'path';

async function optimizeHero() {
  const input = path.resolve('./public/New_Hero_image.png');
  const desktopOut = path.resolve('./public/hero-desktop.webp');
  const mobileOut = path.resolve('./public/hero-mobile.webp');

  console.log('Optimizing for desktop (1920w)...');
  await sharp(input)
    .resize({ width: 1920 })
    .webp({ quality: 90, effort: 6 }) // high quality
    .toFile(desktopOut);
  console.log('Desktop WebP created:', desktopOut);

  // For mobile, if we crop it down to 800w it gets stretched vertically on tall screens.
  // Instead, we will keep it extremely high-res (e.g. 1600w) so it never looks blurry on Retina.
  console.log('Optimizing for mobile (1600w)...');
  await sharp(input)
    .resize({ width: 1600 })
    .webp({ quality: 90, effort: 6 })
    .toFile(mobileOut);
  console.log('Mobile WebP created:', mobileOut);
}

optimizeHero().catch(console.error);
