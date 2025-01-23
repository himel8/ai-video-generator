import { NextResponse } from "next/server";
const googleTTS = require("google-tts-api");

export async function POST(req) {
  const { text, id } = await req.json();
  const audio = googleTTS.getAllAudioUrls(text, {
    lang: "en",
    slow: false,
    host: "https://translate.google.com",
    splitPunct: ",.?",
  });
  return NextResponse.json({ result: audio });
}
