import Jimp from "jimp";
import { createMockImageService, ImageServiceMock } from "../../utils.mock";
import { ImageContext } from "./image.context";
import { ImageService } from "./image.service";

describe("ImageContext", () => {
  let imageService: ImageServiceMock;
  let imageContext: ImageContext;
  const MockedImageService = createMockImageService();

  beforeEach(() => {
    imageService = new MockedImageService() as ImageServiceMock;
    imageContext = new ImageContext(imageService);
  });

  afterEach(() => {
    MockedImageService.mockClear();
  });

  describe("validFromUrl", () => {
    it("Should be valid given a valid url with a valid image extension", () => {
      const url =
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg";
      imageContext.validateImageUrl(url);
      expect(imageService.validFromUrl).toBeCalledWith(
        url,
        ImageContext.IMAGE_VALID_EXTENSION,
        ImageContext.HTTP_VALID_PROTOCOLS,
      );
    });
  });

  describe("filterImageFromURL", () => {
    it("Should image be resized", async () => {
      const previousSize = {
        height: ImageContext.IMAGE_HEIGHT * 2,
        width: ImageContext.IMAGE_WIDTH * 2,
      };

      // tslint:disable: object-literal-sort-keys
      const expected = {
        path: new RegExp("/tmp/filtered.\\d+.jpg"),
        height: ImageContext.IMAGE_HEIGHT * 4,
        width: ImageContext.IMAGE_WIDTH * 4,
      };
      // tslint:enable: object-literal-sort-keys

      const url =
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg";

      let savedImage: Jimp = null;

      // tslint:disable-next-line: variable-name
      imageService.download.mockImplementation((_url) => {
        return createImage(previousSize.width, previousSize.height);
      });

      imageService.save.mockImplementation((image, fullpath) => {
        savedImage = image;
        return Promise.resolve(fullpath);
      });

      const path = await imageContext.filterImageFromURL(url);
      const pathMatch = !!path.match(expected.path);

      expect(pathMatch).toBeTruthy();
      expect(savedImage).not.toBeNull();
      expect(savedImage.getWidth()).toEqual(ImageContext.IMAGE_WIDTH);
      expect(savedImage.getHeight()).toEqual(ImageContext.IMAGE_HEIGHT);
    });
  });
});

function createImage(
  width: number,
  height: number,
  background = 0xffffff,
): Promise<Jimp> {
  const image = new Jimp(width, height, background);
  return Promise.resolve(image);
}
