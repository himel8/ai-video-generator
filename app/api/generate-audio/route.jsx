import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
const googleTTS = require("google-tts-api");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

// 🔹 Initialize Cloudinary
cloudinary.config({
  cloud_name: "dgbkpis1h",
  api_key: "615611428349242",
  api_secret: "FeBFS3NfLah3uuZxgKhJbBjvWZY",
});

// 🔹 Function to download a file
async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    https
      .get(url, (res) => {
        if (res.statusCode !== 200) {
          reject(
            new Error(
              `Failed to download: ${res.statusCode} - ${res.statusMessage}`
            )
          );
          return;
        }

        res.pipe(file);

        file.on("finish", () => file.close(() => resolve(dest)));
        file.on("error", (err) => {
          fs.unlink(dest, () => reject(err)); // 🔹 Delete the file if an error occurs
        });
      })
      .on("error", reject);
  });
}

// 🔹 Function to upload file to Cloudinary
async function uploadToCloudinary(filePath) {
  console.log("📂 Uploading:", filePath);
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "video", // 🔹 Required for audio files
    });

    console.log("✅ File uploaded to Cloudinary:", response.url);

    // 🔹 Delete the local file after successful upload
    await unlinkAsync(filePath);
    console.log("🗑️ Local file deleted.");

    return response;
  } catch (error) {
    console.error("❌ Error uploading file to Cloudinary:", error);
    throw error;
  }
}

// 🔹 Next.js API route to handle POST request
export async function POST(req) {
  try {
    const { text, id } = await req.json();

    if (!text || !id) {
      return NextResponse.json(
        { error: "Text and ID are required!" },
        { status: 400 }
      );
    }

    const url = googleTTS.getAudioUrl(text);
    const publicAudioPath = path.join(process.cwd(), "public", "audio");

    // 🔹 Ensure the directory exists
    if (!fs.existsSync(publicAudioPath)) {
      fs.mkdirSync(publicAudioPath, { recursive: true });
    }

    const fileName = `${id}.mp3`;
    const dest = path.join(publicAudioPath, fileName);

    // 🔹 Download the file
    await downloadFile(url, dest);

    // 🔹 Upload to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(dest);

    // 🔹 Get alternative audio URLs
    const audioUrls = googleTTS.getAllAudioUrls(text, {
      lang: "en",
      slow: false,
      host: "https://translate.google.com",
      splitPunct: ",.?",
    });

    return NextResponse.json({
      success: true,
      cloudinaryUrl: cloudinaryResponse.url, // 🔹 Return Cloudinary URL
      result: audioUrls,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
