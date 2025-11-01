// src/components/Card.jsx
import React from "react";

export default function Card({ title, subtitle, children, actions }) {
  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">{title}</div>
          {subtitle && <div className="card-sub">{subtitle}</div>}
        </div>
        {actions}
      </div>

      <div>{children}</div>
    </div>
  );
}