import React, { useState, useEffect } from "react";
import data from './assets/celebrities.json'
import axios from "axios";

function CelebList() {
  const [inputData, setInputData] = useState({
    name: "",
    age: "",
    gender: "",
    country: "",
    description:""
  });
  const [editMode, setEditMode] = useState(false);
  const [dropdownData, setDropdownData] = useState({
    gender: [],
    country: []
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
    setInputData(data);
    const gender = ["Male", "Female", "Other"];
    const country = ["India", "USA", "UK", "Other"];
    setDropdownData({ gender, country });
  }, []);

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = e => {
    setInputData({ ...inputData, [e.target.name]: e.target.value })
  };

  const handleSave = () => {
    setEditMode(false);
    localStorage.setItem("data", JSON.stringify(inputData));
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            name="name"
            value={inputData.name}
            onChange={handleChange}
          />
          <br />
          <input
            type="text"
            name="age"
            value={inputData.age}
            onChange={handleChange}
          />
          <br />
          <select
            name="gender"
            value={inputData.gender}
            onChange={handleChange}
          >
            {dropdownData.gender.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <br />
          <select
            name="country"
            value={inputData.country}
            onChange={handleChange}
          >
            {dropdownData.country.map(item => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <br />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Name: {inputData.name}</p>
          <p>Age: {inputData.age}</p>
          <p>Gender: {inputData.gender}</p>
          <p>Country: {inputData.country}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default CelebList;
