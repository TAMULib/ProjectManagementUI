app.controller('SprintBlacklistController', function ($controller, $scope, ActiveSprintsService, ApiResponseActions, RemoteProductManagerRepo, SprintBlacklistRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    $scope.sprintBlacklists = SprintBlacklistRepo.getAll();

    SprintBlacklistRepo.ready().then(function() {
        $scope.activeSprints = $scope.mapActiveSprints();
    });

    $scope.sprintBlacklistToCreate = SprintBlacklistRepo.getScaffold();
    $scope.sprintBlacklistToDelete = {};

    $scope.sprintBlacklistForms = {
        validations: SprintBlacklistRepo.getValidations(),
        getResults: SprintBlacklistRepo.getValidationResults
    };

    $scope.mapActiveSprints = function () {
        var activeSprints = ActiveSprintsService.getActiveSprints();
        var sprints = [];
        for (var i = 0; i < activeSprints.length; i++) {
            var rpi = {};
            rpi.name = activeSprints[i].name;
            rpi.scopeId = activeSprints[i].id;
            rpi.productId = activeSprints[i].remoteProductManagerId;
            sprints.push(rpi);
        }
        return sprints;
    };

    $scope.resetSprintBlacklistForms = function () {
        SprintBlacklistRepo.clearValidationResults();
        for (var key in $scope.sprintBlacklistForms) {
            if ($scope.sprintBlacklistForms[key] !== undefined && !$scope.sprintBlacklistForms[key].$pristine && $scope.sprintBlacklistForms[key].$setPristine) {
                $scope.sprintBlacklistForms[key].$setPristine();
            }
        }
        $scope.closeModal();
    };

    $scope.resetSprintBlacklistForms();

    $scope.createSprintBlacklist = function () {
        var rpi = $scope.sprintBlacklistToCreate.remoteProductInfo;
        var blacklist = {
            remoteProductInfo: {
                scopeId: rpi.scopeId,
                remoteProductManager: RemoteProductManagerRepo.findById(rpi.productId)
            }
        };
        SprintBlacklistRepo.create(blacklist).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.resetCreateSprintBlacklist();
            }
        });
    };

    $scope.resetCreateSprintBlacklist = function () {
        angular.extend($scope.sprintBlacklistToCreate, SprintBlacklistRepo.getScaffold());
        $scope.resetSprintBlacklistForms();
    };

    $scope.confirmDeleteSprintBlacklist = function (sprintBlacklist) {
        $scope.sprintBlacklistToDelete = sprintBlacklist;
        $scope.openModal('#deleteSprintBlacklistModal');
    };

    $scope.cancelDeleteSprintBlacklist = function () {
        $scope.sprintBlacklistToDelete = {};
        $scope.closeModal();
    };

    $scope.deleteSprintBlacklist = function (blacklist) {
        SprintBlacklistRepo.delete(blacklist).then(function (res) {
            if (angular.fromJson(res.body).meta.status === 'SUCCESS') {
                $scope.cancelDeleteSprintBlacklist();
            }
        });
    };

    SprintBlacklistRepo.listen([ApiResponseActions.CREATE, ApiResponseActions.DELETE, ApiResponseActions.UPDATE], function () {
        $scope.sprintBlacklists.length = 0;
        var sprintBlacklists = SprintBlacklistRepo.getAll();
        for (var i in sprintBlacklists) {
            $scope.sprintBlacklists.push(sprintBlacklists[i]);
        }
    });
});