import { Container } from "inversify";
import { UrlService, UrlServiceNodeNative } from "../../services/url.service";
import { ImageContext } from "./image.context";
import { ImageController, ImageControllerLive } from "./image.controller";
import { ImageMiddleware, ImageMiddlewareLive } from "./image.middleware";
import { ImageService, ImageServiceLive } from "./image.service";

const container = new Container();
container.bind<ImageMiddleware>(ImageMiddleware).to(ImageMiddlewareLive);
container.bind<ImageController>(ImageController).to(ImageControllerLive);
container.bind<ImageContext>(ImageContext).to(ImageContext);
container.bind<ImageService>(ImageService).to(ImageServiceLive);

export default container;
