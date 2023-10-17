import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const dogAPI = 'https://api.thedogapi.com/v1/images/search';
  const apiKey = 'live_g3s9htKNucTNbUxjq0Umn9VmKQ0x7Wo7BfKgDL0POvLv2HhBgTpLunUaWQoqEVrE';
  const [bannedList, setBannedList] = useState([]);
  
  const[pic, setPic] = useState(null);
  const[breed, setBreed] = useState('');
  const[weight, setWeight] = useState('');
  const[height, setHeight] = useState('');
  const[lifespan, setLifespan] = useState('');
  //prev
  //cur 

  const getNewData = async () => {
    const randURL = `${dogAPI}?has_breeds=1&api_key=${apiKey}`;
    try{
      const response = await fetch(randURL);
      const data = await response.json();

      const dogImage = data[0].url;
      const dogBreed = data[0].breeds[0].name;
      const dogWgt = data[0].breeds[0].weight.imperial;
      const dogHt = data[0].breeds[0].height.imperial;
      const dogLife = data[0].breeds[0].life_span;

      if (
        bannedList.includes(dogBreed) ||
        bannedList.includes(dogHt) ||
        bannedList.includes(dogWgt) ||
        bannedList.includes(dogLife)) {
          getNewData();
      } else {
        setWeight(dogWgt);
        setHeight(dogHt);
        setPic(dogImage);
        setBreed(dogBreed);
        setLifespan(dogLife);
        //prev dog?
      }
      } catch (error) {
         console.error('Error fetching data:', error);
      }
  }

    function addToBannedList(type, value){
      if(!bannedList.includes(type, value)){
        setBannedList([...bannedList, {type, value}]);
      }
    }

    const attributes = [
      {label: 'Breed', value: breed},{label: 'Weight', value: weight},{label:'Height', value: height},{label: 'Lifespan', value: lifespan}
    ];
 
  
  return (
    <div className='main_container'>
      <div className='header'>
        <h1>Paw-some Dogs! </h1>
        <h4>Discover the coolest dogs in the world!</h4>
        <p>Press Search! to Begin</p>
      </div>
      <div className='main_content'>
        <div className='picture'>
            <img className="dog-img" src={pic} alt="" />
            <div className='attributes'>
              {attributes.map((attribute) => (
                <button key={attribute.label} onClick={() => addToBannedList(attribute.label, attribute.value)}>
                  <p>{`${attribute.label}: ${attribute.value}`}</p>
                </button>
              ))}
            </div>
            <button className='search_button' onClick={getNewData}>Search!</button>
        </div>
        <div className='banned'>
        <div>
            <h2>Banned List</h2>
            {bannedList.map((item, index) => (
              <ul className='itemBan' key={index}>
                {item.type}:{item.value}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
