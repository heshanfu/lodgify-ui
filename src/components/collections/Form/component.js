import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import { Card, Form, Message } from 'semantic-ui-react';
import { size, forEach } from 'lodash';

import { Button } from 'elements/Button';
import { Heading } from 'typography/Heading';
import { Link } from 'elements/Link';

import { getValidationWithDefaults } from './utils/getValidationWithDefaults';
import { getIsRequiredError } from './utils/getIsRequiredError';
import { getIsValidError } from './utils/getIsValidError';
import { getEmptyRequiredInputs } from './utils/getEmptyRequiredInputs';
import { getFormChild } from './utils/getFormChild';
import { getIsSubmitButtonDisabled } from './utils/getIsSubmitButtonDisabled';

/**
 * A form displays a set of related user input fields in a structured way.
 */
// eslint-disable-next-line jsdoc/require-jsdoc
export class Component extends PureComponent {
  state = {};

  handleInputBlur = name => {
    const validation = getValidationWithDefaults(this.props.validation[name]);
    const hasError = getIsRequiredError(validation, this.state[name]);

    hasError &&
      this.setState({ [name]: { error: validation.isRequiredMessage } });
  };

  handleInputChange = (name, value) => {
    const { invalidMessage, getIsValid } = getValidationWithDefaults(
      this.props.validation[name]
    );
    const isValid = getIsValid(value);
    const error = getIsValidError(value, isValid, invalidMessage);

    this.setState({ [name]: { error, isValid, value } });
  };

  handleSubmit = () => {
    const emptyRequiredInputs = getEmptyRequiredInputs(
      this.props.validation,
      this.state
    );

    size(emptyRequiredInputs)
      ? forEach(emptyRequiredInputs, (validation, name) => {
          const { isRequiredMessage } = getValidationWithDefaults(validation);

          this.setState({
            [name]: { error: isRequiredMessage },
          });
        })
      : this.props.onSubmit(this.state);
  };

  render = () => {
    const {
      actionLink,
      children,
      errorMessage,
      headingText,
      submitButtonText,
      successMessage,
    } = this.props;

    return (
      <Card className="has-form" fluid>
        {headingText && (
          <Card.Content>
            <Heading>{headingText}</Heading>
          </Card.Content>
        )}
        <Card.Content>
          <Form
            error={!!errorMessage}
            onSubmit={this.handleSubmit}
            success={!!successMessage}
          >
            {Children.map(children, child => getFormChild(child, this))}
            {!!successMessage && <Message content={successMessage} success />}
            {!!errorMessage && <Message content={errorMessage} error />}
            {actionLink && (
              <Link onClick={actionLink.onClick}>{actionLink.text}</Link>
            )}
            {submitButtonText && (
              <Button
                isDisabled={getIsSubmitButtonDisabled(this.state)}
                isPositionedRight
              >
                {submitButtonText}
              </Button>
            )}
          </Form>
        </Card.Content>
      </Card>
    );
  };
}

Component.displayName = 'Form';

Component.defaultProps = {
  errorMessage: '',
  headingText: null,
  onSubmit: Function.prototype,
  actionLink: null,
  submitButtonText: null,
  successMessage: '',
  validation: {},
};

Component.propTypes = {
  /** An optional action link. */
  actionLink: PropTypes.shape({
    /** The function to call when the secondary call to action is clicked. */
    onClick: PropTypes.func,
    /** The visible text for the secondary call to action */
    text: PropTypes.node.isRequired,
  }),
  /** The child components and elements. */
  children: PropTypes.node.isRequired,
  /** The message to display when the form has an error */
  errorMessage: PropTypes.string,
  /** The text to display as a heading at the top of the form. */
  headingText: PropTypes.string,
  /** The function to call when the form is submitted
   *  @param {Object} values - The values of the inputs in the form.
   */
  onSubmit: PropTypes.func,
  /** The text to display on the submit button. */
  submitButtonText: PropTypes.string,
  /** The message to display when the form is successful */
  successMessage: PropTypes.string,
  /** Settings for validating inputs. */
  validation: PropTypes.objectOf(
    PropTypes.shape({
      /** A function which checks whether the input is empty. Defaults to check for falsy value.
       *  @param  {any}     value
       *  @return {boolean}
       */
      getIsEmpty: PropTypes.func,
      /** A function which checks `value` and returns `true` if valid, `false` if invalid.
       *  @param  {any}     value
       *  @return {boolean}
       */
      getIsValid: PropTypes.func,
      /** An optional message to display if `getIsValid` returns `false`. */
      invalidMessage: PropTypes.string,
      /** Is the user required to enter a value into the input. */
      isRequired: PropTypes.bool,
      /** An optional message to display if `getIsValid` returns `false`. */
      isRequiredMessage: PropTypes.string,
    })
  ),
};
