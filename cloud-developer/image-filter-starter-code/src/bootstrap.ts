import { Container } from "inversify";
import "reflect-metadata";
import { App, AppLive } from "./app";
import { ImageController, ImageControllerLive } from "./modules/image/image.controller";
import ImageModule from "./modules/image/image.module";
import { ImageService, ImageServiceLive } from "./modules/image/image.service";
import { UrlService, UrlServiceNodeNative } from "./services/url.service";

const generalModule = new Container();
generalModule.bind<App>(App).to(AppLive);
generalModule.bind<UrlService>(UrlService).to(UrlServiceNodeNative);

const moduleList = [ImageModule];
const container = moduleList.reduce(
  (acc, module) => Container.merge(acc, module) as Container,
  generalModule,
);

export default container.get<App>(App);
