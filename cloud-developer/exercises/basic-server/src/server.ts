import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list, buildFilter } from './cars';

(async () => {
  let cars:Car[]  = cars_list;

  //Create an express applicaiton
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 

  // Root URI call
  app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send("Welcome to the Cloud!");
  } );

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get( "/persons/:name", 
    ( req: Request, res: Response ) => {
      let { name } = req.params;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get( "/persons/", ( req: Request, res: Response ) => {
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  } );

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post( "/persons", 
    async ( req: Request, res: Response ) => {

      const { name } = req.body;

      if ( !name ) {
        return res.status(400)
                  .send(`name is required`);
      }

      return res.status(200)
                .send(`Welcome to the Cloud, ${name}!`);
  } );

  app.get("/cars", async (req: Request, res: Response) => {
      const { make, car_type, model, cost, costOperator } = req.query;
      const filter = buildFilter(make, car_type, model, parseInt(cost), costOperator)
      const filteredCars = cars_list.filter(filter)
      if(filteredCars.length == 0) {
          return res.status(404).send("Not found cars that match the currenct criteria");
      }

      return res.status(200).type('json').send(filteredCars);
  })

  app.get("/cars/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = cars_list.filter(car => car.id == id)

      if(result.length == 0) {
          return res.status(404).send(`Car with id($id) not found`);
      }

      return res.status(200).send(result[0]);
  })

  app.post("/cars", async (req: Request, res: Response) => {
      const params = req.body
      console.log("params", params);
      if(
          !params.id
          || !params.type
          || !params.model
          || !params.cost
      ) {
          return res.status(403).send("Bad request, expected id, type, model and cost fields")
      }

      const newCar = {
          id: params.id,
          type: params.type,
          model: params.model,
          cost: params.cost,
      }

      cars_list.push(newCar)
      return res.status(200).send(newCar)
  })

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
