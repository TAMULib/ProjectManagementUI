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
  },
  VersionManagementSoftware: {
    validations: true,
    lazy: true,
    channel: '/channel/version-management-software',
    all: {
      'endpoint': '/private/queue',
      'controller': 'version-management-software',
      'method': '',
      'httpMethod': 'GET'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'version-management-software',
      'method': '',
      'httpMethod': 'POST'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'version-management-software',
      'method': '',
      'httpMethod': 'PUT'
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'version-management-software',
      'method': '',
      'httpMethod': 'DELETE'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'version-management-software'
    }
  },
  VersionProject: {
      all: {
          'endpoint': '/private/queue',
          'controller': 'projects'
      },
      getByScopeId: {
          'endpoint': '/private/queue',
          'controller': 'projects'
      }
  }
};