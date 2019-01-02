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

import React from 'react';

export default class ValidatedForm extends React.Component {
	state = {
		'isValidated': false
	};

	customMessages = {
	  valueMissing:    'Custom required!',       // `required` attr
	  emailMismatch:   'Custom email mismatch',  // Invalid email
	  patternMismatch: 'Custom pattern mismatch',// `pattern` attr
	}

	// https://pageclip.co/blog/2018-02-20-you-should-use-html5-form-validation.html
	getCustomMessage = (type, validity)  => {
	  if (validity.typeMismatch) {
	    return this.customMessages[`${type}Mismatch`]
	  } else {
	    for (const invalidKey in this.customMessages) {
	      if (validity[invalidKey]) {
	        return this.customMessages[invalidKey]
	      }
	    }
	  }
	}

	/**
	 * Them main function that validates the form and fills in the error messages.
	 * @returns bool Returns a boolean showing if the form is valid for submission or not.
	 **/
	validate = () => {
		//this.formEl is a reference in the component to the form DOM element.
		const formEl = this.formEl;
		const formLength = formEl.length;

		/*
		* The checkValidity() method on a form runs the 
		* html5 form validation of its elements and returns the result as a boolean.
		* It returns 'false' if at least one of the form elements does not qualify,
		* and 'true', if all form elements are filled with valid values.
		*/
		if (formEl.checkValidity() === false) {
			for (let i = 0; i < formLength; i++) {
				//the i-th child of the form corresponds to the forms i-th input element
				const elem = formEl[i];
				/*
				* errorLabel placed next to an element is the container we want to use 
				* for validation error message for that element
				*/
				const errorLabel = elem.parentNode.querySelector('.invalid-feedback');

				/*
				* A form element contains also any buttons contained in the form.
				* There is no need to validate a button, so, we'll skip that node.
				*/
				if (errorLabel && elem.nodeName.toLowerCase() !== 'button') {
					/*
					* Each node in html5 form has a validity property. 
					* It contains the validation state of that element.
					* The elem.validity.valid property indicates whether the element qualifies its validation rules or no.
					* If it does not qualify, the elem.validationMessage property will contain the localized validation error message.
					* We will show that message in our error container if the element is invalid, and clear the previous message, if it is valid.
					*/
					if (!elem.validity.valid) {
						console.log('validity issue ', elem.validity);
						errorLabel.textContent = elem.validationMessage;
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

	/**
	* This is the method that is called on form submit.
	* It stops the default form submission process and proceeds with custom validation.
	**/
	submitHandler = event => {
		event.preventDefault();

		//If the call of the validate method was successful, we can proceed with form submission. Otherwise we do nothing.
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

		//Add bootstrap's 'was-validated' class to the forms classes to support its styling
		let classNames = [];
		if (props.className) {
			classNames = [...props.className];
			delete props.className;
		}

		if (this.state.isValidated) {
			classNames.push('was-validated');
		}

		//The form will have a refference in the component and a submit handler set to the component's submitHandler
		return (
			<form
				{...props}
				className={classNames}
				noValidate
				ref={form => (this.formEl = form)}
				onSubmit={this.submitHandler}
			>
				{this.props.children}
			</form>
		);
	}
}