import { Paper, CardText, Card, CardHeader } from 'material-ui';
import * as React from 'react';
import Collapsible from 'react-collapsible';

export default class CharacterPanel extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context)
  }

  render() {
    const { character } = this.props;
    return (
      <Card style={{ margin: '18px 8px' }}>
        <Collapsible trigger={
          <CardHeader className="character-card-header waves-effect waves-ripple"
                      title={<span>{`${character.firstName} ${character.lastName}`}</span>}
                      children={<span style={{ float: 'right' }}>{character.type}</span>}/>}
                     transitionTime={100}>
          <CardText>
            <div className="row">
              <Paper zDepth={2}>
                <div className="col s12 m4">Sex: {character.sex}</div>
              </Paper>
              <Paper zDepth={2}>
                <div className="col s12 m4">Class: {character.class}</div>
              </Paper>
              <Paper zDepth={2}>
                <div className="col s12 m4">Speciality: {character.subclass}</div>
              </Paper>
              <Paper zDepth={2}>
                <div className="col s12 m4">Age: {character.age}</div>
              </Paper>
              <Paper zDepth={2}>
                <div className="col s12 m4">Height: {character.height}</div>
              </Paper>
              <Paper zDepth={2}>
                <div className="col s12 m4">Race: {character.race}</div>
              </Paper>
              <Paper zDepth={2}>
                <div className="col s12 m4">Subrace: {character.subrace}</div>
              </Paper>
              <Paper zDepth={2}>
                <div className="col s12 m4">Background: {character.background}</div>
              </Paper>
            </div>
          </CardText>
        </Collapsible>
      </Card>

    )
  }
}