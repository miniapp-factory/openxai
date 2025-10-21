import React from "react";

export default function Rocket() {
  return (
    <div className="relative w-12 h-48">
      <style jsx>{`
        @keyframes launch {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-200%);
          }
        }
        .rocket {
          animation: launch 5s ease-in-out infinite;
        }
      `}</style>
      <svg
        className="rocket absolute bottom-0 left-1/2 transform -translate-x-1/2"
        width="24"
        height="48"
        viewBox="0 0 24 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0 L18 12 L12 24 L6 12 Z" fill="red" />
        <rect x="10" y="24" width="4" height="12" fill="gray" />
        <path d="M12 36 L14 42 L12 48 L10 42 Z" fill="orange" />
      </svg>
    </div>
  );
}
