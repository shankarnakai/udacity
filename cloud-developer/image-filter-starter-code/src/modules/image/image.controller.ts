import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { ImageService } from "./image.service";

/**************************************************************************** */
// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
/**************************************************************************** */

@injectable()
export abstract class ImageController {
  public abstract filterImage(req: Request, res: Response): void;
  public abstract routes(): Router;
}

@injectable()
export class ImageControllerLive extends ImageController {
  constructor(@inject(ImageService) private imgService: ImageService) {
    super();
  }

  public filterImage(req: Request, res: Response): void {
    throw new Error("Method not implemented.");
  }

  public routes(): Router {
    const router = Router();

    // define the home page route
    router.get("/filteredimage", this.filterImage);
    return router;
  }
}
