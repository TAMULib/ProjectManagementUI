// CONVENTION: must match model name, case sensitive
var apiMapping = {
  Product: {
    validations: true,
    lazy: true,
    channel: '/channel/products',
    all: {
      'endpoint': '/private/queue',
      'controller': 'products',
      'method': '',
      'httpMethod': 'GET'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'products',
      'method': '',
      'httpMethod': 'POST'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'products',
      'method': '',
      'httpMethod': 'PUT'
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'products',
      'method': '',
      'httpMethod': 'DELETE'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'products'
    }
  },
  FeatureRequest: {
    validations: false,
    channel: '/channel/internal/request',
    push: {
      'endpoint': '/private/queue',
      'controller': 'internal/request',
      'method': 'push/:requestId/:productId/:rpmId',
      'httpMethod': 'PUT'
    },
    stats: {
      'endpoint': '/private/queue',
      'controller': 'internal/request',
      'method': 'stats',
      'httpMethod': 'GET'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'internal/request'
    }
  },
  InternalRequest: {
    validations: true,
    lazy: true,
    channel: '/channel/internal/request',
    all: {
      'endpoint': '/private/queue',
      'controller': 'internal/request',
      'method': '',
      'httpMethod': 'GET'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'internal/request',
      'method': '',
      'httpMethod': 'POST'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'internal/request',
      'method': '',
      'httpMethod': 'PUT'
    },
    submitFeatureProposal: {
      'endpoint': '/private/queue',
      'controller': 'internal/request',
      'method': '',
      'httpMethod': 'PUT'
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'internal/request',
      'method': '',
      'httpMethod': 'DELETE'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'internal/request',
      'method': ''
    }
  },
  User: {
    lazy: true,
    channel: '/channel/users',
    instantiate: {
      'endpoint': '/private/queue',
      'controller': 'users',
      'method': 'credentials'
    },
    all: {
      'endpoint': '/private/queue',
      'controller': 'users'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'users'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'users',
      'method': 'update'
    }
  },
  RemoteProjectManager: {
    validations: true,
    lazy: true,
    channel: '/channel/remote-project-manager',
    all: {
      'endpoint': '/private/queue',
      'controller': 'remote-project-manager',
      'method': '',
      'httpMethod': 'GET'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'remote-project-manager',
      'method': '',
      'httpMethod': 'POST'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'remote-project-manager',
      'method': '',
      'httpMethod': 'PUT'
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'remote-project-manager',
      'method': '',
      'httpMethod': 'DELETE'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'remote-project-manager'
    },
    types: {
      'endpoint': '/channel',
      'controller': 'remote-project-manager',
      'method': 'types/',
      'httpMethod': 'GET'
    },
    scaffolding: {
      'endpoint': '/channel',
      'controller': 'remote-project-manager',
      'method': 'scaffolding/:type/',
      'httpMethod': 'GET'
    }
  },
  Status: {
    validations: true,
    lazy: true,
    channel: '/channel/status',
    all: {
      'endpoint': '/private/queue',
      'controller': 'status',
      'method': '',
      'httpMethod': 'GET'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'status',
      'method': '',
      'httpMethod': 'POST'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'status',
      'method': '',
      'httpMethod': 'PUT'
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'status',
      'method': '',
      'httpMethod': 'DELETE'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'status'
    }
  },
  RemoteProjects: {
    lazy: true,
    all: {
      'endpoint': '/private/queue',
      'controller': 'projects/remote'
    },
    byProduct: {
      'endpoint': '/private/queue',
      'controller': 'projects/remote',
      'method': 'by-product/:productId',
      'httpMethod': 'GET'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'projects/remote'
    }
  },
  ProductsStats: {
    all: {
      'endpoint': '/private/queue',
      'controller': 'products/stats'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'products/stats'
    }
  },
  ActiveSprints: {
    all: {
      'endpoint': '/private/queue',
      'controller': 'sprints/active'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'sprints/active'
    }
  }
};
