/**
 * A custom Form component that handles form validation errors.
 * It executes the form's checkValidity
 **/

// https://dev.to/_arpy/html5-form-validation-in-react-3308
/*
Issues
In render function, const props = [...this.props];
this fails to compile, Invalid attempt to spread non-iterable instance
seems to be trying to turn an object into an array
works in the codepen but not when copied into my code
replaced with const props = {...this.props};

Example has 'submit' as name of property for submit function.
This shows an error in the console even though it works.
I replaced with onSubmit
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ValidatedForm extends Component {
	constructor() {
		super();

		this.validate = this.validate.bind(this);
	}

	state = {
		'isValidated': false
	};

	customMessages = {
	  'valueMissing': 'Custom required!', // `required` attr
	  // 'emailMismatch': 'Custom email mismatch', // Invalid email
	  // 'patternMismatch': 'Custom pattern mismatch',// `pattern` attr
	}

	// https://pageclip.co/blog/2018-02-20-you-should-use-html5-form-validation.html
	getCustomMessage = (elem)  => {
		// is there a custom validity type set, e.g. to ensure two passwords match?
		if (elem.validity.customError) {
			return elem.validationMessage;
		}

	  if (elem.validity.typeMismatch) {
	    return  this.customMessages[`${elem.type}Mismatch`];
	  } else {
	  	for (const invalidKey in this.customMessages) {
	      if (elem.validity[invalidKey]) {
	        return this.customMessages[invalidKey];
	      }
	    }
	  }
	}

	/**
	 * The main function that validates the form and fills in the error messages.
	 * @returns bool Returns a boolean showing if the form is valid for submission or not.
	 **/
	validate = () => {
		//this.formEl is a reference in the component to the form DOM element.
		//const formEl = this.formEl;
		const formEl = ReactDOM.findDOMNode(this);
		const formLength = formEl.length;

		/*
		* The checkValidity() method on a form runs the 
		* html5 form validation of its elements and returns the result as a boolean.
		* It returns 'false' if at least one of the form elements does not qualify,
		* and 'true', if all form elements are filled with valid values.
		*/
		if (formEl.checkValidity() === false) {
			for (let i = 0; i < formLength; i++) {
				//the i-th child of the form corresponds to the form's i-th input element
				const elem = formEl[i];
				console.log('elem ', elem);
				console.log('elem.validity ', elem.validity);
				/*
				* errorLabel placed next to an element is the container we want to use 
				* for validation error message for that element
				*/
				const errorLabel = elem.parentNode.querySelector('.invalid-feedback');

				// don't validate buttons
				if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
					if (!elem.validity.valid) {
						let message = this.getCustomMessage(elem) || elem.validationMessage; // use standard message if no custom message
						errorLabel.textContent = message;
					} else {
						errorLabel.textContent = '';
					}
				}
			}

			//Return 'false', as the formEl.checkValidity() method said there are some invalid form inputs.
			return false;
		} else {
			//The form is valid, so we clear all the error messages
			for (let i = 0; i < formLength; i++) {
				const elem = formEl[i];
				const errorLabel = elem.parentNode.querySelector('.invalid-feedback');
				if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
					errorLabel.textContent = '';
				}
			}

			//Return 'true', as the form is valid for submission
			return true;
		}
	};

	submitHandler = event => {
		event.preventDefault();

		if (this.validate()) {
			this.props.onSubmit();
		}

		this.setState({ 'isValidated': true });
	};

	/**
	* Render the component as a regular form element with appended children from props.
	**/
	render() {
		const props = { ...this.props };

		// Add bootstrap's 'was-validated' class to the forms classes to support its styling
		let classNames = [];
		if (props.className) {
			classNames = [...props.className];
			delete props.className;
		}

		if (this.state.isValidated) {
			classNames.push('was-validated');
		}

		//The form will have a reference in the component and a submit handler set to the component's submitHandler
		return (
			<form
				{...props}
				className={classNames}
				noValidate
				onSubmit={this.submitHandler}
			>
				{this.props.children}
			</form>
		);
	}
}
