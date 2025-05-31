import React, { useState } from 'react';
import { urlService } from './services/urlService';

function EditUrlForm({ id, originalUrlInit, expiresAtInit, onSuccess }) {
  const [originalUrl, setOriginalUrl] = useState(originalUrlInit);
  const [expiresAt, setExpiresAt] = useState(expiresAtInit);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await urlService.editUrl(id, originalUrl, expiresAt);
      alert('URL updated successfully!');
      if (onSuccess) onSuccess(); 
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Original URL"
      />
      <input
        type="datetime-local"
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
        placeholder="Expires At"
      />
      <button type="submit">Update</button>
    </form>
  );
}
