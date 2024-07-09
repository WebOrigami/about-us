import sharp from "sharp";

export default function thumbnail(buffer) {
  return buffer instanceof Uint8Array || buffer instanceof ArrayBuffer
    ? sharp(buffer).rotate().resize({ width: 200 }).toBuffer()
    : undefined;
}
