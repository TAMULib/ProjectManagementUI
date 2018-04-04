describe('controller: VersionManagementSoftwareController', function () {

    var scope, controller;

    beforeEach(module('core'));
    beforeEach(module('app'));
    beforeEach(module('app/views/modals/addVmsModal.html'));
    beforeEach(module('mock.versionManagementSoftware'));
    beforeEach(module('mock.versionManagementSoftwareRepo'));

    beforeEach(inject(function ($controller, $rootScope, $templateCache, _$compile_, _$filter_, _$q_, _ModalService_, _VersionManagementSoftware_, _VersionManagementSoftwareRepo_) {
        installPromiseMatchers();
        scope = $rootScope.$new();
        $compile = _$compile_;
        $q = _$q_;
        cache = $templateCache;
        VersionManagementSoftware = _VersionManagementSoftware_;
        VersionManagementSoftwareRepo = _VersionManagementSoftwareRepo_;
        controller = $controller('VersionManagementSoftwareController', {
            $scope: scope,
            $compile: _$compile_,
            $filter: _$filter_,
            ModalService: _ModalService_,
            VersionManagementSoftware: _VersionManagementSoftware_,
            VersionManagementSoftwareRepo: _VersionManagementSoftwareRepo_
        });
    }));

    describe('Is the controller defined', function () {
        it('should be defined', function () {
            expect(controller).toBeDefined();
        });
    });

    describe('Are the scope methods defined', function () {
        it('resetVmsForms should be defined', function () {
            expect(scope.resetVmsForms).toBeDefined();
            expect(typeof scope.resetVmsForms).toEqual('function');
        });
        it('createVms should be defined', function () {
            expect(scope.createVms).toBeDefined();
            expect(typeof scope.createVms).toEqual('function');
        });
        it('cancelCreateVms should be defined', function () {
            expect(scope.cancelCreateVms).toBeDefined();
            expect(typeof scope.cancelCreateVms).toEqual('function');
        });
        it('editVms should be defined', function () {
            expect(scope.editVms).toBeDefined();
            expect(typeof scope.editVms).toEqual('function');
        });
        it('updateVms should be defined', function () {
            expect(scope.updateVms).toBeDefined();
            expect(typeof scope.updateVms).toEqual('function');
        });
        it('cancelEditVms should be defined', function () {
            expect(scope.cancelEditVms).toBeDefined();
            expect(typeof scope.cancelEditVms).toEqual('function');
        });
        it('confirmDeleteVms should be defined', function () {
            expect(scope.confirmDeleteVms).toBeDefined();
            expect(typeof scope.confirmDeleteVms).toEqual('function');
        });
        it('cancelDeleteVms should be defined', function () {
            expect(scope.cancelDeleteVms).toBeDefined();
            expect(typeof scope.cancelDeleteVms).toEqual('function');
        });
        it('deleteVms should be defined', function () {
            expect(scope.deleteVms).toBeDefined();
            expect(typeof scope.deleteVms).toEqual('function');
        });
    });

    describe('Do the scope methods work as expected', function () {
        it('resetVmsForms should reset Version Management Software forms', function () {

            var modal = angular.element(cache.get('app/views/modals/addVmsModal.html'));
            modal = $compile(modal)(scope);
            scope.$digest();
            var form = scope.vmsForms.create;
            form.$setDirty();

            expect(form.$dirty).toEqual(true);

            scope.resetVmsForms();

            expect(form.$pristine).toEqual(true);
            expect(form.$dirty).toEqual(false);
        });

        it('createVms should create a new Version Management Software', function () {
            var length = mockVmses.length + 1;
            var newVms = {
                "id": 4,
                "name": "Test 4",
                "type": "VERSION_ONE",
                "settings": {
                    "password": "password4",
                    "url": "url4",
                    "username": "username4"
                }
            };
            scope.vmsToCreate = newVms;
            scope.createVms();

            expect(VersionManagementSoftwareRepo.findById(newVms.id)).toEqual(newVms);
        });

        it('cancelCreateVms should call resetVmsForms() and clear out the fields', function () {
            var newVms = {
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
            spyOn(scope, 'resetVmsForms');
            spyOn(VersionManagementSoftwareRepo, 'getScaffold').and.returnValue(scaffold);

            scope.vmsToCreate = newVms;
            scope.cancelCreateVms();

            expect(scope.vmsToCreate.name).toEqual('');
            expect(scope.resetVmsForms).toHaveBeenCalled();
        });

        it('editVms should set the vmsToEdit and open the modal', function () {
            spyOn(scope, 'openModal');
            scope.editVms(mockVmses[0]);

            expect(scope.vmsToEdit).toEqual(mockVmses[0]);
            expect(scope.openModal).toHaveBeenCalled();
        });

        it('updateVms should call dirty and save on the VMS, and then call cancelEditVms', function () {
            spyOn(scope, 'cancelEditVms');
            spyOn(VersionManagementSoftware, 'dirty');
            deferred = $q.defer();
            spyOn(VersionManagementSoftware, 'save').and.returnValue(deferred.promise);
            scope.vmsToEdit = VersionManagementSoftware;
            scope.updateVms();
            deferred.resolve();
            scope.$apply();

            expect(scope.cancelEditVms).toHaveBeenCalled();
            expect(VersionManagementSoftware.dirty).toHaveBeenCalledWith(true);
            expect(VersionManagementSoftware.save).toHaveBeenCalled();
        });

        it('cancelEditVms should clear out vmsToEdit and call resetVmsForms', function () {
            spyOn(scope, 'resetVmsForms');
            scope.vmsToEdit = VersionManagementSoftware;
            scope.cancelEditVms();

            expect(scope.vmsToEdit.name).not.toBeDefined();
            expect(scope.resetVmsForms).toHaveBeenCalled();
        });

        it('confirmDeleteVms should set the vmsToDelete and open the modal', function () {
            spyOn(scope, 'openModal');
            scope.confirmDeleteVms(mockVmses[0]);

            expect(scope.openModal).toHaveBeenCalled();
            expect(scope.vmsToDelete).toEqual(mockVmses[0]);
        });

        it('cancelDeleteVms should clear vmsToDelete and close the modal', function () {
            spyOn(scope, 'closeModal');
            scope.vmsToDelete = mockVmses[0];
            scope.cancelDeleteVms();

            expect(scope.closeModal).toHaveBeenCalled();
            expect(scope.vmsToDelete).toEqual({});
        });

        it('deleteVms should call the repo delete method and then call cancelDeleteVms when successful', function () {
            scope.vmsToDelete = Project;
            deferred = $q.defer();
            spyOn(VersionManagementSoftwareRepo, 'delete').and.returnValue(deferred.promise);
            spyOn(scope, 'cancelDeleteVms');
            scope.deleteVms(VersionManagementSoftware);
            deferred.resolve({
                body: angular.toJson({
                    meta: {
                        status: "SUCCESS"
                    }
                })
            });
            scope.$apply();

            expect(VersionManagementSoftwareRepo.delete).toHaveBeenCalledWith(VersionManagementSoftware);
            expect(scope.cancelDeleteVms).toHaveBeenCalled();
        });

    });

});