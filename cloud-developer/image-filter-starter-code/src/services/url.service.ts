import { inject, injectable } from "inversify";
import { URL } from "url";

@injectable()
export abstract class UrlService {
   public abstract isValid(url: string, protocols: string[]): boolean;
}

@injectable()
export class UrlServiceNodeNative extends UrlService {
  public isValid(url: string, protocols: string[]): boolean {
      return  this.isAccessibleUrl(url) && this.containProtocols(url, protocols);
  }

  private containProtocols(url: string, protocolList: string[]): boolean {
    if (!protocolList || protocolList.length === 0) {
      return true;
    }

    const protocolPattern = new RegExp("/^(.*):/");
    const parsed = url.match(protocolPattern);
    let found;
    if (!parsed) {
      found = "http";
    }

    found = parsed[1].toLocaleLowerCase();

    return protocolList
      .map((protocol) => protocol.toLowerCase())
      .includes(found);
  }

  private isAccessibleUrl(urlPath: string): boolean {
    try {
      const url = new URL(urlPath);
      return !url.hash;
    } catch (err: any) {
      // TODO: Implement logger service
      return false;
    }
  }
}
