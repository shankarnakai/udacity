import { Container } from "inversify";
import { UrlService, UrlServiceNodeNative } from "../../services/url.service";
import { ImageController, ImageControllerLive } from "./image.controller";
import { ImageService, ImageServiceLive } from "./image.service";

const container = new Container();
container.bind<ImageController>(ImageController).to(ImageControllerLive);
container.bind<ImageService>(ImageService).to(ImageServiceLive);

export default container;
