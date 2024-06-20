type PlayStyle = "auto" | "autoLoop";

interface Props {
  playType: PlayStyle;
  source: string;
}

export const Video = (props: Props) => {
    const { playType, source } = props;

    const isLoop = playType == "autoLoop";

  return (
    <video
      src={source}
      autoPlay
      loop={isLoop}
      muted
      playsInline
      style={{
        width: "100%",
        height: "auto",
        maxWidth: "600px", // 動画の最大幅を設定
      }}
    />
  );

};
