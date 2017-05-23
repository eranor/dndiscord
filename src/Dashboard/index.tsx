/**
 * Created by Ákos on 2017. 05. 03.
 */
import * as React from 'react';
import {
  Paper, Tabs, Tab, ListItem, List, FontIcon, Toolbar, ToolbarGroup,
  ToolbarTitle, ToolbarSeparator, AutoComplete, RaisedButton
}from'material-ui';

import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';

import CharacterPanel from './CharacterPanel';
import EncounterPanel from './EncounterPanel';
import NewEncounterFrom from './NewEncounterFrom';
import NewCharacterForm from './NewCharacterForm';
//import { graphql } from 'react-apollo';
//import ListCharactersQuery from './queries/character/ListCharactersQuery';

class Dashboard extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')!),
      createEncounter: false,
      createCharacter: false,
      value: 1,
      characters: [
        {
          firstName: 'Rehalin', lastName: 'Johalar', sex: 'Male', age: 33, height: '5\'7"', race: 'Genasi',
          subrace: 'Air Genasi',
          class: 'Monk', subclass: 'Way of the Sun Soul', level: 11, background: 'Traveler', type: 'Enemy'
        },
        {
          firstName: 'Fakelai', lastName: 'Lanetam', sex: 'Male', age: 169, height: '5\'5"', race: 'Dwarf',
          subrace: 'Gray Dwarf (Duerger)',
          class: 'Warlock', subclass: 'The Fiend', level: 17, background: 'Faction Agent', type: 'Player'
        },
        {
          firstName: 'Dasalid', lastName: 'Elbaral', sex: 'Female', age: 30, height: '6\'1', race: 'Half-Orc',
          subrace: '',
          class: 'Barbarian', subclass: 'Path of the Totem Warrior', level: 13, background: 'Clan Crafter',
          type: 'Player'
        },
        {
          firstName: 'Jomonen', lastName: 'Bedellac', sex: 'Female', age: 25, height: '5\'6"', race: 'Half-Elf',
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
          characters: [{
            firstName: 'Fakelai', lastName: 'Lanetam', sex: 'Male', age: 169, height: '5\'5"', race: 'Dwarf',
            subrace: 'Gray Dwarf (Duerger)',initiativeValue:17,
            class: 'Warlock', subclass: 'The Fiend', level: 17, background: 'Faction Agent', type: 'Player'
          },
            {
              firstName: 'Dasalid', lastName: 'Elbaral', sex: 'Female', age: 30, height: '6\'1', race: 'Half-Orc',
              subrace: '',initiativeValue:9,
              class: 'Barbarian', subclass: 'Path of the Totem Warrior', level: 13, background: 'Clan Crafter',
              type: 'Enemy'
            }],
          rewards: [{ name: 'Random Reward 1' }]
        }
      ],
      rewards: [
        { name: 'Random Reward 1' },
        { name: 'Random Reward 2' },
        { name: 'Random Reward 3' }],
      dataSource: ['test', 'test1']
    }
  }

  onCreateNewEncounter = () => {
    this.setState({ 'createEncounter': true });
    this.setState({ 'value': 3 });
  };
  onCreateNewCharacter = () => {
    this.setState({ 'createCharacter': true });
    this.setState({ 'value': 4 });
  };

  onCancelNewEncounter = () => {
    this.setState({ 'createEncounter': false });
    this.setState({ 'value': 2 });
  };
  onCancelNewCharacter = () => {
    this.setState({ 'createCharacter': false });
    this.setState({ 'value': 1 });
  };

  handleChange = (value: number) => {
    this.setState({ 'value': value });
  };

  newCharacterSubmit = (args: any) => {
    console.log('New Character Created', args);
    this.setState((prevState) => {
      const characters: any[] = prevState.characters;
      characters.push(args);
      return { characters: characters }
    });
    this.onCancelNewCharacter();
  };

  newEncounterSubmit = (args: any) => {
    console.log('New Encounter Created', args);
    this.setState((prevState) => {
      const encounters: any[] = prevState.encounters;
      encounters.push(args);
      return { encounters: encounters }
    });
    this.onCancelNewCharacter();
  };

  onEncounterPlayClicked = (event: any, ...args: any[]) => {
    console.log(event, args);
    localStorage.setItem('data', JSON.stringify(this.state));
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
                      <AutoComplete hintText="Search" dataSource={this.state.dataSource}/>
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
                    <ListItem primaryText="Create New Character" onTouchTap={this.onCreateNewCharacter}
                              leftIcon={<FontIcon className="material-icons">add_box</FontIcon>}/>
                  </List>
                </div>
                <div className="col m8 pull-m4 s12">
                  {this.state.characters.map(
                    (value: any, index: any) => <CharacterPanel key={index} character={value}/>)}
                </div>
              </div>
              <div className="row">
                <div className="col s2 offset-s1"><RaisedButton label="Prev" disabled/></div>
                <div className="col s2 offset-s2"><RaisedButton label="Next" disabled/></div>
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
                  {this.state.encounters.map((encounter: any, index: any) =>
                    <EncounterPanel key={index} encounter={encounter} onPlayClicked={this.onEncounterPlayClicked}/>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col s2 offset-s1"><RaisedButton label="Prev" disabled/></div>
                <div className="col s2 offset-s2"><RaisedButton label="Next" disabled/></div>
              </div>
            </Tab>
            {this.state.createEncounter ?
              <Tab label="New Encounter" value={3}>
                <div className="row">
                  <div className="col s12">
                    <NewEncounterFrom onSubmit={this.newEncounterSubmit} characters={this.state.characters}
                                      rewards={this.state.rewards}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col s2 offset-s1"><RaisedButton label="Cancel"
                                                                  onTouchTap={this.onCancelNewEncounter}/></div>
                </div>
              </Tab>
              : ''}
            {this.state.createCharacter ?
              <Tab label="New Character" value={4}>
                <div className="row">
                  <div className="col s12">
                    <NewCharacterForm onSubmit={this.newCharacterSubmit}/>
                  </div>
                </div>
                <div className="row" style={{ paddingBottom: '20px' }}>
                  <div className="col s2 offset-s1"><RaisedButton label="Cancel"
                                                                  onTouchTap={this.onCancelNewCharacter}/></div>
                </div>
              </Tab>
              : ''}
          </Tabs>
        </Paper>
      </div>
    )
  }
}

export default withRouter(Dashboard);