import { NextFunction, Request, RequestHandler, Response } from "express";
import { inject, injectable } from "inversify";
import { ImageContext } from "./image.context";

@injectable()
export abstract class ImageMiddleware {
  public abstract validate(): RequestHandler;
}

@injectable()
export class ImageMiddlewareLive extends ImageMiddleware {
  constructor(@inject(ImageContext) private imgContext: ImageContext) {
    super();
  }

  public validate(): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): any => {
      if (!this.imgContext.validateImageUrl(req.query.image_url)) {
        res.status(422).send({
          message:
            "Url it's not accessible or the image extension it's not a image.",
        });
        next(false);
      }

      next();
    };
  }
}
