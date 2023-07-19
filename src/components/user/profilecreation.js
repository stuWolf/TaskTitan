import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    profilePicture: null
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setUser({
      ...user,
      profilePicture: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(user).forEach(key => formData.append(key, user[key]));

    try {
      const response = await axios.post('/api/users', formData);
      console.log(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(error);
      setError(error.response.data.error || 'An error occurred');
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
        <input type="file" name="profilePicture" onChange={handleFileChange} />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
