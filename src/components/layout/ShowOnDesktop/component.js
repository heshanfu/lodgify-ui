import React from 'react';
import PropTypes from 'prop-types';
import getClassNames from 'classnames';

/**
 * ShowOnDesktop wraps child components and hides
 * them on all other devices
 */
// eslint-disable-next-line jsdoc/require-jsdoc
export const Component = ({ children, parent, parentProps }) =>
  React.createElement(
    parent,
    {
      ...parentProps,
      className: getClassNames(parentProps.className, 'mobile-hidden'),
    },
    children
  );

Component.defaultProps = {
  children: null,
  parentProps: {},
};

Component.displayName = 'ShowOnDesktop';

Component.propTypes = {
  /** The child components only to be rendered on desktop  */
  children: PropTypes.node,
  /** The parent component that will be rendered. */
  parent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  /** The props to be passed to the parent component. */
  // eslint-disable-next-line react/forbid-prop-types
  parentProps: PropTypes.object,
};
