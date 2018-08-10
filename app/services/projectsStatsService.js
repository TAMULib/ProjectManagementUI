app.service('ProjectsStatsService', function ($q, ProjectRepo, WsApi) {

    var projectsStats = [];

    var defer = $q.defer();

    var process = function (response) {
        var apiRes = angular.fromJson(response.body);
        if (apiRes.meta.status === 'SUCCESS') {
            angular.extend(projectsStats, apiRes.payload['ArrayList<ProjectStats>']);
            defer.resolve();
            ProjectRepo.reset();
        } else {
            console.error(apiRes.meta);
            throw "Unable to retrieve remote projects";
        }
    };

    WsApi.listen(apiMapping.ProjectsStats.listen).then(null, null, function (response) {
        process(response);
    });

    this.refreshProjectsStats = function () {
        WsApi.fetch(apiMapping.ProjectsStats.all).then(function (response) {
            process(response);
        });
    };

    this.getProjectsStats = function () {
        return projectsStats;
    };

    this.getById = function (id) {
        return $q(function (resolve, reject) {
            this.ready.then(function () {
                for (var i in projectsStats) {
                    if (projectsStats[i].id == id) {
                        resolve(projectsStats[i]);
                    }
                }
            });
        }.bind(this));
    };

    this.refreshProjectsStats();

    this.ready = defer.promise;

});