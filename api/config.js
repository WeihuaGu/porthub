var config = {
	targethost: "http://localhost",
	preappend: {
		"/wallabag": {
			"host": "http://localhost",
			"port": 2000
		},
		"/down": {
			"host": "http://localhost",
			"port": 1117
		}
	}
}

module.exports = config;

