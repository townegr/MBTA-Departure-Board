import $ from "jquery";
import MBTAService from "./service";

export default class Route {
  constructor(station, type) {
    this.params = $.param({
      filter: {
        stop: station,
        type: type
      }
    });
  }

  get all() {
    return this._routesData;
  }

  get ids() {
    return this.all.map(route => route.id);
  }

  getRoutes() {
    let service = new MBTAService("routes", this.params);

    return service.call().then(res => {
      this._routesData = res.data;
      return this;
    });
  }
}
