import { AbsoluteFill, Audio, Img, Sequence, useVideoConfig } from "remotion";

const RemotionVideo = ({
  script,
  audioFileUrl,
  captions,
  setDurationInFrame,
}) => {
  const { fps } = useVideoConfig();

  const getDurationFrams = () => {
    setDurationInFrame((captions[captions?.length - 1]?.end / 1000) * fps);
    return (captions[captions?.length - 1]?.end / 1000) * fps;
  };
  console.log(audioFileUrl);
  return (
    <AbsoluteFill className="bg-black">
      {script?.map((item, index) => (
        <>
          <Sequence
            key={index}
            from={(index * getDurationFrams()) / script?.length}
            durationInFrames={getDurationFrams()}
          >
            <Img
              src={`/screens/${item.scene}.jpg`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Sequence>
        </>
      ))}
      {audioFileUrl && <Audio src={audioFileUrl} />}
    </AbsoluteFill>
  );
};

export default RemotionVideo;
