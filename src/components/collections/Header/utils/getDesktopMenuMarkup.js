import React from 'react';
import { Menu } from 'semantic-ui-react';
import { size } from 'lodash';

import { buildKeyFromStrings } from 'utils/build-key-from-strings';
import { Button } from 'elements/Button';
import { ShowOnDesktop } from 'layout/ShowOnDesktop';
import { Submenu } from 'elements/Submenu';

import { getSubmenuPointing } from './getSubmenuPointing';
import { getLinkMarkup } from './getLinkMarkup';

/**
 * @param  {Object} props
 * @param  {number} props.activeNavigationItemIndex
 * @param  {Object[]} props.navigationItems
 * @param  {Object} props.primaryCTA
 * @return {Object}
 */
export const getDesktopMenuMarkup = ({
  /* eslint-disable react/prop-types */
  activeNavigationItemIndex,
  navigationItems,
  primaryCTA,
  /* eslint-enable react/prop-types */
}) => (
  <ShowOnDesktop parent={Menu.Menu} parentProps={{ position: 'right' }}>
    {navigationItems.map(({ subItems, text, href }, index) =>
      size(subItems) > 0 ? (
        <Submenu
          isMenuItem
          isSelectedDisabled
          isSimple
          isTriggerUnderlined={index === activeNavigationItemIndex}
          isTriggeredOnHover
          items={subItems}
          key={buildKeyFromStrings(text, index)}
          pointing={getSubmenuPointing(
            index,
            size(navigationItems),
            !!primaryCTA
          )}
        >
          {text}
        </Submenu>
      ) : (
        getLinkMarkup(text, href, index, activeNavigationItemIndex)
      )
    )}
    {primaryCTA && (
      <Menu.Item className="no-underline" link>
        <Button isRounded onClick={primaryCTA.onClick}>
          {primaryCTA.text}
        </Button>
      </Menu.Item>
    )}
  </ShowOnDesktop>
);
