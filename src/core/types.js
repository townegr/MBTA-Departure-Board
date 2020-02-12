const DepartureData = Object.freeze({
  DEFAULT: {
    carrier: "TBD",
    time: "TBD",
    route: "TBD",
    train: "TBD",
    track: "TBD",
    status: "TBD"
  }
});

const Stations = Object.freeze({
  SOUTH_STATION: "place-sstat",
  NORTH_STATION: "place-north"
});

const RouteType = Object.freeze({
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

export { DepartureData, Direction, RouteType, ShotClock, Stations };
