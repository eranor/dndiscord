import * as React from 'react';
import { Paper } from 'material-ui';

const Home = () => (
  <Paper zDepth={3} rounded={false}>
    <div className="container" style={{ paddingTop: '1rem' }}>
      <h1>
        Welcome to D&amp;Discord,
      </h1>
      <h3>your friendly neighbourhood D&amp;D manager</h3>
      <main>
        <p>This is an application that helps manage your D&amp;D sessions, with enabling to follow the fights trough
          an intuitive interface, or with connecting a bot to your Discord channel that will with the help of some
          commmands, can relay information to the app and make your DM's life much more easier.</p>
        <p>This application mainly focuses on the combat management, like initiative rolls, follow who's on the row or
          damage dealt.</p>
      </main>
    </div>
  </Paper>
);

export default Home;
