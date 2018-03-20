// CONVENTION: must match model name, case sensitive
var apiMapping = {
  Project: {
    validations: true,
    lazy: true,
    channel: '/channel/project',
    all: {
      'endpoint': '/private/queue',
      'controller': 'project',
      'method': '',
      'httpMethod': 'GET'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'project',
      'method': '',
      'httpMethod': 'POST'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'project',
      'method': '',
      'httpMethod': 'PUT'
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'project',
      'method': '',
      'httpMethod': 'DELETE'
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