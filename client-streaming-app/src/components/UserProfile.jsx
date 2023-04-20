import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';

export default function UserProfile({ user }) {
  const [userData, setUserData] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    setUserData(user);
    setFormValues(user);
  }, [user]);

  async function handleSave() {
    const updatedUser = await API.put('OTTPlatformAPI', `/users/${userData.id}`, {
      body: formValues
    });
    setUserData(updatedUser);
    setIsEditing(false);
  }
 
  return (
    <div className="UserProfile">
      {isEditing ? (
        <form onSubmit={handleSave}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={formValues.username}
            onChange={(event) => setFormValues({ ...formValues, username: event.target.value })}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formValues.email}
            onChange={(event) => setFormValues({ ...formValues, email: event.target.value })}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <h2>My Profile</h2>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
}
