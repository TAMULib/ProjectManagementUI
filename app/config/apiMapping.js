// CONVENTION: must match model name, case sensitive
var apiMapping = {
    Project: {
        validations: true,
        lazy: true,
        channel: '/channel/projects',
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
        all: {
            'endpoint': '/private/queue',
            'controller': 'remote-projects'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'remote-projects'
        }
    },
    ActiveSprints: {
        all: {
            'endpoint': '/private/queue',
            'controller': 'active-sprints'
        },
        listen: {
            'endpoint': '/channel',
            'controller': 'active-sprints'
        }
    }
};