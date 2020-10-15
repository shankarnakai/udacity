import fs from "fs";
import { inject, injectable } from "inversify";
import Jimp from "jimp";
import util from "util";
import { UrlService } from "../../services/url.service";
import { ImageExtension } from "./image.model";

@injectable()
export abstract class ImageService {
 public abstract validFromUrl(url: string, fileExtension: string[], providers: string[]): boolean;

 public abstract async download(url: string): Promise<Jimp>;
 public abstract async resize(image: Jimp, width: number, height: number): Promise<Jimp>;
 public abstract async applyGreyFilter(image: Jimp): Promise<Jimp>;
 public abstract async save(image: Jimp, outpath: string): Promise<string>;
 public abstract deleteLocalFiles(files: string[]): void;
}

@injectable()
export class ImageServiceLive extends ImageService {
  constructor(@inject(UrlService) private urlService: UrlService) {
      super();
  }

  public validFromUrl(url: string, fileExtension: ImageExtension[], providers: string[]): boolean {
    const extStr = fileExtension.join("|");
    const extPattern = new RegExp(`\\w+\\.(${extStr})$`, "gi");
    const hasValidExt = !!url.match(extPattern);
    return hasValidExt
    && this.urlService.isValid(url, providers);
  }

  public async download(url: string): Promise<Jimp> {
    // TODO: Change for a generic implementation to remove the need to Jimp for this action.
    return Jimp.read(url);
  }

  public async save(image: Jimp, outpath: string): Promise<string> {
    // TODO: Change the image type to a buffer to make the implemention more generic and remove the Jimp dependency
    const fullPath = __dirname + outpath;
    const jimpWrite = util.promisify(image.write);
    return jimpWrite(fullPath).then(() => fullPath);
  }

  public async deleteLocalFiles(files: string[]) {
    files.forEach((file) => fs.unlinkSync(file));
  }
}
