import { Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { ImageContext } from "./image.context";
import { ImageMiddleware } from "./image.middleware";

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
  public abstract async filterImage(req: Request, res: Response): Promise<void>;
  public abstract routes(): Router;
}

@injectable()
export class ImageControllerLive extends ImageController {
  constructor(
    @inject(ImageMiddleware) private imgMiddleware: ImageMiddleware,
    @inject(ImageContext) private context: ImageContext,
  ) {
    super();
  }

  public async filterImage(req: Request, res: Response): Promise<void> {
    try {
      const filteredImage = await this.context.filterImageFromURL(req.query.image_url);
      res.status(200).sendFile(filteredImage);
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message:
          "Unexpected error applying the filter in the image",
      });
    }
  }

  public routes(): Router {
    const router = Router();

    router.get("/filteredimage", [this.imgMiddleware.validate()], (req, res) => this.filterImage(req, res));
    return router;
  }
}
