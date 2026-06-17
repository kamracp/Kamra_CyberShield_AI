
import { useState } from "react";

function DeepfakeUploadPanel() {
  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [audioFile, setAudioFile] =
    useState<File | null>(null);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "8px",
        marginTop: "20px",
      }}
    >
      <h2>Deepfake Upload Center</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Upload Face Image
        </label>

        <br />

        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) =>
            setImageFile(
              e.target.files?.[0] || null
            )
          }
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          Upload Voice Sample
        </label>

        <br />

        <input
          type="file"
          accept=".wav,.mp3"
          onChange={(e) =>
            setAudioFile(
              e.target.files?.[0] || null
            )
          }
        />
      </div>

      <div>
        <p>
          Image:
          {" "}
          {imageFile
            ? imageFile.name
            : "Not Selected"}
        </p>

        <p>
          Audio:
          {" "}
          {audioFile
            ? audioFile.name
            : "Not Selected"}
        </p>
      </div>
    </div>
  );
}

export default DeepfakeUploadPanel;

