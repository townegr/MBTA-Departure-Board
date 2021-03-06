const DepartureData = Object.freeze({
  DEFAULT: {
    carrier: "--",
    time: "--",
    route: "--",
    train: "--",
    track: "--",
    status: "--"
  }
});

const Carrier = Object.freeze({
  MBTA: "MBTA",
  AMTRAK: "AMTRAK"
});

const Stations = Object.freeze({
  SOUTH_STATION: "place-sstat",
  NORTH_STATION: "place-north"
});

const Transportation = Object.freeze({
  LIGHT_RAIL: 0,
  HEAVY_RAIL: 1,
  COMMUTER_RAIL: 2,
  BUS: 3,
  FERRY: 4
});

const Direction = Object.freeze({
  OUTBOUND: 0,
  INBOUND: 1
});

const ShotClock = Object.freeze({
  SLOW: 120,
  MEDIUM: 60,
  FAST: 30
});

export {
  Carrier,
  DepartureData,
  Direction,
  Transportation,
  ShotClock,
  Stations
};
