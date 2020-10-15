import Jimp from "jimp";
import { UrlService } from "../../services/url.service";
import { createMockUrlService, UrlServiceMock } from "../../utils.mock";
import { ImageExtension } from "./image.model";
import { ImageService, ImageServiceLive } from "./image.service";

jest.mock("../../services/url.service");

describe("ImageServiceLive", () => {
  let urlService: UrlServiceMock;
  let imageService: ImageService;
  let jimpMocked: jest.Mock<Jimp>;
  const MockedUrlService = createMockUrlService();

  beforeEach(() => {
    jimpMocked = (Jimp as unknown) as jest.Mock<Jimp>;
    urlService = new MockedUrlService() as UrlServiceMock;
    imageService = new ImageServiceLive(urlService);
  });

  afterEach(() => {
    MockedUrlService.mockClear();
  });

  describe("validFromUrl", () => {
    it("Should be valid given a valid url with a valid image extension", () => {
      const url =
        "https://upload.wikimedia.org/wikipedia/commons/b/bd/Golden_tabby_and_white_kitten_n01.jpg";
      const protocols = ["http", "https"];
      const extension = [ImageExtension.JPG];
      urlService.isValid.mockReturnValue(true);
      const result = imageService.validFromUrl(url, extension, protocols);
      expect(result).toBeTruthy();
    });
  });
});
