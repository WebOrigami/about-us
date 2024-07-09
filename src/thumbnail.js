import sharp from "sharp";

export default function thumbnail(imageBuffer) {
  return imageBuffer
    ? sharp(imageBuffer).resize({ width: 200 }).toBuffer()
    : undefined;
}
