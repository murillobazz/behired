import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 180,
          fontWeight: 700,
          fontFamily: "ui-monospace, monospace",
          border: "24px solid #3a5a40",
          borderRadius: 64,
        }}
      >
        Be
      </div>
    ),
    {
      ...size,
    },
  );
}
