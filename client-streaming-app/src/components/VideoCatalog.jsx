import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';

export default function VideoCatalog({ user }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await API.get('OTTPlatformAPI', '/videos', {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
        },
      });
      setVideos(response.data);
    }
    fetchVideos();
  }, [user]);

  return (
    <div className="VideoCatalog">
      {videos.map((video) => (
        <div key={video.id}>
          <h2>{video.title}</h2>
          <p>{video.description}</p>
        </div>
      ))}
    </div>
  );
}