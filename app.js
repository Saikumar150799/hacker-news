var app = angular.module('myApp', ['angularUtils.directives.dirPagination'])
    .controller('hackerNews', function ($scope, $http,) {
        $scope.topStories = 'https://hacker-news.firebaseio.com/v0/topstories.json'
        $newsItemUrl = 'https://hacker-news.firebaseio.com/v0/item/'
        $scope.data = []

        $http.get($scope.topStories)
            .then(function (response) {
                response.data.forEach((id) => {
                    $http.get($newsItemUrl + `${id}.json`)
                        .then((res) => {
                            $scope.data.push(res.data)

                        })
                })
            })

    })
