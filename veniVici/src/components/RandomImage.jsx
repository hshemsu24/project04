import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomImage = () => {
  const [imageData, setImageData] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const [newImageRequested, setNewImageRequested] = useState(false);

  const fetchRandomImage = async () => {
    try {
      console.log('Fetching new image...'); // Add this line

      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=hHPegadDSfgg51OHezO5cFAeiy8OSxAECrz83ZyA
        `
      );
      const data = response.data;
      console.log('Fetched new image data:', data); // Add this line
      const randomDate = generateRandomDate();

      setImageData(data);
      setNewImageRequested(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const generateRandomDate = () => {
    const startDate = new Date('1995-06-16').getTime();
    const endDate = new Date().getTime();
    const randomTime = Math.random() * (endDate - startDate) + startDate;
    const randomDate = new Date(randomTime).toISOString().split('T')[0];
    return randomDate;
  };

  useEffect(() => {
    if (newImageRequested) {
      fetchRandomImage();
    }
  }, [newImageRequested]);

  const handleBanAttribute = (attribute) => {

    setBannedAttributes([...bannedAttributes, attribute]);
  };

  const handleNewImageRequest = () => {
    console.log('New image requested...'); // Add this line

    setNewImageRequested(true);
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
    <div className="random-image-container">
      <div className="image-container">
        {imageData && <img src={imageData.url} alt={imageData.title} />}
        <button onClick={handleNewImageRequest}>Get New Image</button>
      </div>
      <div className="banned-list">
        <h2>Banned List</h2>
        <ul>
          {bannedAttributes.map((attribute) => (
            <li key={attribute}>{attribute}</li>
          ))}
        </ul>
      </div>
      <div className="attributes-list">{filteredAttributes}</div>
    </div>
  );
};

export default RandomImage;
