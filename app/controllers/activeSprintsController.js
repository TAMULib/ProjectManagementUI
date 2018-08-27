app.controller('ActiveSprintsController', function ($controller, $sce, $scope, ActiveSprintsService, StatusRepo) {

    angular.extend(this, $controller('AbstractController', {
        $scope: $scope
    }));

    if (sessionStorage.selected === undefined) {
        sessionStorage.selected = 0;
    }

    var trusted = {};

    $scope.statuses = StatusRepo.getAll();

    $scope.activeSprints = ActiveSprintsService.getActiveSprints();

    $scope.select = function (index) {
        sessionStorage.selected = index;
    };

    $scope.kanbanHeader = function () {
        return $scope.getSelectedSprint() ? $scope.getSelectedSprint().project + ": " + $scope.getSelectedSprint().name : "Select Sprint Above";
    };

    $scope.getSprintEstimateTotal = function (sprint) {
        var total = 0;
        for (var i in sprint.cards) {
            var card = sprint.cards[i];
            if (card.estimate) {
                total += card.estimate;
            }
        }
        return total;
    };

    $scope.getStatusEstimateTotal = function (status) {
        var total = 0;
        var sprint = $scope.getSelectedSprint();
        for (var i in sprint.cards) {
            var card = sprint.cards[i];
            if (card.status === status.identifier && card.estimate) {
                total += card.estimate;
            }
        }
        return total;
    };

    $scope.getAvatarUrl = function (assignee) {
        return appConfig.webService + "/images/" + assignee.avatar;
    };

    $scope.getHtmlContent = function (content) {
        return trusted[content] || (trusted[content] = $sce.trustAsHtml(content));
    };

    $scope.getSelectedSprint = function () {
        return $scope.activeSprints.length > 0 ? $scope.activeSprints[sessionStorage.selected] : undefined;
    };

    ActiveSprintsService.updated.then(null, null, function () {
        if ($scope.activeSprints.length > 0) {
            while (sessionStorage.selected >= $scope.activeSprints.length) {
                sessionStorage.selected--;
            }
            $scope.select(sessionStorage.selected);
        }
    });

});