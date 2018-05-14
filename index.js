const request = require("request-promise");

/* TODO: 
	Add logic around JWT expiry
	Add more endpoints
*/

class SamplifyClient {
	/**
	 * Constructor
	 * Creates a new instance of SamplifyClient.
	 * @param {object} props				- An object of configuration properties for the client.
	 * @property {string} props.url			- The root URL for all requests.
	 * @property {string} props.clientId	- Your secret Client ID for the Samplify API.
	 * @property {string} props.username	- Your Samplify API username.
	 * @property {string} props.password	- Your Samplify API passsword.
	 */
	constructor(props) {
		const { clientId, username, password, url } = props;
		this.clientId = clientId;
		this.username = username;
		this.password = password;
		this.url = url;
	}
	/**
	 * Create Project
	 * Calls the endpoint for creating a project.
	 * @param {object} json 	- An object of props for the project to be created.
	 * See https://researchnow.github.io/samplifyapi-docs/#create-project for details.
	 * @param {object} callback - A callback to execute on completion.
	 * 		Receives (error, httpResponse, body).
	 */
	createProject(json, callback) {
		const options = {
			url: new URL("/sample/v1/projects", this.url),
			method: "POST",
			json
		};
		return this._request(options, callback);
	}

	getAllProjects(callback) {
		const options = {
			url: new URL("/sample/v1/projects", this.url),
			method: "GET"
		};
		return this._request(options, callback);
	}

	async _getToken() {
		if (this.accessToken) return new Promise.resolve(this.accessToken);
		const url = new URL("/auth/v1/token/password", this.url);
		const json = {
			clientId: this.clientId,
			username: this.username,
			password: this.password
		};
		const token = await request
			.post({ url, json })
			.then(body => body.accessToken)
			.catch(error => {
				throw error;
			});
		return token;
	}

	async _request(options) {
		const token = await this._getToken();
		const optionsWithAuth = {
			...options,
			auth: { bearer: token }
		};
		const result = await request(optionsWithAuth);
		return result;
	}
}

module.exports = SamplifyClient;
