import { API } from 'aws-amplify';
import { useState, useEffect } from 'react';

export default function Watchlist({ user }) {
  const [watchlist, setWatchlist] = useState([]);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    async function fetchWatchlist() {
      const watchlistData = await API.get('OTTPlatformAPI', `/users/${user.username}/watchlist`, {
        headers: {
          Authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
        },
      });
      setWatchlist(watchlistData);
    }
    fetchWatchlist();
  }, [user]);

  async function handleAddToWatchlist(videoId) {
    const updatedWatchlist = await API.post('OTTPlatformAPI', `/users/${user.username}/watchlist`, {
      body: { video_id: videoId },
      headers: {
        Authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
      },
    });
    setWatchlist(updatedWatchlist);
  }

  async function handleRemoveFromWatchlist(videoId) {
    const updatedWatchlist = await API.delete('OTTPlatformAPI', `/users/${user.username}/watchlist/${videoId}`, {
      headers: {
        Authorization: `Bearer ${user.signInUserSession.accessToken.jwtToken}`,
      },
    });
    setWatchlist(updatedWatchlist);
  }

  return (
    <div className="Watchlist">
      <h2>My Watchlist</h2>
      {watchlist.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <button onClick={() => handleRemoveFromWatchlist(video.id)}>Remove from Watchlist</button>
        </div>
      ))}
      <form onSubmit={(e) => {
          e.preventDefault();
          handleAddToWatchlist(formValues.video_id);
        }}>
        <label htmlFor="videoId">Add Video to Watchlist:</label>
        <input
          type="text"
          id="videoId"
          value={formValues.video_id}
          onChange={(event) => setFormValues({ ...formValues, video_id: event.target.value })}
        />
        <button type="submit">Add to Watchlist</button>
      </form>
    </div>
  );
}