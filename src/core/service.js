export default class MBTAService {
  constructor(path, params) {
    this.path = path;
    this.params = params;
  }

  static host() {
    return new URL("https://api-v3.mbta.com");
  }

  url() {
    let url = MBTAService.host();
    url.pathname = this.path;
    url.search = this.params;
    return url;
  }

  call() {
    return fetch(this.url()).then(res => res.json());
  }
}
