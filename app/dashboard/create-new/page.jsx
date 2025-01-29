"use client";

import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
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

  const [videoData, setVideoData] = useContext(VideoDataContext);
  const [videoScript, setVideoScript] = useState();
  const [audioFile, setAudioFile] = useState();
  const [captionText, setCaptionText] = useState();

  const { user } = useUser();

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const handleInput = async () => {
    await GetVideoScript();
  };

  const GetVideoScript = async () => {
    const { duration, topic, style } = formData;

    const prompt = `
      Write a script to generate a ${duration} video on the topic: "${topic}" 
      story along with an AI image prompt in ${style} format for each scene. 
      Provide the result in JSON format with "imagePrompt" and "contentText" fields.
    `;

    setLoading(true);

    try {
      const response = await axios.post("/api/get-video-script", {
        prompt,
      });
      if (response.data.result.video_script) {
        setVideoData((prev) => ({
          ...prev,
          videoScript: response.data.result.video_script,
        }));
        setVideoScript(response.data.result.video_script);
        await GetAudioScript(response.data.result.video_script);
      }
    } catch (error) {
      console.error("Error fetching video script:", error);
    }
  };

  const GetAudioScript = async (audioTextData) => {
    let audioText = "";
    const id = uuidv4();
    audioTextData?.forEach((item) => {
      audioText = audioText + item.contentText + " ";
    });
    console.log(audioText);
    const resp = await axios.post("/api/generate-audio", {
      text: audioText,
      id: id,
    });

    if (resp.data.result) {
      setVideoData((prev) => ({
        ...prev,
        audioUrl: resp.data.result[0].url,
      }));
      setAudioFile(resp.data.result[0].url);
      await GenerateAudioCaption(resp.data.result[0].url);
    }
  };

  const GenerateAudioCaption = async (audioUrl) => {
    const res = await axios.post("/api/generate-caption", { url: audioUrl });

    if (res.data.result) {
      setVideoData((prev) => ({
        ...prev,
        captionText: res.data.result,
      }));
      setCaptionText(res.data.result[0].url);
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    console.log(videoData);
    if (Object?.keys(videoData)?.length == 3) {
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);
    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioFileUrl: videoData?.audioUrl,
        captions: videoData?.captionText,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ id: VideoData?.id });

    console.log(result);
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
          <CustomLoading loading={loading} />
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
