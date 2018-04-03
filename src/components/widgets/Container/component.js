import React, { Children } from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'layout/Grid';
import { GridRow } from 'layout/GridRow';
import { GridColumn } from 'layout/GridColumn';

/**
 * A container which renders widgets inside of it.
 * By default spans to 100% width stacking widgets vertically.
 *
 * @returns {Object}
 */
export const Component = ({ children, width }) => (
  <Grid>
    <GridRow>
      <GridColumn width={width}>
        {Children.map(children, (child, index) =>
          React.cloneElement(child, { key: index })
        )}
      </GridColumn>
    </GridRow>
  </Grid>
);

Component.displayName = 'Container';

Component.defaultProps = {
  children: null,
  width: 12,
};

Component.propTypes = {
  /** The children widgets. */
  children: PropTypes.node,
  /** Value between 1 and 12 */
  width: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};