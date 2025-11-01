// src/components/Layout.jsx
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <header style={{ padding: "10px 24px" }}>
        <div className="container app-header">
          <a className="brand" href="/">
            <div className="logo" aria-hidden>🗳️</div>
            <div>
              <h1>Voting App</h1>
              <div className="text-muted" style={{ fontSize: 12 }}>Secure · Simple · Transparent</div>
            </div>
          </a>
        </div>
      </header>

      <main className="container" role="main">
        <div className="fade-slide-enter">
          {children}
        </div>
      </main>

      <footer className="container app-footer">
        <div className="card" style={{ padding: 12 }}>
          <div className="muted">© {new Date().getFullYear()} Voting App — Built by 'kalyanchakraborty@gmail.com'</div>
        </div>
      </footer>
    </>
  );
}
