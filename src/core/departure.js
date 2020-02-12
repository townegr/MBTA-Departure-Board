import Prediction from "./prediction";
import Route from "./route";
import { DepartureData, RouteType, Direction } from "./types";

export default class Departure {
  constructor(station) {
    this.station = station;
  }

  get routes() {
    return this._departureRoutes.all;
  }

  get predictions() {
    return this._departurePredictions.all;
  }

  vehicle(prediction) {
    let vehicle = prediction.relationships.vehicle.data;
    return vehicle != undefined ? vehicle.id : null;
  }

  platformCode(prediction) {
    let stop = prediction.relationships.stop.data;
    if (stop != undefined && stop.id.match(/(\d+)[^-]*$/) != undefined) {
      Number(stop.id.match(/(\d+)[^-]*$/)[0]);
    } else {
      null;
    }
  }

  getDepartures(context) {
    let _this = this;
    let stat = this.station;
    let statRoute = new Route(stat, RouteType.COMMUTER_RAIL);

    statRoute.getRoutes().then(res => {
      _this._departureRoutes = res;
      let statPrediction = new Prediction(stat, res, Direction.OUTBOUND);

      statPrediction
        .getPredictions()
        .then(res => {
          _this._departurePredictions = res;
          _this.predictions.forEach(prediction => {
            let obj = {};
            obj["carrier"] = "MBTA";
            obj["time"] = prediction.attributes.departure_time || "TBD";
            obj["route"] = prediction.relationships.route.data.id;
            obj["train"] = this.vehicle(prediction) || "Pending";
            obj["track"] = this.platformCode(prediction) || "TBD";
            obj["status"] = prediction.attributes.status || "Pending";
            context.push(obj);
          });
        })
        .then(() => {
          if (context.length) {
            context;
          } else {
            context.push(DepartureData.DEFAULT);
          }
        });
    });
  }
}
