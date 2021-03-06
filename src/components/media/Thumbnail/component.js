import React from 'react';
import PropTypes from 'prop-types';
import getClassNames from 'classnames';

import { Paragraph } from 'typography/Paragraph';
import { getBackgroundImageUrl } from 'utils/get-background-image-url';

/**
 * A thumbnail displays a small image.
 */
// eslint-disable-next-line jsdoc/require-jsdoc
export const Component = ({
  alternativeText,
  className,
  hasRoundedCorners,
  imageUrl,
  isCircular,
  isSquare,
  label,
  size,
}) => (
  <div className={getClassNames('ui', 'thumbnail', className)}>
    <div
      aria-label={alternativeText}
      className={getClassNames('ui', 'image', size, {
        'is-circular': isCircular,
        'is-square': isSquare,
        'is-rounded': hasRoundedCorners,
      })}
      role="img"
      style={{ backgroundImage: getBackgroundImageUrl(imageUrl) }}
    />
    {!!label && <Paragraph>{label}</Paragraph>}
  </div>
);

Component.displayName = 'Thumbnail';

Component.defaultProps = {
  alternativeText: 'Thumbnail element',
  className: '',
  hasRoundedCorners: false,
  isCircular: false,
  isSquare: false,
  label: null,
  size: null,
};

Component.propTypes = {
  /** Text to help visually impaired users understand the content of the image. */
  alternativeText: PropTypes.string,
  /**
   * Custom class name.
   * Provided by `ShowOnMobile` and `ShowOnDesktop` so ignored in the styleguide.
   * @ignore
   */
  className: PropTypes.string,
  /** Is the thumbnail rounded on the corners */
  hasRoundedCorners: PropTypes.bool,
  /** URL pointing to the image to render */
  imageUrl: PropTypes.string.isRequired,
  /** Is the thumbnail circular */
  isCircular: PropTypes.bool,
  /** Is the thumbnail square */
  isSquare: PropTypes.bool,
  /** A visible label for the thumbnail */
  label: PropTypes.string,
  /** The size of the thumbnail */
  size: PropTypes.oneOf(['small', 'large', 'huge']),
};
