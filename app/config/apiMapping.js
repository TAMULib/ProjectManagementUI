// CONVENTION: must match model name, case sensitive
var apiMapping = {
	Project: {
		validations: true,
		lazy: true,
		all: {
			'endpoint': '/private/queue',
			'controller': 'project',
			'method': '',
			'httpMethod': 'GET'
		},
		listen: {
			'endpoint': '/channel',
			'controller': 'project'
		}
	},
	User: {
		lazy: true,
		instantiate: {
			'endpoint': '/private/queue', 
			'controller': 'user', 
			'method': 'credentials'
		},
		all: {
			'endpoint': '/private/queue',
			'controller': 'user',
			'method': 'all'
		},
		listen: {
			'endpoint': '/channel',
			'controller': 'user'
		},
		update: {
			'endpoint': '/private/queue',
			'controller': 'user',
			'method': 'update'
		}
	}
};