import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

    const input = { prompt: prompt, height: 1280, width: 1024, num_outputs: 1 };

    const output = await replicate.run(
      "ai-forever/kandinsky-2:3c6374e7a9a17e01afe306a5218cc67de55b19ea536466d6ea2602cfecea40a9",
      { input }
    );

    console.log(output);
    return NextResponse.json({ result: output });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ "Error:": error });
  }
}
