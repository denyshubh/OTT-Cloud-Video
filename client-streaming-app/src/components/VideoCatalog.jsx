import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';

export default function VideoCatalog() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      const response = await API.get('OTTPlatformAPI', '/videos');
      setVideos(response.data);
    }
    fetchVideos();
  }, []);

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
