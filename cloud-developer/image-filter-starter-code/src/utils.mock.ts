import { UrlService } from "./services/url.service";

export type UrlServiceMock = jest.Mocked<UrlService>;
export const createMockUrlService = () => (jest.fn<UrlService, []>(
  () =>
    (({
      isValid: jest.fn(),
    } as unknown) as UrlService),
));
