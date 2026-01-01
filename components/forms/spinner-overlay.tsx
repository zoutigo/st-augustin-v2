import React from "react";
import { ClipLoader } from "react-spinners";

interface SpinnerOverlayProps {
  visible: boolean;
}

export const SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 10,
      }}
    >
      <ClipLoader color="#0070f3" size={50} />
    </div>
  );
};
