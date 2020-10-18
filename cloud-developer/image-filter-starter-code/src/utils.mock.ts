import { ImageService } from "./modules/image/image.service";
import { UrlService } from "./services/url.service";

export type UrlServiceMock = jest.Mocked<UrlService>;
export const createMockUrlService = () => (jest.fn<UrlService, []>(
  () =>
    (({
      isValid: jest.fn(),
    } as unknown) as UrlService),
));

export type ImageServiceMock = jest.Mocked<ImageService>;
export const createMockImageService = () => (jest.fn<ImageService, []>(
  () =>
    (({
      deleteLocalFiles: jest.fn(),
      download: jest.fn(),
      save: jest.fn(),
      validFromUrl : jest.fn(),
    } as unknown) as ImageService),
));
