// src/utils/Utils.ts
import path from "path";
import fs from "fs";
import { ROOT_DIR } from "../constant";

export class Utils {
  static convertImageToBase64(imageName: string | undefined): string {
    if (!imageName) {
      throw new Error("Image name must be provided");
    }

    const imagePath = path.resolve(ROOT_DIR, "public", imageName);
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString("base64");
  }
}
