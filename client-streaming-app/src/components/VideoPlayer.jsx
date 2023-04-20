import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import ReactPlayer from 'react-player';

export default function VideoPlayer({ videoId }) {
  const [video, setVideo] = useState({});

  useEffect(() => {
    async function fetchVideo() {
      const response = await API.get('OTTPlatformAPI', `/videos/${videoId}`);
      setVideo(response);
    }
    fetchVideo();
  }, [videoId]);

  return (
    <div className="VideoPlayer">
      <h2>{video.title}</h2>
      <ReactPlayer url={video.url} controls={true} />
    </div>
  );
}
