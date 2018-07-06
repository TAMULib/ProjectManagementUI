app.model("Project", function Project(RemoteProjectService) {
    return function Project() {

        var project = this;

        project.before(function () {
            RemoteProjectService.getByScopeId(project.remoteProjectManager.id, project.scopeId).then(function (remoteProject) {
                angular.extend(project, {
                    remoteProject: remoteProject
                });
            });
        });

        return project;
    };
});