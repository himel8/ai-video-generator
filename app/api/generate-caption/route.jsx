// npm install assemblyai

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = new AssemblyAI({
    apiKey: process.env.CAPTION_API_KEY,
  });
  const { url } = await req.json();

  const config = {
    audio_url: url,
  };

  const transcript = await client.transcripts.transcribe(config);
  // console.log(transcript);

  return NextResponse.json({ result: transcript.words });
}
