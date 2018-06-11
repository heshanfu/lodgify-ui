import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Image, Label } from 'semantic-ui-react';

import { buildKeyFromStrings } from 'utils/build-key-from-strings';
import { Paragraph } from 'typography/Paragraph';

import { IMAGE_NOT_FOUND } from './constants';

/**
 * The standard widget for displaying an image.
 * @returns {Object}
 */
export const Component = ({
  imageUrl,
  sources,
  alternativeText,
  imageTitle,
  className,
  onLoad,
  isAvatar,
  isFluid,
  label,
}) => (
  <picture role="figure">
    {sources.map(({ srcset, media }, index) => (
      <source
        key={buildKeyFromStrings(srcset, index)}
        media={media}
        srcSet={srcset}
      />
    ))}
    <Image
      alt={alternativeText}
      avatar={isAvatar}
      className={cx(className)}
      fluid={isFluid}
      onLoad={onLoad}
      src={imageUrl}
      title={imageTitle}
    >
      {!imageUrl ? <Label content={IMAGE_NOT_FOUND} /> : null}
    </Image>
    {label ? <Paragraph>{label}</Paragraph> : null}
  </picture>
);

Component.displayName = 'ResponsiveImage';

Component.defaultProps = {
  imageUrl: '',
  alternativeText: 'Image Widget',
  imageTitle: 'Image title',
  className: null,
  sources: [],
  onLoad: Function.prototype,
  isAvatar: false,
  isFluid: true,
  label: null,
};

Component.propTypes = {
  /** Alternative text to show if the image can't be loaded by the browser */
  alternativeText: PropTypes.string,
  /** Custom class name string to customize the resulting img */
  className: PropTypes.string,
  /** Title of the image to show when hovering it on desktop browsers */
  imageTitle: PropTypes.string,
  /** URL pointing to the image to render */
  imageUrl: PropTypes.string,
  /** Whether to render the image as an avatar */
  isAvatar: PropTypes.bool,
  /** Whether to render fluidly the image or not */
  isFluid: PropTypes.bool,
  /** A visible label for the image */
  label: PropTypes.string,
  /** The function to call when the image is loaded */
  onLoad: PropTypes.func,
  /** Collection of objects to specify different image sources
   *  [See this for more info](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
   */
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      media: PropTypes.string.isRequired,
      srcset: PropTypes.string.isRequired,
    })
  ),
};