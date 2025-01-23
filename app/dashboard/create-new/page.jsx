"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ContentDuration from "./_components/ContentDuration";
import ContentStyle from "./_components/ContentStyle";
import ContentTopic from "./_components/ContentTopic";
import CustomLoading from "./_components/CustomLoading";

const CreateNew = () => {
  const [formData, setFormData] = useState({
    duration: "",
    topic: "",
    style: "",
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoScript, setVideoScript] = useState();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleInput = async () => {
    // await GetVideoScript();
    await GetAudioScript();
  };

  const GetVideoScript = async () => {
    const { duration, topic, style } = formData;

    // Validate required fields before making the request
    if (!duration || !topic || !style) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    const prompt = `
      Write a script to generate a ${duration} video on the topic: "${topic}" 
      story along with an AI image prompt in ${style} format for each scene. 
      Provide the result in JSON format with "imagePrompt" and "contentText" fields.
    `;
    console.log("Generated Prompt:", prompt);

    setLoading(true);
    setProgress(0);

    // Simulate progress increment
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(interval); // Stop increment at 90%
          return prev;
        }
        return prev + 5;
      });
    }, 300);

    try {
      const response = await axios.post("/api/get-video-script", {
        prompt,
      });

      setVideoScript(response.data.result.video_script);

      GetAudioScript(response.data.result.video_script);

      setProgress(100); // Set progress to 100% on success
    } catch (error) {
      console.error("Error fetching video script:", error);
    } finally {
      clearInterval(interval); // Ensure interval is cleared
      setLoading(false); // Reset loading state
    }
  };

  const GetAudioScript = async (audioTextData) => {
    let audioText = "i am good and i am very much good i love you";

    const id = uuidv4();
    // audioTextData?.forEach((item) => {

    //   audioText = audioText + item.contentText + " ";
    // });
    // console.log(audioText);
    // const audio = googleTTS.getAllAudioUrls(audioText, {
    //   lang: "en",
    //   slow: false,
    //   host: "https://translate.google.com",
    //   splitPunct: ",.?",
    // });
    // console.log(audio);
    setLoading(true);
    await axios
      .post("/api/generate-audio", {
        text: audioText,
        id: id,
      })
      .then((res) => {
        console.log(res.data);
      });
    setLoading(false);
  };

  return (
    <div className="md:px-20">
      <h2 className="text-4xl font-bold text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-5">
        {/* Components to capture user input */}
        <ContentTopic onUserSelect={onHandleInputChange} />
        <ContentStyle onUserSelect={onHandleInputChange} />
        <ContentDuration onUserSelect={onHandleInputChange} />

        {/* Conditional rendering for loading and progress */}
        {loading ? (
          <CustomLoading loading={loading} progress={progress} />
        ) : (
          <Button className="mt-6 w-full" onClick={handleInput}>
            Create Short Video
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateNew;
