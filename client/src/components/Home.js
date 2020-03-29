import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, GridColumn } from 'semantic-ui-react';
import ColorPanel from './ColorPanel/ColorPanel';
import Messages from './Messages/Messages';
import SidePanel from './SidePanel/SidePanel';
import MetaPanel from './MetaPanel/MetaPanel';
import Spinner from './Utils/Spinner';

const Home = ({ loading }) => {
  return loading ? (
    <Spinner />
  ) : (
    <Grid columns='equal' className='app' style={{ background: '#eee' }}>
      <ColorPanel />
      <SidePanel />
      <GridColumn style={{ marginLeft: 320 }}>
        <Messages />
      </GridColumn>
      <GridColumn width={4}>
        <MetaPanel />
      </GridColumn>
    </Grid>
  );
};

Home.propTypes = {
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.auth.loading
});

export default connect(mapStateToProps)(Home);
