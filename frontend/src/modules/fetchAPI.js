// uses fetch to get or post data.
// passes up useful errors to the calling function.
// set useAuth to true for validating logged-in user: token will be sent in header
import store from '../store';

export default function fetchAPI({ url, data, method = 'GET', useAuth = false }) {
	let headers = {};

	if (useAuth) {
		headers.Authorization = `Token ${store.getState().auth.user.token}`;
	}

	return fetch(url, { headers, 'method': method, 'body': data })
		.then(response => {
			// fetch returns ok true / false in most situations
			// true is a successful response
			console.log('internal response ', response);
			if (response.ok) {
				const contentType = response.headers.get('Content-Type') || '';

				if (contentType.includes('application/json')) {
					return response.json().catch(error => {
						return Promise.reject(new Error('Invalid JSON: ' + error.message));
					});
				}

				if (contentType.includes('text/html')) {
					return response.text().then(html => {
						return {
							'page_type': 'generic',
							'html': html
						};
					}).catch(error => {
						return Promise.reject(new Error('HTML error: ' + error.message));
					});
				}

				return Promise.reject(new Error('Invalid content type: ' + contentType));
			} else {
				// ok == false means some problem to display
				// even though no error was returned
				if (response.status === 404) {
					return Promise.reject(new Error('Page not found: ' + url));
				}

				if (response.status === 500) {
					return Promise.reject(new Error('Internal server error: ' + url));
				}

				return response.json().then(response => {
					// the server rejected the request, e.g. because of a wrong password, we want to display the reason
					// the information is contained in the json()
					// there may be more than one error, so join them into a single string.
					// multiline display would be more elegant but this will do for now and makes all errors consistent (one message string)

					let messageArray = [];
					Object.keys(response).forEach((key) => {
						response[key].map((item) => { // eslint-disable-line array-callback-return
							messageArray.push(item);
						});
					});

					const message = messageArray.join(' ');
					return Promise.reject(new Error(message)
					);
				});
			}
		}).catch(error => {
			// fetch returned an error
			return Promise.reject(new Error(error.message));
		});
};
