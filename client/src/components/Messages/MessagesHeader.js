import React from 'react';
import PropTypes from 'prop-types';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';

const MessagesHeader = props => {
  return (
    <Segment clearing>
      <Header fluid='true' as='h2' floated='left' style={{ marginButtom: 0 }}>
        <span>
          Channel
          <Icon name={'star outline'} color='black' />
        </span>
        <Header.Subheader>2 Users</Header.Subheader>
      </Header>
      {/* Channel Search Input */}
      <Header floated='right'>
        <Input
          size='mini'
          icon='search'
          name='searchTerm'
          placeholder='Search Messages'
        />
      </Header>
    </Segment>
  );
};

MessagesHeader.propTypes = {};

export default MessagesHeader;
