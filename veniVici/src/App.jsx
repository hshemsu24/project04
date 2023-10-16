import { useState } from 'react'
import './App.css'
import RandData from './components/RandData';
import BannedList from './components/BannedList';

function App() {
  const [apiData, setApiData] = useState(null);
  const [banList, setBanList] = useState([]);

  const apiKey = 'live_g3s9htKNucTNbUxjq0Umn9VmKQ0x7Wo7BfKgDL0POvLv2HhBgTpLunUaWQoqEVrE';

  const apiUrl = `https://api.thedogapi.com/v1/images/search?api_key=${apiKey}`;

  const handleRandomize = async () => {
    // Fetch data from your API (replace with your actual API call)
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('Network response was not ok');
      return;
    }
    const data = await response.json();
    console.log(data);
    setApiData(data);
  };

  const addToBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };


  return (
    
    <div className="App">
      <button onClick={handleRandomize}>Discover Something New</button>
      
      <RandData apiData={apiData} banList={banList} addToBanList={addToBanList} />
      <BannedList banList={banList} />
    </div>
    
  )
}

export default App
