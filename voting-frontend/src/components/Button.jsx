// src/components/Button.jsx
import React from "react";

export default function Button({ children, variant="primary", size, ...props }) {
  const cls = `btn ${variant === "primary" ? "btn--primary" : "btn--ghost"} ${size === "sm"? "btn--sm": ""}`;
  return <button className={cls} {...props}>{children}</button>;
}
