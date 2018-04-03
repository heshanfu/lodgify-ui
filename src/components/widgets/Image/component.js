import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Image, Label } from 'semantic-ui-react';

import { Paragraph } from 'typography/Paragraph';

import { IMAGE_NOT_FOUND } from './constants';

/**
 * The standard Image widget
 * @returns {Object}
 */
export const Component = ({
  imageUrl,
  sources,
  alternativeText,
  imageTitle,
  className,
  onLoad,
  isFluid,
  label,
}) => (
  <picture role="figure">
    {sources.map(({ srcset, media }, index) => (
      <source srcSet={srcset} media={media} key={index} />
    ))}
    <Image
      src={imageUrl}
      alt={alternativeText}
      className={cx(className)}
      title={imageTitle}
      onLoad={onLoad}
      fluid={isFluid}
    >
      {!imageUrl ? <Label content={IMAGE_NOT_FOUND} icon="warning" /> : null}
    </Image>
    {label ? <Paragraph>{label}</Paragraph> : null}
  </picture>
);

Component.displayName = 'Image';

Component.defaultProps = {
  imageUrl: '',
  alternativeText: 'Image Widget',
  imageTitle: 'Image title',
  className: null,
  sources: [],
  onLoad: Function.prototype,
  isFluid: true,
  label: null,
};

Component.propTypes = {
  /** URL pointing to the image to render */
  imageUrl: PropTypes.string,
  /** Collection of objects to specify different image sources
   *  [See this for more info](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
   */
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      srcset: PropTypes.string.isRequired,
      media: PropTypes.string.isRequired,
    })
  ),
  /** Alternative text to show if the image can't be loaded by the browser */
  alternativeText: PropTypes.string,
  /** Title of the image to show when hovering it on desktop browsers */
  imageTitle: PropTypes.string,
  /** Custom class name string to customize the resulting img */
  className: PropTypes.string,
  /** Whether to render fluidly the image or not */
  isFluid: PropTypes.bool,
  /** The function to call when the image is loaded */
  onLoad: PropTypes.func,
  /** A visible label for the image */
  label: PropTypes.string,
};
