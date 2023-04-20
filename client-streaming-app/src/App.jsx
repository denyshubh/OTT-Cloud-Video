import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import VideoCatalog from './components/VideoCatalog';
import UserProfile from './components/UserProfile';
import Subscription from './components/Subscription';
import Watchlist from './components/Watchlist';
import VideoPlayer from './components/VideoPlayer';


function App({ signOut, user }) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <VideoCatalog user={user} />} />
          <Route exact path="/profile" render={() => <UserProfile user={user} />} />
          <Route exact path="/subscription" render={() => <Subscription user={user} />} />
          <Route exact path="/watchlist" render={() => <Watchlist user={user} />} />
          <Route exact path="/videos/:videoId" render={(props) => <VideoPlayer user={user} videoId={props.match.params.videoId} />} />
        </Switch>
      </Router>
    </div>
  );

}

export default withAuthenticator(App);