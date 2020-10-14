import { UrlService, UrlServiceNodeNative } from "./url.service";

const mockedURL = jest.fn().mockImplementation(() => ({}));

describe("UrlServiceNodeNative", () => {
  let urlService: UrlService;
  beforeEach(() => {
    urlService = new UrlServiceNodeNative();
  });

  it("Should be valid given a valid url and empty protocols", () => {
    const url = "http://www.fake-valid-url.com";
    const protocols: string[] = [];

    const result = urlService.isValid(url, protocols);
    expect(result).toBeTruthy();
  });

  it("Should be valid given a valid url without a protocol in the it and 'http' in protocols", () => {
    const url = "www.fake-valid-url.com";
    const protocols = ["http"];

    const result = urlService.isValid(url, protocols);
    expect(result).toBeTruthy();
  });

  it("Should be valid given a valid url and protocols", () => {
    const url = "ftp://www.fake-valid-url.com";
    const protocols = ["http", "https", "ftp"];
    const result = urlService.isValid(url, protocols);
    expect(result).toBeTruthy();
  });

  it("Should be invalid given a valid url and invalid protocols", () => {
    const url = "ftp://www.fake-valid-url.com";
    const protocols = ["http", "https"];
    const result = urlService.isValid(url, protocols);
    expect(result).toBeFalsy();
  });

  it("Should be invalid given a invalid url and valid protocols", () => {
    const url = "?fake-invalid-url";
    const protocols = ["http", "https", "ftp"];
    const result = urlService.isValid(url, protocols);
    expect(result).toBeFalsy();
  });

  it("Should be invalid given a invalid url and invalid protocols", () => {
    const url = "?fake-invalid-url";
    const protocols = ["http", "https", "ftp"];
    const result = urlService.isValid(url, protocols);
    expect(result).toBeFalsy();
  });
});
