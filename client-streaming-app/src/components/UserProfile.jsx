import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';

export default function UserProfile(loggedInUser) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const userData = await API.get('OTTPlatformAPI', `/users/${loggedInUser.username}`);
      setUser(userData);
      setFormValues(userData);
    }
    fetchUser();
  }, []);
 
  async function handleSave() {
    const updatedUser = await API.put('OTTPlatformAPI', `/users/${user.id}`, {
      body: formValues
    });
    setUser(updatedUser);
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
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </>
      )}
    </div>
  );
}