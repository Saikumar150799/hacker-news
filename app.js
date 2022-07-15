var app = angular.module('myApp', ['angularUtils.directives.dirPagination', "ngRoute"])
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "./story.html",
            controller: "hackerNews"

        })
        .when('/jobs', {
            templateUrl: "./jobs.html",
            controller: "jobController"

        })
        .when('/ask', {
            templateUrl: "./ask.html",
            controller: "askController"

        })
        .when('/show', {
            templateUrl: "./shows.html",
            controller: "showController"

        })
        .otherwise({
            redirectTo:'/'
        })
}])

.controller("showController", function ($scope, $http) {

    $scope.showUrl = 'https://hacker-news.firebaseio.com/v0/showstories.json'
    $scope.showStories = 'https://hacker-news.firebaseio.com/v0/item/'
    $scope.showStoriesList = []

    $http.get($scope.showUrl)
        .then(function (res) {
            console.log('started')
            res.data.forEach(function (id) {
                $http.get($scope.showStories + `${id}.json`)
                    .then(function (res) {
                        console.log("show", res)
                        $scope.showStoriesList.push(res.data)
                    }).catch(function (errr) {
                        console.log(err)
                    })
            })
        })
})

.controller("askController", function ($scope, $http) {

    $scope.askUrl = 'https://hacker-news.firebaseio.com/v0/askstories.json'
    $scope.askStories = 'https://hacker-news.firebaseio.com/v0/item/'
    $scope.askStoriesList = []

    $http.get($scope.askUrl)
        .then(function (res) {
            console.log('started')
            res.data.forEach(function (id) {
                $http.get($scope.askStories + `${id}.json`)
                    .then(function (res) {
                        console.log("ask", res)
                        $scope.askStoriesList.push(res.data)
                    }).catch(function (errr) {
                        console.log(err)
                    })
            })
        })
})
    .controller("jobController", function ($scope, $http) {

        $scope.jobUrl = 'https://hacker-news.firebaseio.com/v0/jobstories.json'
        $scope.jobStories = 'https://hacker-news.firebaseio.com/v0/item/'
        $scope.jobStoriesList = []

        $http.get($scope.jobUrl)
            .then(function (res) {
                console.log(res.data)
                res.data.forEach(function (id) {
                    $http.get($scope.jobStories + `${id}.json`)
                        .then(function (res) {
                            $scope.jobStoriesList.push(res.data)
                            console.log("job", res)
                        }).catch(function (errr) {
                            console.log(err)
                        })
                })
            })
    })
    .controller('hackerNews', ['$scope', '$http', function ($scope, $http,) {
        $scope.topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json'
        $newsItemUrl = 'https://hacker-news.firebaseio.com/v0/item/'
        $scope.data = []
        $scope.updatePage = updatePage;
        $scope.startPageNumber;
        $scope.error = false
        $http.get($scope.topStories)
            .then(function (response) {
                response.data.forEach(function (id) {
                    $scope.$emit('LOAD')
                    $http.get($newsItemUrl + `${id}.json`)
                        .then(function (res) {
                            console.log('done')
                            $scope.data.push(res.data)
                            // setTimeout(() => {
                            $scope.$emit('UNLOAD')
                            // }, 5000)
                        }).catch(function (err) {
                            $scope.error = true
                            $scope.$emit('UNLOAD')
                        })
                })
            })

        function updatePage(newPageNumber, oldPageNumber) {
            $scope.startPageNumber = 17 * (newPageNumber - 1) + 1
            // console.log($scope.startPageNumber)
        }

    }])
    .controller('appController', function ($scope) {
        $scope.$on('LOAD', function () { $scope.loading = true })
        $scope.$on('UNLOAD', function () { $scope.loading = false })
    })

