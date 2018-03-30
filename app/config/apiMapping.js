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
        },
        types: {
            'endpoint': '/channel',
            'controller': 'version-management-software',
            'method': 'types/',
            'httpMethod': 'GET'
        },
        scaffolding: {
            'endpoint': '/channel',
            'controller': 'version-management-software',
            'method': 'scaffolding/:type/',
            'httpMethod': 'GET'
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