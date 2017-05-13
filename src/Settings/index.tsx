/**
 * Created by Ákos on 2017. 05. 03.
 */
import * as React from 'react';
import { Paper } from 'material-ui';
import { Helmet } from 'react-helmet';

export default class Settings extends React.Component<any, any> {

  constructor(props: any, context: any) {
    super(props, context);
  }
  public render(): any {
    return (
      <div>
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        <Paper zDepth={3} rounded={false}>
          <div className="container" style={{ paddingTop: '1rem' }}>
          </div>
        </Paper>
      </div>
    )
  }
}