##Contribution and Development Docs

This guide contains steps on how to  setup, contribute, build and publish the Flutterwave Angular Sdk.

The library is generated using Angular CLI V1.1.0 , this enables  building  a library that works on Angular version 4 to latest version.

The library is built using the  'ng-packagr (v1.5.2)'  library. This enables building angular >=4 libraries that works on previous and  modern version of  angular projects.


###Get started

* Pull down project from github.

* Run  'npm install' in project root folder
 ```ignorelang
 npm install
```

###File Structure
The library code files (Flutterwave module) are located at 
 ```ignorelang
 ./src/app/modules
```

###Code Contribution
Please follow the guidelines below when adding features, components, services to the library

* Library files should be in the './src/app/modules'  folder

* All components and services should be attached to the flutterwave.module.ts

* All components, services, modules, models  etc  to be exposed by the Library must be exported in the 
  './public_api.ts' file


###Build And Publish
 Increase the version in package.json, then build the project.
To build, run :

 ```javascript
npm run build 
//npx ng-packagr -p ng-package.json
```

To publish, run 

 ```javascript
npm run publish 
// cd dist && npm publish
```
