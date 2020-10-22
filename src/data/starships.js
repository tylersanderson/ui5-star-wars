const starships = [
  {
    name: "CR90 corvette",
    model: "CR90 corvette",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: "3500000",
    length: "150",
    max_atmosphering_speed: "950",
    crew: "30-165",
    passengers: "600",
    cargo_capacity: "3000000",
    consumables: "1 year",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "corvette",
    pilots: [],
    films: [
      "http://swapi.dev/api/films/1/",
      "http://swapi.dev/api/films/3/",
      "http://swapi.dev/api/films/6/",
    ],
    created: "2014-12-10T14:20:33.369000Z",
    edited: "2014-12-20T21:23:49.867000Z",
    url: "http://swapi.dev/api/starships/2/",
  },
  {
    name: "Star Destroyer",
    model: "Imperial I-class Star Destroyer",
    manufacturer: "Kuat Drive Yards",
    cost_in_credits: "150000000",
    length: "1,600",
    max_atmosphering_speed: "975",
    crew: "47,060",
    passengers: "n/a",
    cargo_capacity: "36000000",
    consumables: "2 years",
    hyperdrive_rating: "2.0",
    MGLT: "60",
    starship_class: "Star Destroyer",
    pilots: [],
    films: [
      "http://swapi.dev/api/films/1/",
      "http://swapi.dev/api/films/2/",
      "http://swapi.dev/api/films/3/",
    ],
    created: "2014-12-10T15:08:19.848000Z",
    edited: "2014-12-20T21:23:49.870000Z",
    url: "http://swapi.dev/api/starships/3/",
  },
  {
    name: "Sentinel-class landing craft",
    model: "Sentinel-class landing craft",
    manufacturer: "Sienar Fleet Systems, Cyngus Spaceworks",
    cost_in_credits: "240000",
    length: "38",
    max_atmosphering_speed: "1000",
    crew: "5",
    passengers: "75",
    cargo_capacity: "180000",
    consumables: "1 month",
    hyperdrive_rating: "1.0",
    MGLT: "70",
    starship_class: "landing craft",
    pilots: [],
    films: ["http://swapi.dev/api/films/1/"],
    created: "2014-12-10T15:48:00.586000Z",
    edited: "2014-12-20T21:23:49.873000Z",
    url: "http://swapi.dev/api/starships/5/",
  },
  {
    name: "Death Star",
    model: "DS-1 Orbital Battle Station",
    manufacturer:
      "Imperial Department of Military Research, Sienar Fleet Systems",
    cost_in_credits: "1000000000000",
    length: "120000",
    max_atmosphering_speed: "n/a",
    crew: "342,953",
    passengers: "843,342",
    cargo_capacity: "1000000000000",
    consumables: "3 years",
    hyperdrive_rating: "4.0",
    MGLT: "10",
    starship_class: "Deep Space Mobile Battlestation",
    pilots: [],
    films: ["http://swapi.dev/api/films/1/"],
    created: "2014-12-10T16:36:50.509000Z",
    edited: "2014-12-20T21:26:24.783000Z",
    url: "http://swapi.dev/api/starships/9/",
  },
  {
    name: "Millennium Falcon",
    model: "YT-1300 light freighter",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: "100000",
    length: "34.37",
    max_atmosphering_speed: "1050",
    crew: "4",
    passengers: "6",
    cargo_capacity: "100000",
    consumables: "2 months",
    hyperdrive_rating: "0.5",
    MGLT: "75",
    starship_class: "Light freighter",
    pilots: [
      "http://swapi.dev/api/people/13/",
      "http://swapi.dev/api/people/14/",
      "http://swapi.dev/api/people/25/",
      "http://swapi.dev/api/people/31/",
    ],
    films: [
      "http://swapi.dev/api/films/1/",
      "http://swapi.dev/api/films/2/",
      "http://swapi.dev/api/films/3/",
    ],
    created: "2014-12-10T16:59:45.094000Z",
    edited: "2014-12-20T21:23:49.880000Z",
    url: "http://swapi.dev/api/starships/10/",
  },
  {
    name: "Y-wing",
    model: "BTL Y-wing",
    manufacturer: "Koensayr Manufacturing",
    cost_in_credits: "134999",
    length: "14",
    max_atmosphering_speed: "1000km",
    crew: "2",
    passengers: "0",
    cargo_capacity: "110",
    consumables: "1 week",
    hyperdrive_rating: "1.0",
    MGLT: "80",
    starship_class: "assault starfighter",
    pilots: [],
    films: [
      "http://swapi.dev/api/films/1/",
      "http://swapi.dev/api/films/2/",
      "http://swapi.dev/api/films/3/",
    ],
    created: "2014-12-12T11:00:39.817000Z",
    edited: "2014-12-20T21:23:49.883000Z",
    url: "http://swapi.dev/api/starships/11/",
  },
  {
    name: "TIE Advanced x1",
    model: "Twin Ion Engine Advanced x1",
    manufacturer: "Sienar Fleet Systems",
    cost_in_credits: "unknown",
    length: "9.2",
    max_atmosphering_speed: "1200",
    crew: "1",
    passengers: "0",
    cargo_capacity: "150",
    consumables: "5 days",
    hyperdrive_rating: "1.0",
    MGLT: "105",
    starship_class: "Starfighter",
    pilots: ["http://swapi.dev/api/people/4/"],
    films: ["http://swapi.dev/api/films/1/"],
    created: "2014-12-12T11:21:32.991000Z",
    edited: "2014-12-20T21:23:49.889000Z",
    url: "http://swapi.dev/api/starships/13/",
  },
  {
    name: "Executor",
    model: "Executor-class star dreadnought",
    manufacturer: "Kuat Drive Yards, Fondor Shipyards",
    cost_in_credits: "1143350000",
    length: "19000",
    max_atmosphering_speed: "n/a",
    crew: "279,144",
    passengers: "38000",
    cargo_capacity: "250000000",
    consumables: "6 years",
    hyperdrive_rating: "2.0",
    MGLT: "40",
    starship_class: "Star dreadnought",
    pilots: [],
    films: ["http://swapi.dev/api/films/2/", "http://swapi.dev/api/films/3/"],
    created: "2014-12-15T12:31:42.547000Z",
    edited: "2014-12-20T21:23:49.893000Z",
    url: "http://swapi.dev/api/starships/15/",
  },
  {
    name: "Rebel transport",
    model: "GR-75 medium transport",
    manufacturer: "Gallofree Yards, Inc.",
    cost_in_credits: "unknown",
    length: "90",
    max_atmosphering_speed: "650",
    crew: "6",
    passengers: "90",
    cargo_capacity: "19000000",
    consumables: "6 months",
    hyperdrive_rating: "4.0",
    MGLT: "20",
    starship_class: "Medium transport",
    pilots: [],
    films: ["http://swapi.dev/api/films/2/", "http://swapi.dev/api/films/3/"],
    created: "2014-12-15T12:34:52.264000Z",
    edited: "2014-12-20T21:23:49.895000Z",
    url: "http://swapi.dev/api/starships/17/",
  },
  {
    name: "Slave 1",
    model: "Firespray-31-class patrol and attack",
    manufacturer: "Kuat Systems Engineering",
    cost_in_credits: "unknown",
    length: "21.5",
    max_atmosphering_speed: "1000",
    crew: "1",
    passengers: "6",
    cargo_capacity: "70000",
    consumables: "1 month",
    hyperdrive_rating: "3.0",
    MGLT: "70",
    starship_class: "Patrol craft",
    pilots: ["http://swapi.dev/api/people/22/"],
    films: ["http://swapi.dev/api/films/2/", "http://swapi.dev/api/films/5/"],
    created: "2014-12-15T13:00:56.332000Z",
    edited: "2014-12-20T21:23:49.897000Z",
    url: "http://swapi.dev/api/starships/21/",
  },
  {
    name: "Imperial shuttle",
    model: "Lambda-class T-4a shuttle",
    manufacturer: "Sienar Fleet Systems",
    cost_in_credits: "240000",
    length: "20",
    max_atmosphering_speed: "850",
    crew: "6",
    passengers: "20",
    cargo_capacity: "80000",
    consumables: "2 months",
    hyperdrive_rating: "1.0",
    MGLT: "50",
    starship_class: "Armed government transport",
    pilots: [
      "http://swapi.dev/api/people/1/",
      "http://swapi.dev/api/people/13/",
      "http://swapi.dev/api/people/14/",
    ],
    films: ["http://swapi.dev/api/films/2/", "http://swapi.dev/api/films/3/"],
    created: "2014-12-15T13:04:47.235000Z",
    edited: "2014-12-20T21:23:49.900000Z",
    url: "http://swapi.dev/api/starships/22/",
  },
  {
    name: "EF76 Nebulon-B escort frigate",
    model: "EF76 Nebulon-B escort frigate",
    manufacturer: "Kuat Drive Yards",
    cost_in_credits: "8500000",
    length: "300",
    max_atmosphering_speed: "800",
    crew: "854",
    passengers: "75",
    cargo_capacity: "6000000",
    consumables: "2 years",
    hyperdrive_rating: "2.0",
    MGLT: "40",
    starship_class: "Escort ship",
    pilots: [],
    films: ["http://swapi.dev/api/films/2/", "http://swapi.dev/api/films/3/"],
    created: "2014-12-15T13:06:30.813000Z",
    edited: "2014-12-20T21:23:49.902000Z",
    url: "http://swapi.dev/api/starships/23/",
  },
  {
    name: "Calamari Cruiser",
    model: "MC80 Liberty type Star Cruiser",
    manufacturer: "Mon Calamari shipyards",
    cost_in_credits: "104000000",
    length: "1200",
    max_atmosphering_speed: "n/a",
    crew: "5400",
    passengers: "1200",
    cargo_capacity: "unknown",
    consumables: "2 years",
    hyperdrive_rating: "1.0",
    MGLT: "60",
    starship_class: "Star Cruiser",
    pilots: [],
    films: ["http://swapi.dev/api/films/3/"],
    created: "2014-12-18T10:54:57.804000Z",
    edited: "2014-12-20T21:23:49.904000Z",
    url: "http://swapi.dev/api/starships/27/",
  },
  {
    name: "A-wing",
    model: "RZ-1 A-wing Interceptor",
    manufacturer: "Alliance Underground Engineering, Incom Corporation",
    cost_in_credits: "175000",
    length: "9.6",
    max_atmosphering_speed: "1300",
    crew: "1",
    passengers: "0",
    cargo_capacity: "40",
    consumables: "1 week",
    hyperdrive_rating: "1.0",
    MGLT: "120",
    starship_class: "Starfighter",
    pilots: ["http://swapi.dev/api/people/29/"],
    films: ["http://swapi.dev/api/films/3/"],
    created: "2014-12-18T11:16:34.542000Z",
    edited: "2014-12-20T21:23:49.907000Z",
    url: "http://swapi.dev/api/starships/28/",
  },
  {
    name: "B-wing",
    model: "A/SF-01 B-wing starfighter",
    manufacturer: "Slayn & Korpil",
    cost_in_credits: "220000",
    length: "16.9",
    max_atmosphering_speed: "950",
    crew: "1",
    passengers: "0",
    cargo_capacity: "45",
    consumables: "1 week",
    hyperdrive_rating: "2.0",
    MGLT: "91",
    starship_class: "Assault Starfighter",
    pilots: [],
    films: ["http://swapi.dev/api/films/3/"],
    created: "2014-12-18T11:18:04.763000Z",
    edited: "2014-12-20T21:23:49.909000Z",
    url: "http://swapi.dev/api/starships/29/",
  },
  {
    name: "Republic Cruiser",
    model: "Consular-class cruiser",
    manufacturer: "Corellian Engineering Corporation",
    cost_in_credits: "unknown",
    length: "115",
    max_atmosphering_speed: "900",
    crew: "9",
    passengers: "16",
    cargo_capacity: "unknown",
    consumables: "unknown",
    hyperdrive_rating: "2.0",
    MGLT: "unknown",
    starship_class: "Space cruiser",
    pilots: [],
    films: ["http://swapi.dev/api/films/4/"],
    created: "2014-12-19T17:01:31.488000Z",
    edited: "2014-12-20T21:23:49.912000Z",
    url: "http://swapi.dev/api/starships/31/",
  },
  {
    name: "Droid control ship",
    model: "Lucrehulk-class Droid Control Ship",
    manufacturer: "Hoersch-Kessel Drive, Inc.",
    cost_in_credits: "unknown",
    length: "3170",
    max_atmosphering_speed: "n/a",
    crew: "175",
    passengers: "139000",
    cargo_capacity: "4000000000",
    consumables: "500 days",
    hyperdrive_rating: "2.0",
    MGLT: "unknown",
    starship_class: "Droid control ship",
    pilots: [],
    films: [
      "http://swapi.dev/api/films/4/",
      "http://swapi.dev/api/films/5/",
      "http://swapi.dev/api/films/6/",
    ],
    created: "2014-12-19T17:04:06.323000Z",
    edited: "2014-12-20T21:23:49.915000Z",
    url: "http://swapi.dev/api/starships/32/",
  },
];
