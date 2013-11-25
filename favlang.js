'use strict';

// It just takes the lang with the max number of projects.
// In case of draw, it takes the first one.
// It doesn't do oauth, so you can run it just few times before
// getting your IP banned.
//
// To run it:
// $ npm install lodash request
// $ node favlang.js username


var request = require('request');
var _ = require('lodash');
var util = require('util');

var REPOS_URL = 'https://api.github.com/users/%s/repos';

function printFavLang(username) {

    var opts = {
        url: util.format(REPOS_URL, username),
        json: true
    };

    request(opts, function (error, response, repos) {
        if (!error && response.statusCode === 200) {
            var langs = _.pluck(repos, 'language');

            // removes undefined 'null' languages
            var cleanLangs = langs.filter(function(lang) { return lang; });

            var groups = _.groupBy(cleanLangs);

            if(_.size(groups) === 0) {
                console.log('No projects with dominant programming language found.');
                process.exit(1);
            }

            var fav = _.first(_.max(groups, function(group) {
                return group.length;
            }));

            // Some output if you want it:
            //_.forEach(groups, function(value, key) {
            //    var len = value.length;
            //    var str = key+': '+len + ' ' + (len == 1 ? 'project' : 'projects');
            //    console.log(str);
            //});

            console.log(fav);
            process.exit(0);
        }
        else {
            console.error("Cannot find user: "+username);
            process.exit(1);
        }
    });
}

function main()  {
    if(process.argv.length <= 2) {
        console.log("Usage: $ node favlang.js username");
        process.exit(1);
    }
    var username = process.argv[2];
    printFavLang(username);
}

main();
