import React from 'react';
import { Menu, Image } from 'semantic-ui-react';

import { Heading } from 'typography/Heading';

/**
 * @param  {string} logoSrc
 * @param  {string} logoText
 * @return {Object}
 */
export const getLogoMarkup = (logoSrc, logoText) => (
  <Menu.Item href="/" link>
    {logoSrc ? (
      <Image alt={logoText} src={logoSrc} />
    ) : (
      <Heading size="small">{logoText}</Heading>
    )}
  </Menu.Item>
);
