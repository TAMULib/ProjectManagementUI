app.model("Project", function Project(RemoteProjectService) {
    return function Project() {

        var project = this;

        project.before(function () {
            if (project.remoteProjectManager && project.scopeId) {
                RemoteProjectService.getByScopeId(project.remoteProjectManager.id, project.scopeId).then(function (remoteProject) {
                    angular.extend(project, {
                        remoteProject: remoteProject
                    });
                });
            }
        });

        return project;
    };
});