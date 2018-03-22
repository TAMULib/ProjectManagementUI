// CONVENTION: must match model name, case sensitive
var apiMapping = {
  Project: {
    validations: true,
    lazy: true,
    channel: '/channel/project',
    all: {
      'endpoint': '/private/queue',
      'controller': 'projects',
      'method': '',
      'httpMethod': 'GET'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'projects',
      'method': '',
      'httpMethod': 'POST'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'projects',
      'method': '',
      'httpMethod': 'PUT'
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'projects',
      'method': '',
      'httpMethod': 'DELETE'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'projects'
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