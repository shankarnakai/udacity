import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ImageController } from "./modules/image/image.controller";

@injectable()
export abstract class App {
  public abstract run(): void;
}

@injectable()
export class AppLive extends App {
  constructor(
    @inject(ImageController) private imgController: ImageController,
  ) {
    super();
  }

  public run() {
    // Init the Express application
    const app = express();

    // Set the network port
    const port = process.env.PORT || 8082;

    // Use the body parser middleware for post requests
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/", this.imgController.routes());

    // Root Endpoint
    // Displays a simple message to the user
    app.get("/", async (req, res) => {
      res.send("try GET /filteredimage?image_url={{}}");
    });

    // tslint:disable-next-line: variable-name
    app.use((err: any, _req: Request, res: Response, next: NextFunction): void => {
      // tslint:disable-next-line: no-console
      if (err) {
        console.error(err.stack);
        res.status(500).send("Sorry, we had a problem in the server. Please try later.");
      }
    });

    // Start the Server
    app.listen(port, () => {
      // tslint:disable-next-line: no-console
      console.log(`server running http://localhost:${port}`);
      // tslint:disable-next-line: no-console
      console.log(`press CTRL+C to stop server`);
    });
  }
}
