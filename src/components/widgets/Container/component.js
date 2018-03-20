import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

/**
 * A container which renders widgets inside a single column
 */
export const Component = ({ children }) => (
  <Grid columns={1}>
    <Grid.Row>
      <Grid.Column>
        {Children.map(children, (child, index) =>
          React.cloneElement(child, { key: index })
        )}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

Component.displayName = 'Container';

Component.defaultProps = {
  children: null,
};

Component.propTypes = {
  /** The child components and elements. */
  children: PropTypes.node,
};
