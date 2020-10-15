import { inject, injectable } from "inversify";
import Jimp from "jimp/*";
import { ImageExtension } from "./image.model";
import { ImageService } from "./image.service";

@injectable()
export class ImageContext {
  private static readonly IMAGE_WIDTH = 256;
  private static readonly IMAGE_HEIGHT = 256;

    constructor(@inject(ImageService) private imgService: ImageService) {}

    public validateImageUrl(url: string): boolean {
        const validExtension = [
          ImageExtension.JPG,
          ImageExtension.JPEG,
          ImageExtension.GIF,
          ImageExtension.PNG,
          ImageExtension.TIFF,
          ImageExtension.BMP,
        ];

        const validProtocols = ["http", "https"];

        return this.imgService.validFromUrl(url, validExtension, validProtocols);
    }

  public async filterImageFromURL(url: string): Promise<string> {
    const outpath =
      "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
    return this.imgService.download(url)
      .then((image) => this.resize(image, ImageContext.IMAGE_WIDTH, ImageContext.IMAGE_HEIGHT))
      .then((image) => this.applyGreyFilter(image))
      .then((image) => this.imgService.save(image, outpath));
  }

  private async resize(image: Jimp, width: number, height: number) {
    return image.resize(width, height);
  }

  private async applyGreyFilter(image: Jimp): Promise<Jimp> {
    return image.quality(60) // set JPEG quality
      .greyscale(); // set greyscale
  }
}
