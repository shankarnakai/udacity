import { inject, injectable } from "inversify";
import Jimp from "jimp/*";
import { ImageExtension } from "./image.model";
import { ImageService } from "./image.service";

@injectable()
export class ImageContext {
  public static readonly IMAGE_VALID_EXTENSION = [
    ImageExtension.JPG,
    ImageExtension.JPEG,
    ImageExtension.GIF,
    ImageExtension.PNG,
    ImageExtension.TIFF,
    ImageExtension.BMP,
  ];

  public static readonly HTTP_VALID_PROTOCOLS = ["http", "https"];

  public static readonly IMAGE_WIDTH = 256;
  public static readonly IMAGE_HEIGHT = 256;

  constructor(@inject(ImageService) private imgService: ImageService) {}

  public validateImageUrl(url: string): boolean {
    return this.imgService.validFromUrl(
      url,
      ImageContext.IMAGE_VALID_EXTENSION,
      ImageContext.HTTP_VALID_PROTOCOLS,
    );
  }

  public async filterImageFromURL(url: string): Promise<string> {
    const outpath =
      "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
    return this.imgService
      .download(url)
      .then((image) => {
        return this.resize(image, ImageContext.IMAGE_WIDTH, ImageContext.IMAGE_HEIGHT);
      })
      .then((image) => this.applyGreyFilter(image))
      .then((image) => this.imgService.save(image, outpath));
  }

  private async resize(image: Jimp, width: number, height: number): Promise<Jimp> {
    return image.resize(width, height);
  }

  private async applyGreyFilter(image: Jimp): Promise<Jimp> {
    return image
      .quality(60) // set JPEG quality
      .greyscale(); // set greyscale
  }
}
