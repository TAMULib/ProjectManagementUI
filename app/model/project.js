app.model("Project", function Project(ProjectsStatsService, RemoteProjectsService) {
    return function Project() {

        var project = this;

        project.before(function () {
            if (project.remoteProjectManager && project.scopeId) {
                ProjectsStatsService.getById(project.id).then(function (projectStats) {
                    angular.extend(project, {
                        stats: projectStats
                    });
                });
            }
        });

        project.before(function () {
            if (project.remoteProjectManager && project.scopeId) {
                RemoteProjectsService.getByScopeId(project.remoteProjectManager.id, project.scopeId).then(function (remoteProject) {
                    angular.extend(project, {
                        remoteProject: remoteProject
                    });
                });
            }
        });

        return project;
    };
});