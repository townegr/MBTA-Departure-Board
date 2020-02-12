<template>
  <div class="container">
    <div class="row button-row">
      <div class="button-group">
        <span v-for="(place, name) in stations" v-bind:key="place">
          <StationButton place="station.id" @getStation="getStation(place)">
            {{ formatName(name) }}
          </StationButton>
        </span>
      </div>
    </div>
    <div class="container departures">
      <h3>{{ `${formatName(this.station.name, true)} TRAIN INFORMATION` }}</h3>
      <h4 class="alignLeft">{{ this.currentDay }}</h4>
      <h4 class="alignRight">Current Time</h4>
      <div id="datetime">
        <div>
          <p class="alignLeft">{{ this.currentDate }}</p>
        </div>
        <p class="alignRight">{{ this.currentTime }}</p>
      </div>
      <table class="table table-borderless table-striped table-dark table-sm">
        <thead>
          <tr>
            <th scope="col">Carrier</th>
            <th scope="col">Time</th>
            <th scope="col">Destination</th>
            <th scope="col">Train#</th>
            <th scope="col">Track#</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="departure in departures" v-bind:key="departure.id">
            <th scope="row">{{ departure.carrier }}</th>
            <td>
              {{ departure.time | moment("h:mm:ss A") }}
            </td>
            <td>{{ departure.route.replace(/CR-/, "").toUpperCase() }}</td>
            <td>{{ departure.train }}</td>
            <td>{{ departure.track }}</td>
            <td>{{ departure.status.toUpperCase() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import StationButton from "./StationButton";
import Departure from "../core/departure";
import { Stations } from "../core/types";
import moment from "moment";

export default {
  name: "DepartureBoard",
  components: {
    StationButton
  },
  data() {
    return {
      stations: Stations,
      station: {
        name: "South Station",
        id: "place-sstat"
      },
      departures: [],
      currentDay: moment().format("dddd"),
      currentDate: moment().format("M-D-YYYY"),
      currentTime: moment().format("h:mm A")
    };
  },
  methods: {
    loadData() {
      let departure = new Departure(this.station.id);
      departure.getDepartures(this.departures);
    },
    getStation(place) {
      this.station.name = Object.keys(Stations).find(
        key => Stations[key] === place
      );
      this.station.id = place;
      this.departures = [];
      this.loadData();
    },
    formatName(name, allcaps = false) {
      let formatted = name.toLowerCase().split(/[\s,_]+/);

      if (allcaps) {
        return formatted.map(w => w.toUpperCase()).join(" ");
      } else {
        return formatted.map(w => w[0].toUpperCase() + w.substr(1)).join(" ");
      }
    }
  },
  mounted: function() {
    this.loadData();
  }
};
</script>

<style>
body {
  background-color: black;
}

.table-borderless > tbody > tr > td,
.table-borderless > tbody > tr > th,
.table-borderless > tfoot > tr > td,
.table-borderless > tfoot > tr > th,
.table-borderless > thead > tr > td,
.table-borderless > thead > tr > th {
  border: none;
}

table thead th {
  font-size: 16px;
  color: #cfcfcf;
}

table tbody td,
table tbody th {
  font-size: 20px;
  font-weight: bold;
  color: #97ff47;
}

.departures {
  margin-top: 5%;
}
.button-row {
  position: relative;
}
.button-group {
  position: absolute;
  right: 10px;
}
h3 {
  margin-top: 8%;
}
h4 {
  float: right;
}
#datetime {
  clear: both;
  color: #b8ae00;
}
.alignLeft {
  color: #b8ae00;
  font-size: 25px;
  font-weight: 800;
  float: left;
}
.alignRight {
  color: #b8ae00;
  font-size: 25px;
  font-weight: 800;
  float: right;
}
</style>
