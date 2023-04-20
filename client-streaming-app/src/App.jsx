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
          <Route exact path="/" component={VideoCatalog} />
          <Route exact path="/profile" component={UserProfile(user)} />
          <Route exact path="/subscription" component={Subscription} />
          <Route exact path="/watchlist" component={Watchlist} />
          <Route exact path="/videos/:videoId" render={(props) => <VideoPlayer videoId={props.match.params.videoId} />} />
        </Switch>
      </Router>
    </div>
  );

}

export default withAuthenticator(App);