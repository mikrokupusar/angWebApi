app.service('portalService', function ($http) {
    //CREATE new record
    this.post = function (employee) {
        var request = $http({
            method: "post",
            url: "/api/EmployeesAPI",
            data: employee
        });
        return request;
    };

    //GET single record
    this.get = function (empId) {
        return $http.get("/api/EmployeesAPI/" + empId);
    }

    //GET all record
    this.getAll = function () {
        return $http.get("/api/EmployeesAPI");
    }

    //UPDATE record
    this.put = function (empId, employee) {
        var request = $http({
            method: "put",
            url: "/api/EmployeesAPI/" + empId,
            data: employee
        });
        return request;
    }

    //DELETE record
    this.delete = function (empId) {
        var request = $http({
            method: "delete",
            url: "/api/EmployeesAPI/" + empId
        });
        return request;
    }
});