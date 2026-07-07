import { useState } from "react";

function DeepfakeUploadPanel() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-bold mb-4">Upload Center (optional reference files)</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold mb-2">Face Image</label>
          <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
          <p className="text-gray-500 text-sm mt-1">{imageFile ? imageFile.name : "Not selected"}</p>
        </div>
        <div>
          <label className="block font-semibold mb-2">Voice Sample</label>
          <input type="file" accept=".wav,.mp3" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
          <p className="text-gray-500 text-sm mt-1">{audioFile ? audioFile.name : "Not selected"}</p>
        </div>
      </div>
    </div>
  );
}

export default DeepfakeUploadPanel;