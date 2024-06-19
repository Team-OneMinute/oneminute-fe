import { Box } from "@mui/material";
export function WelcomeLoading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "black",
        zIndex: 1300,
      }}
    >
      <div style={{ color: "white", marginBottom: "32px", fontSize: "5rem" }}>
        OneMinute
      </div>
      <video
        src="/Loading.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "600px", // 動画の最大幅を設定
        }}
      />
    </Box>
  );
}
