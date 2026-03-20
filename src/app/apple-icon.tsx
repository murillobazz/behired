import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f4ef",
          color: "#3a5a40",
          fontSize: 88,
          fontWeight: 700,
          fontFamily: "ui-monospace, monospace",
          border: "10px solid #3a5a40",
          borderRadius: 28,
        }}
      >
        B
      </div>
    ),
    {
      ...size,
    },
  );
}
