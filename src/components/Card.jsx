import React from "react";
import "../App.css";

export default function Card({ src, title }) {
  return (
    <div className="product">
      <img className=".image" src={src} alt={title} />
      <p>{title}</p>
    </div>
  );
}
