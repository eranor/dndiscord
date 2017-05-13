/**
 * Created by Ákos on 2017. 05. 03.
 */
import * as React from 'react';
import {
  Paper, Tabs, Tab, CardHeader, Card, CardText, ListItem, List, FontIcon, Toolbar, ToolbarGroup,
  ToolbarTitle, ToolbarSeparator, AutoComplete,
}from'material-ui';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router';
import Collapsible from 'react-collapsible';

@withRouter
export default class Dashboard extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
    this.state = {
      test: [
        {
          header: 'test',
          data: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam cumque eaque esse, explicabo ' +
          'id illum iure unde ut? Aliquam commodi corporis dicta ducimus esse laboriosam minima pariatur  perspiciatis quam?',
        },
        {
          header: 'test',
          data: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam cumque eaque esse, explicabo ' +
          'id illum iure unde ut? Aliquam commodi corporis dicta ducimus esse laboriosam minima pariatur  perspiciatis quam?',
        },
        {
          header: 'test',
          data: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam cumque eaque esse, explicabo ' +
          'id illum iure unde ut? Aliquam commodi corporis dicta ducimus esse laboriosam minima pariatur  perspiciatis quam?',
        },
        {
          header: 'test',
          data: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam cumque eaque esse, explicabo ' +
          'id illum iure unde ut? Aliquam commodi corporis dicta ducimus esse laboriosam minima pariatur  perspiciatis quam?',
        },
      ],
      dataSource: ['asdasd', 'asdasdqweq'],
    }
  }

  public render(): any {

    return (
      <div>
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        <Paper zDepth={3} rounded={false}>
          <Tabs>
            <Tab label="Characters">
              <div className="row" style={{ 'marginBottom': 0 }}>
                <div className="col s12">
                  <Toolbar>
                    <ToolbarGroup firstChild={true}>
                      <AutoComplete
                        hintText="Type anything"
                        dataSource={this.state.dataSource}
                      />
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
                  {this.state.test.map((value, index, array) => {
                    return <Card key={index} style={{ margin: '18px 8px' }}>
                      <Collapsible trigger={<CardHeader className="character-card-header waves-effect waves-ripple"
                                                        title={value.header}/>} transitionTime={100}>
                        <CardText>
                          {value.data}
                        </CardText>
                      </Collapsible>
                    </Card>
                  })}


                </div>
              </div>
            </Tab>
            <Tab label="Encounters">
              <div style={{ paddingTop: '1rem' }}>

              </div>
            </Tab>
          </Tabs>
        </Paper>
      </div>
    )
  }
}