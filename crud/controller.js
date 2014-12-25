app.controller('portalCtrl', function ($scope, portalService) {
    $scope.IsNewRecord = 1; //flag za novi unos

    loadRecords();
    //GET
    function loadRecords() {
        var promiseGet = portalService.getAll();
        promiseGet.then(function (pl) { $scope.Employees = pl.data },
            function (err) {
                $log.error('Greska u ucitavanju employees' + err);

            });
    }

    //SAVE + UPDATE
    $scope.save = function () {
        var employee = {
            EmpId: $scope.EmpId,
            EmpName: $scope.EmpName,
            Salary: $scope.Salary,
            DeptName: $scope.DeptName,
            Designation: $scope.Designation
        };
        if ($scope.IsNewRecord === 1) {
            var promisePost = portalService.post(employee);
            promisePost.then(function (pl) {
                $scope.EmpId = pl.EmpId;
                loadRecords();
            }, function (err) {
                console.log("Error " + err);
            });
        } else {
            var promisePut = portalService.put($scope.EmpId, employee);
            promisePut.then(function (pl) {
                $scope.message = "Updated Successfully";
                loadRecords();
            }, function (err) {
                console.log("Error " + err);
            });
        }
    };

    //DELETE
    $scope.delete = function () {
        var promiseDelete = portalService.delete($scope.EmpId);
        promiseDelete.then(function (pl) {
            $scope.message = "Deleted";
            $scope.EmpId = 0;
            $scope.EmpName = "";
            $scope.Salary = 0;
            $scope.DeptName = "";
            $scope.Designation = "";
            loadRecords();
        }, function (err) {
            console.log("Error " + err);
        });
    }

    //GET single
    $scope.get = function (emp) {
        var promiseGetSingle = portalService.get(emp.EmpId);
        promiseGetSingle.then(function (pl) {
            var res = pl.data;
            $scope.EmpId = res.EmpId;
            $scope.EmpName = res.EmpName;
            $scope.Salary = res.Salary;
            $scope.DeptName = res.DeptName;
            $scope.Designation = res.Designation;
            $scope.IsNewRecord = 0;
        }, function (err) {
            console.log("Error" + err);
        });
    }

    //CLEAR
    $scope.clear = function () {
        $scope.IsNewRecord = 1;
        $scope.EmpId = 0;
        $scope.EmpName = "";
        $scope.Salary = 0;
        $scope.DeptName = "";
        $scope.Designation = "";
    }
});

