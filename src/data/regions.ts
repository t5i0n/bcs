export type Region = {
  name: string;
  altitude: string;
  process: string;
  notes: string;
  season: string;
};

export const REGIONS: Region[] = [
  {
    name: "Yirgacheffe",
    altitude: "1,800–2,200m",
    process: "Washed, Natural",
    notes:
      "Floral, citrus, tea-like body. The most celebrated Ethiopian origin — bright, jasmine-laced, refined.",
    season: "Oct – Jan",
  },
  {
    name: "Sidama",
    altitude: "1,500–2,200m",
    process: "Washed, Natural",
    notes:
      "Berry, wine, sweet citrus. Diverse micro-climates produce remarkable lot-to-lot variation.",
    season: "Oct – Dec",
  },
  {
    name: "Guji",
    altitude: "1,800–2,300m",
    process: "Washed, Natural",
    notes:
      "Berry, chocolate, jasmine. A rising star with intense fruit-forward profiles.",
    season: "Oct – Jan",
  },
  {
    name: "Limu",
    altitude: "1,400–2,000m",
    process: "Washed",
    notes:
      "Balanced, spicy, winey. A reliable workhorse for blends and single-origin alike.",
    season: "Nov – Feb",
  },
  {
    name: "Jimma",
    altitude: "1,400–1,800m",
    process: "Natural",
    notes:
      "Earthy, mild, full body. Ethiopia's largest producing region by volume.",
    season: "Nov – Feb",
  },
  {
    name: "Nekemte",
    altitude: "1,500–2,100m",
    process: "Natural",
    notes:
      "Fruity, mocha, bold. Western-Ethiopian character — heavy body and chocolate.",
    season: "Oct – Jan",
  },
  {
    name: "Harrar",
    altitude: "1,500–2,100m",
    process: "Natural",
    notes:
      "Blueberry, wine, mocha. Iconic dry-processed eastern coffee with a wild, fruited cup.",
    season: "Oct – Feb",
  },
];
