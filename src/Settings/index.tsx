/**
 * Created by Ákos on 2017. 05. 03.
 */
import * as React from 'react';
import { Paper, Card, CardTitle, CardText } from 'material-ui';
import { Helmet } from 'react-helmet';

export default class Settings extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')!)
    }
  }

  public render(): any {
    return (
      <div>
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        <Paper zDepth={3} rounded={false}>
          <div className="container" style={{ paddingTop: '1rem' }}>
            <div className="row">
              <div className="col s12 m6 l6">
                <Card>
                  <CardTitle>
                    Account Settings
                  </CardTitle>
                  <CardText>

                  </CardText>
                </Card>
              </div>
              <div className="col s12 m6 l6">
                <Card>
                  <CardTitle>
                    Profile Information
                  </CardTitle>
                  <CardText>

                  </CardText>
                </Card>
              </div>
              <div className="col s12 m6 l6">
                <Card>
                  <CardTitle>
                    Player Settings
                  </CardTitle>
                  <CardText>

                  </CardText>
                </Card>
              </div>
              {this.state.user.accountType == 'DM' ?
                <div className="col s12 m6 l6">
                  <Card>
                    <CardTitle>
                      Dungeon Master Settings
                    </CardTitle>
                    <CardText>

                    </CardText>
                  </Card>
                </div> : ''}
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}