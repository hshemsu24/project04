import React, { useState, useEffect } from 'react';

const RandomImage = () => {
  const [imageData, setImageData] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=hHPegadDSfgg51OHezO5cFAeiy8OSxAECrz83ZyA
        `
      );
      const data = await response.json();
      setImageData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const handleBanAttribute = (attribute) => {
    setBannedAttributes([...bannedAttributes, attribute]);
  };

  const filteredAttributes = imageData
    ? Object.keys(imageData)
        .filter((key) => !bannedAttributes.includes(key))
        .map((key) => (
          <div key={key}>
            <strong>{key}:</strong> {imageData[key]}
            <button onClick={() => handleBanAttribute(key)}>Ban</button>
          </div>
        ))
    : null;

  return (
    <div>
      {imageData && <img src={imageData.url} alt={imageData.title} />}
      <div>{filteredAttributes}</div>
    </div>
  );
};

export default RandomImage;
