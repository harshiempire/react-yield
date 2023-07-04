// Import the necessary libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MongoClient } from "mongodb";

// Define the state variables
const [birthdays, setBirthdays] = useState([]);
const [username, setUsername] = useState("");

// Define the function to fetch the birthdays from the database
const fetchBirthdays = async () => {
  const client = new MongoClient("mongodb://localhost:27017/birthdays");
  try {
    await client.connect();
    const db = client.db("birthdays");
    const collection = db.collection("birthdays");
    const results = await collection.find().toArray();
    setBirthdays(results);
  } finally {
    client.close();
  }
};

// Define the function to create a new account
const createAccount = async (username) => {
  const client = new MongoClient("mongodb://localhost:27017/birthdays");
  try {
    await client.connect();
    const db = client.db("birthdays");
    const collection = db.collection("users");
    const result = await collection.insertOne({ username });
    setUsername(username);
  } finally {
    client.close();
  }
};

// Define the function to add a new birthday
const addBirthday = async (name, date) => {
  const client = new MongoClient("mongodb://localhost:27017/birthdays");
  try {
    await client.connect();
    const db = client.db("birthdays");
    const collection = db.collection("birthdays");
    const result = await collection.insertOne({ name, date });
    fetchBirthdays();
  } finally {
    client.close();
  }
};

// Define the function to remove a birthday
const removeBirthday = async (id) => {
  const client = new MongoClient("mongodb://localhost:27017/birthdays");
  try {
    await client.connect();
    const db = client.db("birthdays");
    const collection = db.collection("birthdays");
    await collection.deleteOne({ _id: id });
    fetchBirthdays();
  } finally {
    client.close();
  }
};

// Define the component
const BirthdayTracker = () => {
  // UseEffect to fetch the birthdays when the component mounts
  useEffect(() => {
    fetchBirthdays();
  }, []);

  // Render the list of birthdays
  return (
    <div>
      <h1>Birthday Tracker</h1>
      <ul>
        {birthdays.map((birthday) => (
          <li key={birthday._id}>
            {birthday.name} - {birthday.date}
            <button onClick={() => removeBirthday(birthday._id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Add a new birthday</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBirthday(e.target.name.value, e.target.date.value);
        }}
      >
        <input type="text" name="name" placeholder="Name" />
        <input type="date" name="date" placeholder="Date" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

// Export the component
export default BirthdayTracker;
