export var authToken;

const setAuthToken = token => {
	if(token) {
		authToken = token;
	} else {
		authToken = 'undefined';
	}

	return authToken;
}

export default setAuthToken;
