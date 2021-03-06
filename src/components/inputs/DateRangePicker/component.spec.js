import React from 'react';
import { shallow } from 'enzyme';
import { DateRangePicker as ReactDatesDateRangePicker } from 'react-dates';
import { Responsive } from 'semantic-ui-react';
import moment from 'moment';
import {
  expectComponentToBe,
  expectComponentToHaveChildren,
  expectComponentToHaveProps,
  expectComponentToHaveDisplayName,
} from '@lodgify/enzyme-jest-expect-helpers';

import { InputController } from 'inputs/InputController';
import { Icon, ICON_NAMES } from 'elements/Icon';
import { returnFirstArgument } from 'utils/return-first-argument';

import { ComponentWithResponsive as DateRangePicker } from './component';

const getDateRangePicker = () => shallow(<DateRangePicker />);
const getWrappedDateRangePicker = props => {
  const Child = getDateRangePicker().prop('as');

  return shallow(<Child {...props} />);
};

describe('<DateRangePicker />', () => {
  it('should be wrapped in a Semantic UI `Responsive` component', () => {
    const wrapper = getDateRangePicker();

    expectComponentToBe(wrapper, Responsive);
  });

  describe('the wrapped `DateRangePicker` component', () => {
    it('should be a Semantic UI `InputController`', () => {
      const wrapper = getWrappedDateRangePicker();

      expectComponentToBe(wrapper, InputController);
    });
  });

  describe('the `InputController` component', () => {
    const getInputController = () =>
      getWrappedDateRangePicker().find(InputController);

    it('should get the right props', () => {
      const wrapper = getInputController();

      expectComponentToHaveProps(wrapper, {
        adaptOnChangeEvent: returnFirstArgument,
        error: false,
        inputOnChangeFunctionName: 'onDatesChange',
        isFocused: false,
        isValid: false,
        name: '',
        onChange: expect.any(Function),
      });
    });

    it('should get the right children', () => {
      const wrapper = getInputController();

      expectComponentToHaveChildren(wrapper, ReactDatesDateRangePicker);
    });
  });

  describe('the `react-dates` `DateRangePicker`', () => {
    const getReactDatesDateRangePicker = () =>
      getWrappedDateRangePicker().find(ReactDatesDateRangePicker);

    it('should get the right consumer defined props', () => {
      const wrapper = getReactDatesDateRangePicker();

      expectComponentToHaveProps(wrapper, {
        displayFormat: 'DD/MM/YYYY',
        endDatePlaceholderText: '',
        isDayBlocked: Function.prototype,
        openDirection: expect.any(String),
        startDatePlaceholderText: '',
      });
    });

    it('should get the right controlled props', () => {
      const wrapper = getReactDatesDateRangePicker();

      expectComponentToHaveProps(wrapper, {
        endDate: null,
        focusedInput: null,
        onDatesChange: Function.prototype,
        onFocusChange: expect.any(Function),
        startDate: null,
      });
    });

    it('should get the right static required props', () => {
      const wrapper = getReactDatesDateRangePicker();

      expectComponentToHaveProps(wrapper, {
        endDateId: expect.stringContaining('end_date_id_'),
        startDateId: expect.stringContaining('start_date_id_'),
      });
    });

    it('should get the right static custom appearance props', () => {
      const wrapper = getReactDatesDateRangePicker();

      expectComponentToHaveProps(wrapper, {
        customArrowIcon: <Icon name={ICON_NAMES.ARROW_RIGHT} />,
        customInputIcon: <Icon name={ICON_NAMES.CALENDAR} />,
        daySize: 52,
        hideKeyboardShortcutsPanel: true,
        navNext: <Icon name={ICON_NAMES.ARROW_RIGHT} />,
        navPrev: <Icon name={ICON_NAMES.ARROW_LEFT} />,
        numberOfMonths: ReactDatesDateRangePicker.defaultProps.numberOfMonths,
      });
    });
  });

  describe('Interaction: onChange', () => {
    it('should persist the value in component state', () => {
      const now = moment();
      const value = { startDate: now };
      const dateRangePicker = getWrappedDateRangePicker();

      dateRangePicker.instance().handleInputControllerChange(undefined, value);
      const actual = dateRangePicker.state();

      expect(actual).toEqual(expect.objectContaining(value));
    });
  });

  describe('Interaction: onFocusChange', () => {
    it('should persist the value in component state', () => {
      const value = 'startDate';
      const dateRangePicker = getWrappedDateRangePicker();

      dateRangePicker.instance().handleFocusChange(value);
      const actual = dateRangePicker.state();

      expect(actual).toEqual(
        expect.objectContaining({
          focusedInput: value,
        })
      );
    });
  });

  describe('State change: value', () => {
    it('should call the function passed as `props.onChange`', () => {
      const handleChange = jest.fn();
      const props = { name: 'winnie', onChange: handleChange };
      const newState = { endDate: null, startDate: moment() };
      const dateRangePicker = getWrappedDateRangePicker(props);

      dateRangePicker.setState(newState);
      expect(handleChange).toHaveBeenCalledWith(
        props.name,
        expect.objectContaining(newState)
      );
    });
  });

  describe('State change: focusedInput', () => {
    describe('if there is a blur event', () => {
      it('should call `props.onBlur`', () => {
        const onBlur = jest.fn();
        const dateRangePicker = getWrappedDateRangePicker({ onBlur });

        const prevState = { focusedInput: 'startDate' };
        const state = { focusedInput: null };

        dateRangePicker.setState(prevState);
        dateRangePicker.setState(state);

        expect(onBlur).toHaveBeenCalled();
      });
    });

    describe('if there is a no blur event', () => {
      it('should note call `props.onBlur`', () => {
        const onBlur = jest.fn();
        const dateRangePicker = getWrappedDateRangePicker({ onBlur });

        const prevState = { focusedInput: null };
        const state = { focusedInput: null };

        dateRangePicker.setState(prevState);
        dateRangePicker.setState(state);

        expect(onBlur).not.toHaveBeenCalled();
      });
    });
  });

  it('should have displayName `DateRangePicker`', () => {
    const component = getDateRangePicker().prop('as');

    expectComponentToHaveDisplayName(component, 'DateRangePicker');
  });
});
