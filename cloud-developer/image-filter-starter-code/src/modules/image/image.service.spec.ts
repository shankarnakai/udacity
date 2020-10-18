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

    it("Should be invalid given a valid url with a invalid image extension", () => {
      const url =
        "https://fakeurl.com/fake-image.tar";
      const protocols = ["http", "https"];
      const extension = [ImageExtension.JPG];
      urlService.isValid.mockReturnValue(true);
      const result = imageService.validFromUrl(url, extension, protocols);
      expect(result).toBeFalsy();
    });

    it("Should be invalid given a invalid url with a valid image extension", () => {
      const url =
        "3wwwinvalid-url/fake-image.jpg";
      const protocols = ["http", "https"];
      const extension = [ImageExtension.JPG];
      urlService.isValid.mockReturnValue(false);

      const result = imageService.validFromUrl(url, extension, protocols);
      expect(result).toBeFalsy();
    });
  });
});
