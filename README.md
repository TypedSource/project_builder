# TypedSource - Webpage entwicklung

## Intallation

You need to have installed npm with some global packages first.

    npm install grunt --global
    npm install typings --global
    npm install typescript --global

if you have done this one time on your machine you can use the installation of the project:

    npm install
    typings install dt~jquery --global --save
    grunt init

there is also a task with browser syncronization running on localhost:3000 and watch for changes
on html, typescript and less files.

    grunt auto