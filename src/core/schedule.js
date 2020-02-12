import $ from "jquery";
import MBTAService from "./service";

export default class Schedule {
  constructor(station, routes, limit = 10) {
    this.params = $.param({
      filter: {
        stop: station,
        route: routes.ids.join(",")
      },
      page: { limit: limit },
      sort: "departure_time"
    });
  }

  get all() {
    return this._schedulesData;
  }

  getSchedules() {
    let service = new MBTAService("schedules", this.params);

    return service.call().then(res => {
      this._schedulesData = res.data;
      return this;
    });
  }
}
