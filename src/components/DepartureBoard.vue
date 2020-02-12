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
      <h3>MBTA Departure Board</h3>
      <h4>( {{ formatName(this.station.name) }} )</h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Carrier</th>
            <th scope="col">Time</th>
            <th scope="col">Destination</th>
            <th scope="col">Train#</th>
            <th scope="col">Track</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="departure in departures" v-bind:key="departure.id">
            <th scope="row">{{ departure.carrier }}</th>
            <td>
              {{ departure.time | moment("h:mm:ss a") }}
            </td>
            <td>{{ departure.route.replace(/CR-/, "") }}</td>
            <td>{{ departure.train }}</td>
            <td>{{ departure.track }}</td>
            <td>{{ departure.status }}</td>
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
      departures: []
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
    formatName(name) {
      return name
        .toLowerCase()
        .split(/[\s,_]+/)
        .map(w => w[0].toUpperCase() + w.substr(1))
        .join(" ");
    }
  },
  mounted: function() {
    this.loadData();
  }
};
</script>

<style>
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
  margin-bottom: 3%;
}
</style>
