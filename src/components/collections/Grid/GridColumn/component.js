import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import { getTwelveColumnsWidthValue } from '../utils';
/**
 * GridColumn is the Lodgify UI 12-columns based component for the
 * Semantic UI Grid.Column.
 *
 * @returns {Object}
 */
export const Component = props => (
  <Grid.Column
    {...Object.assign({}, ...props, {
      width: getTwelveColumnsWidthValue(props.width),
    })}
  />
);

Component.defaultProps = {
  /** Value between 1 and 12 */
  width: 1,
};

Component.propTypes = {
  width: PropTypes.number,
};

Component.displayName = 'GridColumn';
