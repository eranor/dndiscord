/**
 * Created by Ákos on 2017. 05. 03.
 */
import * as React from 'react';
import {
  Paper, Tabs, Tab, CardHeader, Card, CardText, ListItem, List, FontIcon, Toolbar, ToolbarGroup,
  ToolbarTitle, ToolbarSeparator, AutoComplete
}from'material-ui';

import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';

import Collapsible  from 'react-collapsible';

class Dashboard extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      createEncounter: false,
      value: 1,
      characters: [
        {
          name: 'Rehalin Johalar', sex: 'Male', age: 33, height: '5\'7"', race: 'Genasi', subrace: 'Air Genasi',
          class: 'Monk', subclass: 'Way of the Sun Soul', level: 11, background: 'Traveler', type: 'Enemy'
        },
        {
          name: 'Fakelai Lanetam', sex: 'Male', age: 169, height: '5\'5"', race: 'Dwarf',
          subrace: 'Gray Dwarf (Duerger)',
          class: 'Warlock', subclass: 'The Fiend', level: 17, background: 'Faction Agent', type: 'Player'
        },
        {
          name: 'Dasalid Elbaral', sex: 'Female', age: 30, height: '6\'1', race: 'Half-Orc', subrace: '',
          class: 'Barbarian', subclass: 'Path of the Totem Warrior', level: 13, background: 'Clan Crafter',
          type: 'Player'
        },
        {
          name: 'Jomonen Bedellac', sex: 'Female', age: 25, height: '5\'6"', race: 'Half-Elf',
          subrace: 'Gray Dwarf (Duerger)',
          class: 'Artificer', subclass: 'Alchemist', level: 16, background: 'Charlatan', type: 'Player'
        }
      ],
      encounters: [
        {
          name: 'Encounter 1',
          status: 'Visible',
          createdBy: {
            username: 'TestDM_1'
          },
          characters: {}
        }
      ],
      dataSource: ['test', 'test1']
    }
  }

  onCreateNewEncounter = () => {
    this.setState({ 'createEncounter': true });
    this.setState({ 'value': 3 });
  };

  handleChange = (value: number) => {
    this.setState({ 'value': value });
  };

  public render(): any {

    return (
      <div>
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        <Paper zDepth={3} rounded={false}>
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Characters" value={1}>
              <div className="row" style={{ 'marginBottom': 0 }}>
                <div className="col s12">
                  <Toolbar>
                    <ToolbarGroup firstChild={true}>
                      <AutoComplete hintText="Type anything" dataSource={this.state.dataSource}/>
                    </ToolbarGroup>
                    <ToolbarGroup>
                      <ToolbarSeparator />
                      <ToolbarTitle text="Options"/>
                      <FontIcon className="material-icons">sort</FontIcon>
                    </ToolbarGroup>
                  </Toolbar>
                </div>
                <div className="col m4 push-m8 s12">
                  <List>
                    <ListItem primaryText="Create New Character"
                              leftIcon={<FontIcon className="material-icons">add_box</FontIcon>}/>
                  </List>
                </div>
                <div className="col m8 pull-m4 s12">
                  {this.state.characters.map((value: any, index: any) => {
                    return <Card key={index} style={{ margin: '18px 8px' }}>
                      <Collapsible trigger={<CardHeader className="character-card-header waves-effect waves-ripple"
                                                        title={<span>{value.name}</span>}
                                                        children={<span
                                                          style={{ float: 'right' }}>{value.type}</span>}/>}
                                   transitionTime={100}>
                        <CardText>
                          <div className="row">
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Sex: {value.sex}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Class: {value.class}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Speciality: {value.subclass}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Age: {value.age}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Height: {value.height}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Race: {value.race}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Subrace: {value.subrace}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Background: {value.background}</div>
                            </Paper>
                          </div>
                        </CardText>
                      </Collapsible>
                    </Card>
                  })}
                </div>
              </div>
            </Tab>
            <Tab label="Encounters" value={2}>
              <div className="row" style={{ 'marginBottom': 0 }}>
                <div className="col m4 push-m8 s12">
                  <List>
                    <ListItem primaryText="Create New Encounter"
                              leftIcon={<FontIcon className="material-icons">add_box</FontIcon>}
                              onTouchTap={this.onCreateNewEncounter}/>
                  </List>
                </div>
                <div className="col m8 pull-m4 s12">
                  {this.state.characters.map((value: any, index: any) => {
                    return <Card key={index} style={{ margin: '18px 8px' }}>
                      <Collapsible trigger={<CardHeader className="character-card-header waves-effect waves-ripple"
                                                        title={<span>{value.name}</span>}
                                                        children={<span
                                                          style={{ float: 'right' }}>{value.type}</span>}/>}
                                   transitionTime={100}>
                        <CardText>
                          <div className="row">
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Sex: {value.sex}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Class: {value.class}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Speciality: {value.subclass}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Age: {value.age}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Height: {value.height}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Race: {value.race}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Subrace: {value.subrace}</div>
                            </Paper>
                            <Paper zDepth={2}>
                              <div className="col s12 m4">Background: {value.background}</div>
                            </Paper>
                          </div>
                        </CardText>
                      </Collapsible>
                    </Card>
                  })}
                </div>
              </div>
            </Tab>
            {this.state.createEncounter ?
              <Tab label="New Encounter" value={3}>

              </Tab>
              : ''}
          </Tabs>
        </Paper>
      </div>
    )
  }
}

export default withRouter(Dashboard);