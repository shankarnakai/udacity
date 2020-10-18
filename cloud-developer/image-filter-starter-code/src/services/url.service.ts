import { injectable } from "inversify";
import { URL } from "url";

@injectable()
export abstract class UrlService {
   public abstract isValid(url: string, protocols: string[]): boolean;
}

@injectable()
export class UrlServiceNodeNative extends UrlService {
  public isValid(url: string, protocols: string[]): boolean {
    return this.isValidUrlFormat(url) && this.containProtocols(url, protocols);
  }

  private containProtocols(url: string, protocolList: string[]): boolean {
    if (!protocolList || protocolList.length === 0) {
      return true;
    }
    let found = this.getUrlProtocol(url);
    if (!found) {
      found = "http";
    }
    return protocolList
      .map((protocol) => protocol.toLowerCase())
      .includes(found);
  }

  private isValidUrlFormat(urlPath: string) {
    const found = this.getUrlProtocol(urlPath);
    if (!found) {
      urlPath = "http://" + urlPath;
    }
    // The built in node URL class will verify in the constructor if the url is valid,
    // otherwise it will throw a TypeError.
    try {
      // tslint:disable-next-line: no-unused-expression
      new URL(urlPath);
      return true;
    } catch {
      return false;
    }
  }

  private getUrlProtocol(url: string): string | null {
    const protocolPattern = new RegExp("^(.*):");
    const parsed = url.match(protocolPattern);
    if (!parsed) {
      return null;
    } else {
      return parsed[1].toLocaleLowerCase();
    }
  }
}
