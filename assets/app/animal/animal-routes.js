(function(ng) {
    
    'use strict';

    ng.module('sails-animals-example')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/animals', '/animals/list');

            $stateProvider
                .state('animals', {
                    abstract: true,
                    url: '/animals',
                    controller: 'AnimalCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        AnimalDefinition : function getAnimalDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('animals');
                        },
                        Animals: function animalsListResolve(Restangular) {
                            return Restangular.all('animals').getList();
                        }
                    },
                })
                .state('animals.list', {
                    url: '/list',
                    templateUrl: 'app/animal/animal-list.html'
                })
                .state('animals.add', {
                    url: '/add',
                    templateUrl: 'app/animal/animal-add-edit.html'
                })
                .state('animals.info', {
                    url: '/info/:id',
                    controller: 'SingleAnimalCtrl',
                    templateUrl: 'app/animal/animal-info.html'
                })
                .state('animals.edit', {
                    url: '/edit/:id',
                    controller: 'SingleAnimalCtrl',
                    templateUrl: 'app/animal/animal-add-edit.html'
                });
        });
})(
    window.angular
);
