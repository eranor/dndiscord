import * as React from 'react';
import { Paper, List, ListItem, Subheader } from 'material-ui';
import { Helmet } from 'react-helmet';

export default class Encounter extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = JSON.parse(localStorage.getItem('data')!);
  }

  render() {

    return (
      <div>
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        <Paper zDepth={3} rounded={false}>
          <List>
            <Subheader>{this.state.encounters[0].name}</Subheader>
            {this.state.encounters[0].characters.map((item: any, index: any) =>
              <ListItem key={index}>
                {index} - {`${item.firstName} ${item.lastName}`} - Initiative {item.initiativeValue}
              </ListItem>
            )}
          </List>
        </Paper>
      </div>
    )
  }
}