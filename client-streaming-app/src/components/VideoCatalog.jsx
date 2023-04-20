import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';
import Error from './Error';

export default function VideoCatalog({ user }) {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await API.get('OTTPlatformAPI', '/videos', {
          headers: {
            Authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
          },
        });
      setVideos(response.data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchVideos();
  }, [user]);
  
  
  return (
    <div className="VideoCatalog">
      {error && <Error message={error} />}:
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
}