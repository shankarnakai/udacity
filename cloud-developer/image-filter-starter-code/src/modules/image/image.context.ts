import { inject, injectable } from "inversify";
import { ImageExtension } from "./image.model";
import { ImageService } from "./image.service";

@injectable()
export class ImageContext {
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
}
