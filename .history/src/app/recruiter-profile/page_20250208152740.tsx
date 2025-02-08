// src/app/recruiter-profile/page.jsx
"use client";

import { useState } from "react";

export default function RecruiterProfilePage() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [voiceFile, setVoiceFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !imageFile || !voiceFile) {
      alert("Please fill in your name and upload both an image and a voice sample.");
      return;
    }
    setLoading(true);
    // Create a FormData instance for file uploads
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("image", imageFile);
    formData.append("voice", voiceFile);

    // Call our API to create the profile (this endpoint should handle file uploads and voice cloning)
    const res = await fetch("/api/recruiterProfile", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      setProfile(data);
      alert("Profile created successfully!");
    } else {
      alert("Error creating profile.");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Create Your Recruiter Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bio:</label>
          <br />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="A short bio..."
          />
        </div>
        <div>
          <label>Upload Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>Upload Voice Sample:</label>
          <br />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setVoiceFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating Profile..." : "Create Profile"}
        </button>
      </form>

      {profile && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Profile Created:</h2>
          <p>Name: {profile.name}</p>
          <p>Bio: {profile.bio}</p>
          <img
            src={profile.imageUrl}
            alt="Recruiter"
            style={{ width: "200px", borderRadius: "50%" }}
          />
          <p>Cloned Voice ID: {profile.voiceCloneId}</p>
        </div>
      )}
    </div>
  );
}
