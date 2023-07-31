const express = require('express');
const expressMonitor = require('express-status-monitor');

const app = express();

app.use(expressMonitor());

const port = 3000;
const createLargeObject = require('./createLargeObject');

const arrLeak = [];
app.get('/', (req, res) => {
	const data = createLargeObject();
	req.data = data;
	setTimeout(function myFatihSetTimeout() {
		const objTest = {
			name: 'test name',
			myReq: req,
		};
		console.log('objTest.keys :>> ', objTest.keys);
	}, 2000);
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`app is started on port ${port}...`);
});
