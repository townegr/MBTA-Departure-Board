import $ from "jquery";
import MBTAService from "./service";

export default class Prediction {
  constructor(station, routes, direction) {
    this.params = $.param({
      filter: {
        stop: station,
        route: routes.ids.join(","),
        direction_id: direction
      },
      include: "vehicle,stop",
      sort: "departure_time"
    });
  }

  get all() {
    return this._predictions.data.filter(el => {
      let status = el.attributes.status;
      return status != undefined && status != "Departed";
    });
  }

  getPredictions() {
    let service = new MBTAService("predictions", this.params);

    return service.call().then(res => {
      this._predictions = { data: res.data, included: res.included };
      return this;
    });
  }
}
