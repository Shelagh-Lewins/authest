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
		this.checkFieldMatch = this.checkFieldMatch.bind(this);
	}

	state = {
		'isValidated': false
	};

	componentDidMount() {
		if(this.props.inputsmustmatch) {
			// there are two inputs whose values must match
			// specified by id
			// at present only one pair can be specified
			// as a property of the ValidatedForm
			/*
				inputsmustmatch={ {
					'input1': 'password',
					'input2': 'password_confirm',
					'message': 'Passwords should match',
				} }

			*/
			// this should be revisited if we ever need more than one matching pair in a form
			// the second is constrained to match the first
			// i.e. input2 will display the error message
			const formEl = ReactDOM.findDOMNode(this); // component parent node

			const input1Id = this.props.inputsmustmatch.input1;
			const input2Id = this.props.inputsmustmatch.input2;

			const input1Element = formEl.querySelector(`#${input1Id}`);

			const input2Element = formEl.querySelector(`#${input2Id}`);

			if (input1Element instanceof HTMLElement && input2Element instanceof HTMLElement) {
				input1Element.oninput = (e) => this.checkFieldMatch(input1Id, input2Id, e);
				input2Element.oninput = (e) => this.checkFieldMatch(input1Id, input2Id, e);
			}
		}
	}

	checkFieldMatch(input1, input2, e) {
		// check whether the values of two inputs match
		// if they don't, add an HTML validity message to input2
		const node = ReactDOM.findDOMNode(this);

		if (node instanceof HTMLElement) {
	    const input1Element = node.querySelector(`#${input1}`);
	    const input2Element = node.querySelector(`#${input2}`);

	    if (input1Element instanceof HTMLElement && input2Element instanceof HTMLElement) {
		    if (input1Element.value === input2Element.value) {
		    	 input2Element.setCustomValidity('');
		    } else {
		    	input2Element.setCustomValidity(this.props.inputsmustmatch.message);
		    }
		  }
		}
	}

	customMessages = {
		// uncomment a message to use it in place of the HTML5 default
	  // 'valueMissing': 'Custom required!', // `required` attr
	  // 'emailMismatch': 'Custom email mismatch', // Invalid email
	  // 'patternMismatch': 'Custom pattern mismatch',// `pattern` attr
	}

	// https://pageclip.co/blog/2018-02-20-you-should-use-html5-form-validation.html
	getCustomMessage = (elem)  => {
		// check for a custom validity type, e.g. to ensure two passwords match
		if (elem.validity.customError) {
			return elem.validationMessage;
		}

	  // check for a specific type mismatch e.g. emailMismatch
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
		const formEl = ReactDOM.findDOMNode(this); // component parent node
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

			return true;
		}
	};

	submitHandler = event => {
		event.preventDefault();

		if (this.validate()) {
			this.props.onSubmit(event);
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
