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
  RemoteProductManager: {
    validations: true,
    lazy: true,
    channel: '/channel/remote-product-manager',
    all: {
      'endpoint': '/private/queue',
      'controller': 'remote-product-manager',
      'method': '',
      'httpMethod': 'GET'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'remote-product-manager',
      'method': '',
      'httpMethod': 'POST'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'remote-product-manager',
      'method': '',
      'httpMethod': 'PUT'
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'remote-product-manager',
      'method': '',
      'httpMethod': 'DELETE'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'remote-product-manager'
    },
    types: {
      'endpoint': '/channel',
      'controller': 'remote-product-manager',
      'method': 'types/',
      'httpMethod': 'GET'
    },
    scaffolding: {
      'endpoint': '/channel',
      'controller': 'remote-product-manager',
      'method': 'scaffolding/:type/',
      'httpMethod': 'GET'
    }
  },
  SprintBlacklist: {
    validations: true,
    lazy: true,
    channel: '/channel/sprint-blacklist',
    all: {
      'endpoint': '/private/queue',
      'controller': 'sprint-blacklist',
      'method': '',
      'httpMethod': 'GET'
    },
    create: {
      'endpoint': '/private/queue',
      'controller': 'sprint-blacklist',
      'method': '',
      'httpMethod': 'POST'
    },
    update: {
      'endpoint': '/private/queue',
      'controller': 'sprint-blacklist',
      'method': '',
      'httpMethod': 'PUT'
    },
    remove: {
      'endpoint': '/private/queue',
      'controller': 'sprint-blacklist',
      'method': '',
      'httpMethod': 'DELETE'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'sprint-blacklist'
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
  RemoteProducts: {
    lazy: true,
    all: {
      'endpoint': '/private/queue',
      'controller': 'products/remote'
    },
    byProduct: {
      'endpoint': '/private/queue',
      'controller': 'products',
      'method': 'remote-products/:productId',
      'httpMethod': 'GET'
    },
    listen: {
      'endpoint': '/channel',
      'controller': 'products/remote'
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
