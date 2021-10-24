# Quick Online Dashboard

![Version](https://img.shields.io/badge/version-1.0-orange)
![license](https://img.shields.io/github/license/papatekken/quick-data-dashboard)
![GatsbyJS](https://img.shields.io/badge/GatsbyJS-2.23.12-blue)

- Online Dashboard reading from Excel file by using GatsbyJS

- Project for self learning GatsbyJS

## Files location
program codes are located in src folder.
Excel data file is located in src\data\.

## About
The program read a Excel file and turn that into report portal with charts and tables.
It also applied service from Auth01.com for authentication.

## How to run
1) Install [NPM] (https://www.npmjs.com/) and [GIT](https://git-scm.com/)

2) Clone this repo
    $ git clone {https://github.com/papatekken/quick-data-dashboard}
    
3) Go into folder of cloned repo

4) install the required dependencies
    $ npm install

5) register account in Auth01.com and setup a application.
   For details please check Auth01 documentation.(https://auth0.com/docs/)
   
6) create a new file [.env.develop] and [.env.production]  based on file [.env.sample]. Update the content in file from setting created in step 5.
    
7) To run the Gatsby project locally (Please read GatsbyJS documentation about how to build production-ready version)
    $ gatsby develop
    
8) The demo site should appear in browser itself

## License
[GNU AGPLv3](https://github.com/papatekken/quick-data-dashboard/blob/master/LICENSE)

## Contact
Created by [@papatekken](papatekken@gmail.com) - feel free to contact me!


