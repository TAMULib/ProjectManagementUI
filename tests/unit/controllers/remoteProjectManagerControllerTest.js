describe('controller: RemoteProjectManagerController', function () {

    var scope, controller;

    beforeEach(module('core'));
    beforeEach(module('app'));
    beforeEach(module('app/views/modals/addRemoteProjectManagerModal.html'));
    beforeEach(module('mock.remoteProjectManager'));
    beforeEach(module('mock.remoteProjectManagerRepo'));

    beforeEach(inject(function ($controller, $rootScope, $templateCache, _$compile_, _$filter_, _$q_, _ModalService_, _RemoteProjectManager_, _RemoteProjectManagerRepo_) {
        installPromiseMatchers();
        scope = $rootScope.$new();
        $compile = _$compile_;
        $q = _$q_;
        cache = $templateCache;
        RemoteProjectManager = _RemoteProjectManager_;
        RemoteProjectManagerRepo = _RemoteProjectManagerRepo_;
        controller = $controller('RemoteProjectManagerController', {
            $scope: scope,
            $compile: _$compile_,
            $filter: _$filter_,
            ModalService: _ModalService_,
            RemoteProjectManager: _RemoteProjectManager_,
            RemoteProjectManagerRepo: _RemoteProjectManagerRepo_
        });
    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('resetRemoteProjectManagerForms should be defined', function () {
            expect(scope.resetRemoteProjectManagerForms).toBeDefined();
            expect(typeof scope.resetRemoteProjectManagerForms).toEqual('function');
        });
        it('createRemoteProjectManager should be defined', function () {
            expect(scope.createRemoteProjectManager).toBeDefined();
            expect(typeof scope.createRemoteProjectManager).toEqual('function');
        });
        it('cancelCreateRemoteProjectManager should be defined', function () {
            expect(scope.cancelCreateRemoteProjectManager).toBeDefined();
            expect(typeof scope.cancelCreateRemoteProjectManager).toEqual('function');
        });
        it('editRemoteProjectManager should be defined', function () {
            expect(scope.editRemoteProjectManager).toBeDefined();
            expect(typeof scope.editRemoteProjectManager).toEqual('function');
        });
        it('updateRemoteProjectManager should be defined', function () {
            expect(scope.updateRemoteProjectManager).toBeDefined();
            expect(typeof scope.updateRemoteProjectManager).toEqual('function');
        });
        it('cancelEditRemoteProjectManager should be defined', function () {
            expect(scope.cancelEditRemoteProjectManager).toBeDefined();
            expect(typeof scope.cancelEditRemoteProjectManager).toEqual('function');
        });
        it('confirmDeleteRemoteProjectManager should be defined', function () {
            expect(scope.confirmDeleteRemoteProjectManager).toBeDefined();
            expect(typeof scope.confirmDeleteRemoteProjectManager).toEqual('function');
        });
        it('cancelDeleteRemoteProjectManager should be defined', function () {
            expect(scope.cancelDeleteRemoteProjectManager).toBeDefined();
            expect(typeof scope.cancelDeleteRemoteProjectManager).toEqual('function');
        });
        it('deleteRemoteProjectManager should be defined', function () {
            expect(scope.deleteRemoteProjectManager).toBeDefined();
            expect(typeof scope.deleteRemoteProjectManager).toEqual('function');
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('resetRemoteProjectManagerForms should reset Remote Project Manager forms', function () {

            var modal = angular.element(cache.get('app/views/modals/addRemoteProjectManagerModal.html'));
            modal = $compile(modal)(scope);
            scope.$digest();
            var form = scope.remoteProjectManagerForms.create;
            form.$setDirty();

            expect(form.$dirty).toEqual(true);

            scope.resetRemoteProjectManagerForms();

            expect(form.$pristine).toEqual(true);
            expect(form.$dirty).toEqual(false);
        });

        it('createRemoteProjectManager should create a new Remote Project Manager', function () {
            var length = mockRemoteProjectManageres.length + 1;
            var newRemoteProjectManager = {
                "id": 4,
                "name": "Test 4",
                "type": "VERSION_ONE",
                "settings": {
                    "password": "password4",
                    "url": "url4",
                    "username": "username4"
                }
            };
            scope.remoteProjectManagerToCreate = newRemoteProjectManager;
            scope.createRemoteProjectManager();

            expect(RemoteProjectManagerRepo.findById(newRemoteProjectManager.id)).toEqual(newRemoteProjectManager);
        });

        it('cancelCreateRemoteProjectManager should call resetRemoteProjectManagerForms() and clear out the fields', function () {
            var newRemoteProjectManager = {
                "id": 4,
                "name": "Test 4",
                "type": "VERSION_ONE",
                "settings": {
                    "password": "password4",
                    "url": "url4",
                    "username": "username4"
                }
            };
            var scaffold = {
                "id": "",
                "name": "",
                "Type": "VERSION_ONE",
                "settings": {
                    "password": "password4",
                    "url": "url4",
                    "username": "username4"
                }
            };
            spyOn(scope, 'resetRemoteProjectManagerForms');
            spyOn(RemoteProjectManagerRepo, 'getScaffold').and.returnValue(scaffold);

            scope.remoteProjectManagerToCreate = newRemoteProjectManager;
            scope.cancelCreateRemoteProjectManager();

            expect(scope.remoteProjectManagerToCreate.name).toEqual('');
            expect(scope.resetRemoteProjectManagerForms).toHaveBeenCalled();
        });

        it('editRemoteProjectManager should set the remoteProjectManagerToEdit and open the modal', function () {
            spyOn(scope, 'openModal');
            scope.editRemoteProjectManager(mockRemoteProjectManageres[0]);

            expect(scope.remoteProjectManagerToEdit).toEqual(mockRemoteProjectManageres[0]);
            expect(scope.openModal).toHaveBeenCalled();
        });

        it('updateRemoteProjectManager should call dirty and save on the VMS, and then call cancelEditRemoteProjectManager', function () {
            spyOn(scope, 'cancelEditRemoteProjectManager');
            spyOn(RemoteProjectManager, 'dirty');
            deferred = $q.defer();
            spyOn(RemoteProjectManager, 'save').and.returnValue(deferred.promise);
            scope.remoteProjectManagerToEdit = RemoteProjectManager;
            scope.updateRemoteProjectManager();
            deferred.resolve();
            scope.$apply();

            expect(scope.cancelEditRemoteProjectManager).toHaveBeenCalled();
            expect(RemoteProjectManager.dirty).toHaveBeenCalledWith(true);
            expect(RemoteProjectManager.save).toHaveBeenCalled();
        });

        it('cancelEditRemoteProjectManager should clear out remoteProjectManagerToEdit and call resetRemoteProjectManagerForms', function () {
            spyOn(scope, 'resetRemoteProjectManagerForms');
            scope.remoteProjectManagerToEdit = RemoteProjectManager;
            scope.cancelEditRemoteProjectManager();

            expect(scope.remoteProjectManagerToEdit.name).not.toBeDefined();
            expect(scope.resetRemoteProjectManagerForms).toHaveBeenCalled();
        });

        it('confirmDeleteRemoteProjectManager should set the remoteProjectManagerToDelete and open the modal', function () {
            spyOn(scope, 'openModal');
            scope.confirmDeleteRemoteProjectManager(mockRemoteProjectManageres[0]);

            expect(scope.openModal).toHaveBeenCalled();
            expect(scope.remoteProjectManagerToDelete).toEqual(mockRemoteProjectManageres[0]);
        });

        it('cancelDeleteRemoteProjectManager should clear remoteProjectManagerToDelete and close the modal', function () {
            spyOn(scope, 'closeModal');
            scope.remoteProjectManagerToDelete = mockRemoteProjectManageres[0];
            scope.cancelDeleteRemoteProjectManager();

            expect(scope.closeModal).toHaveBeenCalled();
            expect(scope.remoteProjectManagerToDelete).toEqual({});
        });

        it('deleteRemoteProjectManager should call the repo delete method and then call cancelDeleteRemoteProjectManager when successful', function () {
            scope.remoteProjectManagerToDelete = Project;
            deferred = $q.defer();
            spyOn(RemoteProjectManagerRepo, 'delete').and.returnValue(deferred.promise);
            spyOn(scope, 'cancelDeleteRemoteProjectManager');
            scope.deleteRemoteProjectManager(RemoteProjectManager);
            deferred.resolve({
                body: angular.toJson({
                    meta: {
                        status: "SUCCESS"
                    }
                })
            });
            scope.$apply();

            expect(RemoteProjectManagerRepo.delete).toHaveBeenCalledWith(RemoteProjectManager);
            expect(scope.cancelDeleteRemoteProjectManager).toHaveBeenCalled();
        });

    });

});