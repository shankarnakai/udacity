# Udagram Image Filtering Microservice (Shankar)

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project contain [The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code) based in the starter code provided by Udacity.

### Architecture
Structure the project using some concepts of MVVC architecture Pattern and use Jest for unit test instead integration test with Postman.

Inside of the module we are separating:

- Context: Responsible for the implementation detail, and bussines logic
  of the action that the module contain. It will be used by the
  controller.

- Model: Represent the schema of the data present in the application.

- Controller: Responsible for hosting application logic codes and
  handling the relation of other components

- Middlware: Used to process a request before the controller, can be use
  to filter, protected, add data to the request.

- Services: Responsible for process data or have a general
  funcitonality.

- Module: Mechanism to group components, services, models, controller, middleware and contexts that are related,
  in such a way that can be combined with other modules to define an application.


### Additional libraries
- [Inversify JS](http://inversify.io/) - InversifyJS is a lightweight (4KB) inversion of control (IoC) container for TypeScript
- [Jest](https://jestjs.io/en/) - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

### Requirements
- Node 12.16.1

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

It will run in the port 8080 by default

### Envirionment Variables
- `PORT` - set the port that the applicatino will run. default: 8080 

### Elastic BeansTalk 

Url: http://code-dev.us-east-1.elasticbeanstalk.com/

Filtered Image Url: http://code-dev.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://img.ibxk.com.br/2018/11/27/27100323605001.jpg

Deployment Screenshoot:  
https://github.com/shankarnakai/udacity/blob/feature/img-filter/cloud-developer/image-filter-starter-code/deployment_screenshots/

