import fs from "fs";
import { inject, injectable } from "inversify";
import Jimp from "jimp";
import util from "util";
import { UrlService } from "../../services/url.service";
import { ImageExtension } from "./image.model";

@injectable()
export abstract class ImageService {
 public abstract async validFromUrl(url: string, fileExtension: string[], providers: string[]): boolean;
 public abstract async download(url: string): Promise<Jimp>;
 public abstract async insertImageFilter(image: Jimp): Promise<Jimp>;
 public abstract async save(image: Jimp, outpath: string): Promise<string>;
 public abstract async filterImageFromURL(url: string): Promise<string>;
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
    return Jimp.read(url);
  }

  public async insertImageFilter(image: Jimp): Promise<Jimp> {
    return image
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale(); // set greyscale
  }

  public async save(image: Jimp, outpath: string): Promise<string> {
    const fullPath = __dirname + outpath;
    const jimpWrite = util.promisify(image.write);
    return jimpWrite(fullPath).then(() => fullPath);
  }

  public async filterImageFromURL(url: string): Promise<string> {
    const outpath =
      "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
    return this.download(url)
      .then((image) => this.insertImageFilter(image))
      .then((image) => this.save(image, outpath));
  }

  public async deleteLocalFiles(files: string[]) {
    files.forEach((file) => fs.unlinkSync(file));
  }
}
