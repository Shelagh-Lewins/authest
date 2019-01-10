// join arrays of error messages from different errors, into a single string.
// it is expected that there will only ever be one type of error, e.g. 'register', but the object is parsed to be on the safe side.
/*
{ {'register': [
		'email already in use',
		'username already in use'
		]},
	{'login': [
		'could not log in'
	]
}
*/

export default function (errors) {
	let messageArray = [];
	Object.keys(errors).forEach((key) => {
		if (typeof errors[key] === 'string') {
			messageArray.push(errors[key]); // plain string error
		} else { // arary of errors
			errors[key].map((item) => { // eslint-disable-line array-callback-return
				messageArray.push(item);
			});
		}
	});

	const message = messageArray.join(' ');

	return message;
};
