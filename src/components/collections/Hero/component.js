import React from 'react';
import PropTypes from 'prop-types';

import { Header } from 'collections/Header';
import { FullBleed } from 'media/FullBleed';

/**
 * A hero displays a header and optional children with a full bleed image background
 */
// eslint-disable-next-line jsdoc/require-jsdoc
export const Component = ({
  activeNavigationItemIndex,
  backgroundImageUrl,
  children,
  headerLogoSrc,
  headerLogoText,
  headerNavigationItems,
  headerPrimaryCTA,
  headerSearchBarGuestsOptions,
  headerSearchBarLocationOptions,
  headerSearchBarModalHeadingText,
  headerSearchBarSearchButton,
  searchBarGetIsDayBlocked,
}) => (
  <FullBleed className="is-hero" hasGradient imageUrl={backgroundImageUrl}>
    <Header
      activeNavigationItemIndex={activeNavigationItemIndex}
      logoSrc={headerLogoSrc}
      logoText={headerLogoText}
      navigationItems={headerNavigationItems}
      primaryCTA={headerPrimaryCTA}
      searchBarGetIsDayBlocked={searchBarGetIsDayBlocked}
      searchBarGuestsOptions={headerSearchBarGuestsOptions}
      searchBarLocationOptions={headerSearchBarLocationOptions}
      searchBarModalHeadingText={headerSearchBarModalHeadingText}
      searchBarSearchButton={headerSearchBarSearchButton}
    />
    {children}
  </FullBleed>
);

Component.displayName = 'Hero';

Component.defaultProps = {
  activeNavigationItemIndex: null,
  children: null,
  headerLogoSrc: null,
  headerPrimaryCTA: null,
  headerSearchBarGuestsOptions: [],
  headerSearchBarLocationOptions: [],
  headerSearchBarModalHeadingText: null,
  headerSearchBarSearchButton: undefined,
  searchBarGetIsDayBlocked: undefined,
};

Component.propTypes = {
  /** The index of the active navigation item. */
  activeNavigationItemIndex: PropTypes.number,
  /** The background image url of the hero. */
  backgroundImageUrl: PropTypes.string.isRequired,
  /** The children displayed between the header and the bottom of the hero. */
  children: PropTypes.node,
  /** The src url for the logo in the header. */
  headerLogoSrc: PropTypes.string,
  /** The text for the logo in the header. */
  headerLogoText: PropTypes.string.isRequired,
  /** The items for a user to navigate the site. */
  headerNavigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      /** The href url for an item which is a link. */
      href: PropTypes.string,
      /** Sub navigation items to display as a [`<Submenu />`](#submenu) under an item. */
      subItems: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        })
      ),
      /** The visible text for an item. */
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  /** An optional primary call to action to display as a [`<Button />`](#button) in the header. */
  headerPrimaryCTA: PropTypes.shape({
    /** The href url for the call to action. */
    href: PropTypes.string.isRequired,
    /** The  visible text for the call to action. */
    text: PropTypes.string.isRequired,
  }),
  /** The options which the user can select in the guests field in the search bar. */
  headerSearchBarGuestsOptions: PropTypes.arrayOf(
    PropTypes.shape({
      /** The visible text for the option. */
      text: PropTypes.string.isRequired,
      /** The underlying value for the option. */
      value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
      ]),
    })
  ),
  /** The options which the user can select in the location field in the search bar. */
  headerSearchBarLocationOptions: PropTypes.arrayOf(
    PropTypes.shape({
      /** The visible text for the option. */
      text: PropTypes.string.isRequired,
      /** The underlying value for the option. */
      value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string,
      ]),
    })
  ),
  /** The heading displayed in the Search Bar modal. */
  headerSearchBarModalHeadingText: PropTypes.string,
  /** The Search Button the Search Bar modal displays. */
  headerSearchBarSearchButton: PropTypes.node,
  /**
   * A function called for each day to be displayed in the DateRangePicker.
   * Returning true blocks that day in the date range picker.
   * @param   {Moment}  day - The day to test.
   * @returns {boolean}     - Is the day blocked.
   */
  searchBarGetIsDayBlocked: PropTypes.func,
};
