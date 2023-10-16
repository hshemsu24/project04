import React, { useEffect } from 'react';
import Axios from 'axios'; // Import Axios

function RandData({ apiData, banList, addToBanList }) {
  // Define a function to fetch random data
  const fetchRandomData = async () => {
    try {
      const response = await Axios.get('https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY'); // Replace with your API key
      const data = response.data[0]; // Get the first element from the response data

      // Set the fetched data to the apiData state
      setApiData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Call the fetchRandomData function when the component mounts
  useEffect(() => {
    fetchRandomData();
  }, []);

  return (
    <div className="random-data">
      {apiData && (
        <div>
          <h2>Attributes:</h2>
          <ul>
            {Object.keys(apiData).map((key) => (
              !banList.includes(key) && (
                <li key={key}>
                  {key}: {apiData[key]}
                  <button onClick={() => addToBanList(key)}>Ban</button>
                </li>
              )
            )}
          </ul>
        </div>
      )}

      {apiData && apiData.url && (
        <div>
          <h2>Image:</h2>
          <img src={apiData.url} alt="API Image" />
        </div>
      }
    </div>
  );
}

export default RandData;
