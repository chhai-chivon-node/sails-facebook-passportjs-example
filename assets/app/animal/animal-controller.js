(function(ng, _) {

    'use strict';

    ng.module('sails-animals-example')
        .controller('AnimalCtrl', AnimalCtrl)
        .controller('SingleAnimalCtrl', SingleAnimalCtrl);

    function AnimalCtrl($scope, $state, Animals, AnimalDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('animals'.toLowerCase());
        
        $scope.animals = Animals;
        $scope.model_def = AnimalDefinition.originalElement;
        $scope.animal = {};

        $scope.remove = function remove(animal) {
            animal = animal || $scope.animal;
            if (window.confirm('Are you sure you want to delete this animal?')) {
                return resourceService.remove(animal, $scope.animals);
            }
        };

        $scope.save = function save(animal) {
            animal = animal || $scope.animal;
            return resourceService.save(animal, $scope.animals)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleAnimalCtrl($scope, $stateParams, Animals, AnimalDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.animal = _.find(Animals, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
