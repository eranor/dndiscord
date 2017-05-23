import { List, ListItem, Subheader, Card, CardHeader, CardText, CardActions, RaisedButton } from 'material-ui';
import * as React from 'react';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';

export default class EncounterPanel extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context)
  }

  render() {
    const { encounter, onPlayClicked } = this.props;
    return (
      <Card style={{ margin: '18px 8px' }}>
        <Collapsible trigger={<CardHeader className="character-card-header waves-effect waves-ripple"
                                          title={<span>{encounter.name}</span>}
                                          children={<span
                                            style={{ float: 'right' }}>{encounter.status}</span>}/>}
                     transitionTime={100}>
          <CardText>
            <div className="row">
              <div className="col s12 m6">
                <List>
                  <Subheader>Characers</Subheader>
                  {encounter.characters && encounter.characters.map((item: any, index: any): any =>
                    <ListItem key={index}>
                      {item.name}
                    </ListItem>
                  )}
                </List>
              </div>
              <div className="col s12 m6">
                <List>
                  <Subheader>Rewards</Subheader>
                  {encounter.rewards && encounter.rewards.map((item: any, index: any): any =>
                    <ListItem key={index}>
                      {`${item.firstName} ${item.lastName}`}
                    </ListItem>
                  )}
                </List>
              </div>
            </div>
          </CardText>
          <CardActions>
            <Link to="/encounter"><RaisedButton onTouchTap={onPlayClicked} label="Play"/></Link>
            <RaisedButton label="Edit"/>
          </CardActions>
        </Collapsible>
      </Card>

    )
  }
}