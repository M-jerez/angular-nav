"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var github_1 = require('../../services/github');
var router_1 = require('angular2/router');
var RepoList = (function () {
    function RepoList(github, params) {
        this.repos = github.getReposForOrg(params.get('org'));
    }
    RepoList = __decorate([
        core_1.Component({
            selector: 'repo-list',
            templateUrl: 'app/components/repo-list/repo-list.html',
            styleUrls: ['app/components/repo-list/repo-list.css'],
            providers: [],
            directives: [router_1.ROUTER_DIRECTIVES],
            pipes: []
        }), 
        __metadata('design:paramtypes', [github_1.Github, router_1.RouteParams])
    ], RepoList);
    return RepoList;
}());
exports.RepoList = RepoList;

//# sourceMappingURL=../../../maps/app/components/repo-list/repo-list.js.map
