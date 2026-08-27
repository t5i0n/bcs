export type Region = {
  key: string;
  name: string;
  altitude: string;
  process: string;
  notes: string;
  season: string;
  /** Approximate lat/lng for map pin positioning */
  lat: number;
  lng: number;
};

export const REGIONS: Region[] = [
  {
    key: "yirgacheffe",
    name: "Yirgacheffe",
    altitude: "1,800–2,200m",
    process: "Washed, Natural",
    notes:
      "Floral, citrus, tea-like body. The most celebrated Ethiopian origin — bright, jasmine-laced, refined.",
    season: "Oct – Jan",
    lat: 6.16,
    lng: 38.21,
  },
  {
    key: "sidama",
    name: "Sidama",
    altitude: "1,500–2,200m",
    process: "Washed, Natural",
    notes:
      "Berry, wine, sweet citrus. Diverse micro-climates produce remarkable lot-to-lot variation.",
    season: "Oct – Dec",
    lat: 6.75,
    lng: 38.48,
  },
  {
    key: "guji",
    name: "Guji",
    altitude: "1,800–2,300m",
    process: "Washed, Natural",
    notes:
      "Berry, chocolate, jasmine. A rising star with intense fruit-forward profiles.",
    season: "Oct – Jan",
    lat: 5.85,
    lng: 38.55,
  },
  {
    key: "limu",
    name: "Limu",
    altitude: "1,400–2,000m",
    process: "Washed",
    notes:
      "Balanced, spicy, winey. A reliable workhorse for blends and single-origin alike.",
    season: "Nov – Feb",
    lat: 7.85,
    lng: 36.85,
  },
  {
    key: "jimma",
    name: "Jimma",
    altitude: "1,400–1,800m",
    process: "Natural",
    notes:
      "Earthy, mild, full body. Ethiopia's largest producing region by volume.",
    season: "Nov – Feb",
    lat: 7.67,
    lng: 36.83,
  },
  {
    key: "nekemte",
    name: "Nekemte",
    altitude: "1,500–2,100m",
    process: "Natural",
    notes:
      "Fruity, mocha, bold. Western-Ethiopian character — heavy body and chocolate.",
    season: "Oct – Jan",
    lat: 9.08,
    lng: 36.55,
  },
  {
    key: "harrar",
    name: "Harrar",
    altitude: "1,500–2,100m",
    process: "Natural",
    notes:
      "Blueberry, wine, mocha. Iconic dry-processed eastern coffee with a wild, fruited cup.",
    season: "Oct – Feb",
    lat: 9.31,
    lng: 42.12,
  },
];
