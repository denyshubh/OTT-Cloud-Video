import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import VideoCatalog from './components/VideoCatalog';
import UserProfile from './components/UserProfile';
import Subscription from './components/Subscription';
import Watchlist from './components/Watchlist';
import VideoPlayer from './components/VideoPlayer';

function App({ signOut, user }) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VideoCatalog user={user} />} />
          <Route path="/profile" element={<UserProfile user={user} />} />
          <Route path="/subscription" element={<Subscription user={user} />} />
          <Route path="/watchlist" element={<Watchlist user={user} />} />
          <Route path="/videos/:videoId" element={<VideoPlayer user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default withAuthenticator(App);
