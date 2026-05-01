import React from "react";

export default function Loader({ message = "Loading..." }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      gap: 12
    }}>

      {/* Spinner */}
      <div style={{
        width: 36,
        height: 36,
        border: "3px solid var(--color-border-tertiary)",
        borderTop: "3px solid var(--primary, #4f46e5)",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite"
      }} />

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="text-muted" style={{ fontSize: 14 }}>
        {message}
      </div>

    </div>
  );
}