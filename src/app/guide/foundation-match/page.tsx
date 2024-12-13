"use client";

import { useState } from "react";

export default function FoundationMatch() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [result, setResult] = useState<{ red: number; green: number; blue: number; ita?: number } | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("white"); // Default background color

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) setUploadedFile(file);
  };

  const handleSubmitPhoto = async () => {
    if (!uploadedFile) {
      alert("Please upload a photo first!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("photo", uploadedFile);

    try {
      const response = await fetch("/api/process-photo", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          setResult(data);

          // Convert RGB to CSS-compatible format and update background color
          const rgbColor = `rgb(${Math.round(data.red)}, ${Math.round(data.green)}, ${Math.round(data.blue)})`;
          setBackgroundColor(rgbColor);
        }
      } else {
        alert("Failed to process the photo.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor }} // Apply dynamic background color
    >
      <h1 className="text-xl font-semibold mb-4">Upload Your Photo</h1>
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="file-input"
        />
      </div>
      <button
        onClick={handleSubmitPhoto}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Submit Photo"}
      </button>
      {result && (
        <div className="mt-6 text-center">
          <h2 className="text-lg font-semibold">Processing Result</h2>
          <p>Red: {Math.round(result.red)}</p>
          <p>Green: {Math.round(result.green)}</p>
          <p>Blue: {Math.round(result.blue)}</p>
          <p>ITA: {result.ita?.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
