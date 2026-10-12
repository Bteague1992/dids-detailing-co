// Regenerates every derived brand asset (optimized logos, favicon + app icons,
// and the social share image) from the untouched originals in branding/.
//
//   node scripts/generate-brand-assets.mjs
//
// The originals are kept outside public/ on purpose: the site only ever
// serves the optimized copies this script writes.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
// Poppins ExtraBold (SIL Open Font License, see scripts/fonts/OFL.txt) —
// used only to draw the tagline on the share image.
const TAGLINE_FONT = path.join(here, "fonts", "Poppins-ExtraBold.ttf");

const SRC = "branding";
const OUT = "public/images/brand";
const ICONS = "public/icons";
const CHARCOAL = "#2B2B2B";

const src = {
  logoDark: `${SRC}/Light-background Dad's mobile detailing logo.png`,
  logoLight: `${SRC}/Dad's Mobile Detailing Logo.png`,
  shield: `${SRC}/Dad's Mobile Detailing Shield Logo.png`,
  avatar: `${SRC}/dads-mobile-detailing-icon.png`,
};

for (const dir of [OUT, ICONS]) fs.mkdirSync(dir, { recursive: true });

const png = { compressionLevel: 9, effort: 10 };

// --- Optimized logos (resized only — never cropped or recolored) ----------
await sharp(src.logoDark).resize({ height: 224 }).png(png).toFile(`${OUT}/logo-dark.png`);
await sharp(src.logoLight).resize({ height: 224 }).png(png).toFile(`${OUT}/logo-light.png`);
await sharp(src.shield).resize(800, 800).png(png).toFile(`${OUT}/shield.png`);
await sharp(src.avatar).resize(512, 512).png(png).toFile(`${OUT}/avatar.png`);

// --- Favicon + app icons (circle avatar) ---------------------------------
const iconPng = (size) => sharp(src.avatar).resize(size, size).png(png).toBuffer();
for (const size of [16, 32, 48, 192, 512]) {
  fs.writeFileSync(`${ICONS}/icon-${size}.png`, await iconPng(size));
}
// iOS fills transparency with black, so the touch icon gets a solid backdrop.
await sharp(src.avatar)
  .resize(180, 180)
  .flatten({ background: CHARCOAL })
  .png(png)
  .toFile("app/apple-icon.png");

// favicon.ico containing 16/32/48 PNGs
{
  const sizes = [16, 32, 48];
  const images = await Promise.all(sizes.map(iconPng));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = 6 + 16 * sizes.length;
  const entries = sizes.map((size, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size, 0);
    e.writeUInt8(size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(images[i].length, 8);
    e.writeUInt32LE(offset, 12);
    offset += images[i].length;
    return e;
  });
  fs.writeFileSync("app/favicon.ico", Buffer.concat([header, ...entries, ...images]));
}

// --- 1200x630 social share image -----------------------------------------
{
  if (!fs.existsSync(TAGLINE_FONT)) {
    throw new Error(`Missing ${TAGLINE_FONT} — needed for the share image tagline.`);
  }
  const logo = await sharp(src.logoLight).resize({ width: 780 }).toBuffer();
  const tagline = await sharp({
    text: {
      text: `<span foreground="#FFFFFF">Life gets messy. </span><span foreground="#F47A1F">Dad’s got it.</span>`,
      font: "Poppins ExtraBold 30",
      fontfile: TAGLINE_FONT,
      rgba: true,
      dpi: 144,
    },
  })
    .png()
    .toBuffer();
  const meta = await sharp(tagline).metadata();
  await sharp({ create: { width: 1200, height: 630, channels: 4, background: CHARCOAL } })
    .composite([
      { input: logo, top: 110, left: 210 },
      { input: tagline, top: 440, left: Math.round((1200 - meta.width) / 2) },
    ])
    .png(png)
    .toFile("public/images/og-share.png");
}

console.log("Brand assets generated.");
