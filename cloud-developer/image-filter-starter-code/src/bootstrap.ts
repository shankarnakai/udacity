import { Container } from "inversify";
import "reflect-metadata";
import { UrlService, UrlServiceNodeNative } from "./services/url.service";

import ImageModule from "./modules/image/image.module";

import { Main, Runner } from "./runner";

const generalModule = new Container();
generalModule.bind<Runner>(Runner).to(Main);
generalModule.bind<UrlService>(UrlService).to(UrlServiceNodeNative);

const moduleList = [ImageModule];
const container = moduleList.reduce(
  (acc, module) => Container.merge(acc, module) as Container,
  generalModule,
);

export default container.get<Runner>(Runner);
