import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';

import SearchComponent from '../SearchComponent';
import TableComponent from '../TableComponent';

const Home = () => (
  <Fragment>
    <Grid stackable columns={2}>
      <Grid.Column />
      <Grid.Column>
        <SearchComponent />
      </Grid.Column>
    </Grid>
    <TableComponent />
  </Fragment>
);

export default Home;
