require("dotenv").config();
const SamplifyClient = require("./index");

const myProjectProps = {
	extProjectId: Math.random().toString(10),
	title: "Example Project",
	notificationEmails: [],
	devices: ["mobile"],
	category: {
		surveyTopic: []
	},
	lineItems: []
};

const client = new SamplifyClient({
	url: "https://api.dev.pe.researchnow.com",
	clientId: process.env.CLIENT_ID,
	username: process.env.USERNAME,
	password: process.env.PASSWORD
});

async function example() {
	const response = await client.createProject(myProjectProps);
	console.log(response);
	return response;
}

example();
