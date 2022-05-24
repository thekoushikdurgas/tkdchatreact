import React from "react";
import "./loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <h1>Cooking in progress..</h1>
      <div className="cooking">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="flex-container">
            <div className="unit">
            <div className="heart">
                <div className="heart-piece-0"></div>
                <div className="heart-piece-1"></div>
                <div className="heart-piece-2"></div>
                <div className="heart-piece-3"></div>
                <div className="heart-piece-4"></div>
                <div className="heart-piece-5"></div>
                <div className="heart-piece-6"></div>
                <div className="heart-piece-7"></div>
                <div className="heart-piece-8"></div>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
