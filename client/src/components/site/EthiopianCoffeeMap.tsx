import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mountain, Leaf, Calendar } from "lucide-react";
import { REGIONS } from "@/data/regions";

/**
 * Interactive Ethiopian coffee map with accurate country outline.
 * Outline + region boundaries are both derived from real geographic
 * data (Natural Earth) using the exact same lat/lng -> SVG transform
 * as the pins, so everything lines up and nothing pokes outside the box.
 */

// Ethiopia bounding box (approximate): lat 3.4–14.9, lng 33.0–48.0
const MAP_BOUNDS = {
  latMin: 3.4,
  latMax: 14.9,
  lngMin: 33.0,
  lngMax: 48.0,
};

function latLngToSvg(lat: number, lng: number, width: number, height: number) {
  const x =
    ((lng - MAP_BOUNDS.lngMin) / (MAP_BOUNDS.lngMax - MAP_BOUNDS.lngMin)) *
    width;
  const y =
    ((MAP_BOUNDS.latMax - lat) / (MAP_BOUNDS.latMax - MAP_BOUNDS.latMin)) *
    height;
  return { x, y };
}

// Ethiopia outline, traced from real country boundary data (Natural Earth),
// projected with the same lat/lng->SVG transform used for the pins above,
// at MAP_WIDTH x MAP_HEIGHT (460x410).
const ETHIOPIA_PATH = `
  M 32.8,194.1 L 33.7,186.1 L 40.7,166.7 L 39.2,154.5 L 43.5,146.9 L 48.3,143.2
  L 53.7,148.2 L 53.8,150.3 L 56.4,148.7 L 60.1,142.5 L 58.7,140.7 L 60.8,132.4
  L 59.6,130.0 L 63.6,119.5 L 62.6,113.1 L 63.6,109.8 L 67.9,107.1 L 71.1,102.5
  L 72.2,98.2 L 82.4,79.9 L 95.5,78.4 L 96.2,66.6 L 99.2,54.8 L 104.0,46.4
  L 106.1,38.5 L 105.3,33.2 L 108.1,22.7 L 114.9,20.2 L 124.5,22.2 L 126.4,17.1
  L 131.7,15.8 L 139.6,28.3 L 150.0,0.7 L 153.5,6.3 L 160.4,7.9 L 162.9,13.6
  L 166.4,17.2 L 179.9,14.5 L 183.4,11.9 L 184.3,8.9 L 187.9,10.6 L 190.4,16.4
  L 192.2,14.7 L 197.8,14.1 L 199.8,11.8 L 204.0,14.4 L 208.4,14.4 L 211.4,16.9
  L 217.9,15.5 L 223.2,17.7 L 229.4,23.4 L 240.2,28.3 L 246.7,36.6 L 251.2,45.8
  L 267.2,58.9 L 274.4,72.2 L 281.7,77.3 L 287.6,86.8 L 274.0,109.5 L 269.6,113.9
  L 268.3,119.9 L 269.5,129.8 L 268.7,139.2 L 274.1,141.5 L 279.0,139.4 L 288.0,138.8
  L 294.9,135.8 L 298.4,136.7 L 299.7,139.2 L 304.3,139.1 L 297.5,151.2 L 295.8,152.2
  L 299.5,158.6 L 301.6,167.3 L 306.1,171.4 L 308.7,177.5 L 312.4,178.9 L 314.3,187.1
  L 318.0,190.9 L 319.5,195.6 L 323.5,198.4 L 325.7,198.3 L 336.9,210.1 L 428.7,246.1
  L 459.4,246.1 L 411.7,299.6 L 366.2,356.1 L 336.4,354.6 L 322.9,358.6 L 310.3,365.5
  L 305.5,370.2 L 303.6,375.7 L 301.5,377.8 L 279.2,381.8 L 273.7,386.1 L 273.3,388.3
  L 271.0,390.4 L 266.8,388.7 L 250.3,390.7 L 238.1,378.5 L 210.0,393.3 L 207.4,399.8
  L 199.5,409.9 L 197.4,407.8 L 193.5,407.6 L 193.7,406.6 L 190.7,407.6 L 186.1,405.5
  L 180.8,406.0 L 175.5,404.3 L 173.6,402.1 L 173.6,403.1 L 170.1,402.5 L 168.9,401.1
  L 167.0,402.8 L 156.5,402.4 L 123.1,375.4 L 117.9,373.2 L 93.3,372.8 L 90.2,370.5
  L 89.6,366.5 L 85.4,361.4 L 84.4,358.1 L 86.0,341.6 L 75.7,337.6 L 71.9,340.4
  L 70.1,339.6 L 69.0,337.4 L 69.4,334.7 L 64.4,330.8 L 60.5,322.2 L 60.1,315.1
  L 56.6,308.4 L 52.2,292.9 L 46.8,290.5 L 46.1,285.6 L 39.3,282.4 L 36.7,279.4
  L 36.2,275.7 L 34.7,275.8 L 31.7,272.7 L 30.9,267.0 L 22.0,258.2 L 14.2,254.9
  L 10.6,256.0 L 7.2,253.7 L 1.8,253.2 L -0.3,249.0 L 3.6,242.3 L 5.7,241.0
  L 5.2,238.7 L 6.4,237.0 L 5.0,233.1 L 7.2,229.8 L 19.0,229.6 L 22.7,232.9
  L 29.1,230.6 L 33.4,226.2 L 32.8,194.1 Z
`;

// Regional boundaries — real admin-1 borders (Natural Earth), clipped to the
// country outline above and projected with the same transform, so every
// internal line stays inside the outer border.
const REGION_BOUNDARIES = [
  // Southern Nations, Nationalities and Peoples (SNNP)
  `M 70.6,340.2 L 60.9,323.0 L 52.2,292.9 L 36.7,278.2 L 51.0,281.2 L 63.3,275.8
   L 71.4,276.9 L 72.5,267.2 L 68.8,257.5 L 74.8,250.3 L 84.6,250.3 L 85.5,243.0
   L 94.0,261.7 L 117.4,273.1 L 126.9,273.1 L 134.8,267.2 L 134.8,246.1 L 141.6,247.3
   L 141.2,237.8 L 137.0,234.9 L 138.5,231.1 L 148.2,234.0 L 160.7,231.2 L 164.4,236.6
   L 168.8,230.1 L 173.2,231.4 L 174.4,241.9 L 170.1,237.7 L 172.3,245.3 L 166.5,262.9
   L 155.5,278.2 L 160.9,279.6 L 163.5,275.9 L 172.1,278.9 L 173.2,289.6 L 186.9,298.6
   L 188.1,311.5 L 183.8,311.9 L 176.8,302.6 L 168.3,301.9 L 162.3,316.9 L 165.4,320.2
   L 160.5,322.1 L 156.1,311.8 L 162.4,302.0 L 149.8,296.3 L 146.8,316.5 L 156.1,326.9
   L 151.6,330.3 L 150.3,344.1 L 143.7,341.8 L 135.0,347.1 L 121.8,346.3 L 119.7,360.9
   L 111.9,373.2 L 91.9,372.1 L 84.6,359.9 L 86.0,341.6 L 75.7,337.6 L 70.6,340.2 Z`,
  // Somali
  `M 459.4,246.1 L 366.2,356.1 L 336.4,354.6 L 322.9,358.6 L 310.3,365.5 L 301.5,377.8
   L 279.2,381.8 L 271.0,390.4 L 250.3,390.7 L 238.1,378.5 L 210.0,393.3 L 200.4,409.8
   L 186.8,405.8 L 193.2,401.4 L 198.4,391.5 L 215.1,339.3 L 230.9,338.1 L 243.0,328.0
   L 241.0,302.3 L 246.2,293.9 L 258.1,297.5 L 264.4,304.3 L 268.8,298.0 L 275.8,295.7
   L 283.0,273.7 L 272.2,263.4 L 277.0,230.5 L 284.4,223.8 L 291.4,228.4 L 296.5,241.0
   L 299.6,233.0 L 303.5,231.3 L 302.3,216.0 L 285.3,183.2 L 277.2,187.9 L 268.7,187.5
   L 267.2,193.7 L 253.6,192.3 L 240.6,199.4 L 239.1,196.3 L 242.7,195.0 L 236.0,194.5
   L 237.3,188.1 L 246.0,176.4 L 243.6,173.0 L 247.9,150.5 L 253.6,140.5 L 274.1,141.5
   L 294.9,135.8 L 304.3,139.1 L 295.8,152.2 L 301.6,167.3 L 312.4,178.9 L 319.5,195.6
   L 336.9,210.1 L 428.7,246.1 L 459.4,246.1 Z`,
  // Afar
  `M 287.6,86.8 L 268.3,119.9 L 268.8,139.4 L 253.0,141.2 L 247.9,150.5 L 243.6,173.0
   L 246.0,176.4 L 237.3,188.1 L 236.0,194.5 L 228.9,198.1 L 215.5,215.8 L 216.0,211.1
   L 208.9,205.4 L 211.5,199.1 L 208.4,196.9 L 211.2,192.4 L 210.1,183.9 L 215.1,184.4
   L 217.3,177.6 L 214.7,171.5 L 218.7,171.0 L 218.2,147.5 L 220.7,136.3 L 207.4,94.7
   L 211.4,76.3 L 207.1,71.5 L 208.8,64.6 L 206.2,50.6 L 209.2,47.4 L 209.1,34.6
   L 205.2,26.2 L 207.6,21.6 L 204.7,20.2 L 217.9,15.5 L 238.4,26.8 L 251.2,45.8
   L 267.2,58.9 L 274.4,72.2 L 281.7,77.3 L 287.6,86.8 Z`,
  // Amhara
  `M 95.5,78.4 L 99.2,54.8 L 105.5,40.1 L 108.5,46.4 L 123.6,54.4 L 128.6,52.3
   L 138.5,54.6 L 145.4,47.6 L 155.1,51.0 L 167.6,46.8 L 167.3,51.1 L 174.0,50.2
   L 184.4,67.2 L 190.9,67.2 L 191.9,91.4 L 200.4,91.7 L 200.5,94.4 L 207.9,91.8
   L 211.1,111.4 L 220.4,133.4 L 218.7,171.0 L 214.4,172.3 L 217.3,176.2 L 215.1,184.4
   L 210.1,183.9 L 211.2,192.4 L 208.4,196.9 L 211.4,200.8 L 207.5,206.7 L 207.3,214.9
   L 200.0,219.0 L 193.3,217.4 L 195.4,205.0 L 191.7,200.0 L 199.6,198.3 L 190.8,187.9
   L 179.6,183.6 L 173.7,173.6 L 178.5,170.7 L 179.3,161.8 L 168.6,161.5 L 166.2,169.6
   L 144.2,180.3 L 139.0,174.5 L 132.3,173.9 L 128.4,169.9 L 128.7,165.6 L 104.0,158.0
   L 102.1,152.4 L 104.0,147.2 L 101.6,148.1 L 101.6,145.4 L 107.0,136.3 L 107.6,126.7
   L 104.4,123.5 L 102.2,110.2 L 96.6,114.8 L 87.0,102.2 L 73.9,111.1 L 69.0,104.9
   L 82.4,79.9 L 95.5,78.4 Z`,
  // Tigray
  `M 106.1,38.5 L 108.1,22.7 L 111.9,20.9 L 122.8,22.7 L 127.3,16.3 L 131.7,15.8
   L 139.6,28.3 L 150.0,0.7 L 153.5,6.3 L 160.4,7.9 L 166.4,17.2 L 179.9,14.5
   L 184.3,8.9 L 190.4,16.4 L 199.8,11.8 L 214.7,15.9 L 213.6,19.0 L 204.5,20.5
   L 207.6,21.6 L 205.2,26.2 L 209.1,34.6 L 209.2,47.4 L 206.2,50.6 L 208.8,64.6
   L 207.1,71.5 L 211.4,76.3 L 208.5,91.3 L 200.5,94.4 L 200.4,91.7 L 192.4,92.2
   L 189.7,80.8 L 192.1,74.9 L 190.9,67.2 L 184.4,67.2 L 174.0,50.2 L 167.3,51.1
   L 167.6,46.8 L 155.1,51.0 L 145.4,47.6 L 138.5,54.6 L 128.6,52.3 L 123.6,54.4
   L 108.5,46.4 L 106.1,38.5 Z`,
  // Benishangul-Gumaz
  `M 53.8,150.3 L 60.1,142.5 L 63.6,109.8 L 69.0,104.9 L 72.6,110.7 L 78.0,110.3
   L 87.3,102.2 L 96.6,114.8 L 102.2,110.2 L 104.4,123.5 L 107.6,126.7 L 107.0,136.3
   L 101.6,145.4 L 101.6,148.1 L 104.0,147.2 L 103.3,157.1 L 109.0,161.2 L 124.1,163.9
   L 122.5,167.2 L 114.5,163.7 L 110.1,167.4 L 107.4,162.7 L 95.9,172.9 L 95.6,186.1
   L 100.3,193.2 L 94.6,205.4 L 69.9,177.5 L 57.5,173.8 L 56.5,182.5 L 51.9,189.3
   L 44.9,187.6 L 41.8,203.1 L 33.2,203.0 L 33.7,186.1 L 40.7,166.7 L 39.2,154.5
   L 48.3,143.2 L 53.8,150.3 Z`,
  // Gambela
  `M 23.1,232.9 L 34.0,224.6 L 39.0,224.4 L 55.8,239.2 L 64.1,240.1 L 58.0,243.9
   L 60.0,245.3 L 57.4,252.0 L 65.8,262.1 L 64.5,264.4 L 69.4,262.4 L 72.3,266.5
   L 71.4,276.9 L 63.3,275.8 L 51.0,281.2 L 39.9,279.9 L 22.0,258.2 L 0.7,251.9
   L 7.2,229.8 L 19.0,229.6 L 23.1,232.9 Z`,
  // Oromiya (central, largest)
  `M 34.1,223.7 L 33.2,203.0 L 41.8,203.1 L 44.9,187.6 L 51.9,189.3 L 57.5,173.8
   L 69.9,177.5 L 94.6,205.4 L 100.3,193.2 L 95.6,186.1 L 95.9,172.9 L 106.8,163.0
   L 110.1,167.4 L 128.2,165.4 L 132.3,173.9 L 144.2,180.3 L 166.2,169.6 L 168.6,161.5
   L 175.8,161.1 L 179.9,162.3 L 178.5,170.7 L 173.7,172.5 L 178.6,182.2 L 199.6,198.3
   L 191.7,200.0 L 195.4,205.0 L 193.9,218.1 L 207.3,214.9 L 210.5,205.2 L 215.9,215.9
   L 236.3,194.4 L 242.7,195.0 L 240.6,199.4 L 253.6,192.3 L 278.4,193.4 L 286.5,184.7
   L 304.0,226.8 L 296.5,241.0 L 291.4,228.4 L 284.4,223.8 L 278.2,228.8 L 272.2,263.4
   L 283.0,273.7 L 275.8,295.7 L 264.4,304.3 L 246.2,293.9 L 241.0,302.3 L 243.0,328.0
   L 230.9,338.1 L 215.1,339.3 L 194.2,399.9 L 180.8,406.0 L 156.5,402.4 L 123.1,375.4
   L 111.9,373.2 L 119.7,360.9 L 121.8,346.3 L 150.3,344.1 L 151.6,330.3 L 156.1,326.9
   L 146.8,316.5 L 149.8,296.3 L 162.4,302.0 L 156.1,311.8 L 160.5,322.1 L 165.4,320.2
   L 162.3,316.9 L 168.3,301.9 L 188.1,311.5 L 186.9,298.6 L 173.2,289.6 L 172.1,278.9
   L 155.5,278.2 L 166.5,262.9 L 172.3,245.3 L 170.1,237.7 L 174.4,241.9 L 173.2,231.4
   L 168.8,230.1 L 164.4,236.6 L 160.7,231.2 L 138.5,231.1 L 141.7,246.9 L 134.8,246.1
   L 134.4,268.3 L 120.2,273.7 L 93.4,261.3 L 86.9,243.0 L 84.1,250.7 L 72.3,251.6
   L 69.5,263.2 L 64.5,264.4 L 57.4,252.0 L 58.0,243.9 L 64.1,240.1 L 55.8,239.2
   L 34.1,223.7 Z`,
];

// Region positions for pins (lat/lng -> approximate SVG coordinates)
const REGION_POSITIONS = [
  { key: "harrar", lat: 9.31, lng: 42.12 },
  { key: "yirgacheffe", lat: 6.16, lng: 38.21 },
  { key: "sidama", lat: 6.75, lng: 38.48 },
  { key: "guji", lat: 5.85, lng: 38.55 },
  { key: "limu", lat: 7.85, lng: 36.85 },
  { key: "jimma", lat: 7.67, lng: 36.83 },
  { key: "nekemte", lat: 9.08, lng: 36.55 },
];

const MAP_WIDTH = 460;
const MAP_HEIGHT = 410;

export function EthiopianCoffeeMap() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
      {/* Map */}
      <div className="relative aspect-square max-w-xl mx-auto lg:mx-0 rounded-3xl bg-cream border border-border p-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, oklch(0.36 0.08 148 / 0.3), transparent 65%)",
          }}
        />
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="absolute inset-0 w-full h-full p-4"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Ethiopia outline */}
          <path
            d={ETHIOPIA_PATH}
            fill="oklch(0.36 0.08 148 / 0.08)"
            stroke="oklch(0.36 0.08 148 / 0.4)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Regional boundaries (subtle) */}
          {REGION_BOUNDARIES.map((path, i) => (
            <path
              key={i}
              d={path}
              fill="none"
              stroke="oklch(0.36 0.08 148 / 0.18)"
              strokeWidth="1"
              strokeDasharray="4 3"
              strokeLinejoin="round"
            />
          ))}

          {/* Region pins */}
          {REGION_POSITIONS.map((region) => {
            const { x, y } = latLngToSvg(
              region.lat,
              region.lng,
              MAP_WIDTH,
              MAP_HEIGHT,
            );
            // Resolve against REGIONS by name (not array position) so pin
            // order and REGIONS order don't have to match to stay in sync.
            const regionIndex = REGIONS.findIndex(
              (r) =>
                r.key ===
                region.key,
            );
            const isActive = regionIndex !== -1 && active === regionIndex;
            return (
              <g
                key={region.key}
                className="cursor-pointer"
                onClick={() => {
                  if (regionIndex !== -1) setActive(regionIndex);
                }}
              >
                {/* Pin shadow */}
                <circle cx={x} cy={y + 2} r="6" fill="oklch(0 0 0 / 0.2)" />
                {/* Pin dot */}
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={
                    isActive ? "oklch(0.74 0.15 80)" : "oklch(0.36 0.08 148)"
                  }
                  stroke="white"
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                />
                {/* Label */}
                <text
                  x={x}
                  y={y - 14}
                  textAnchor="middle"
                  className="pointer-events-none"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    fill: isActive
                      ? "oklch(0.74 0.15 80)"
                      : "oklch(0.36 0.08 148)",
                  }}
                >
                  {t(`origins.regions.${region.key}`)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Info panel */}
      <div className="space-y-4">
        <div className="rounded-3xl gradient-forest text-white p-8 shadow-elegant">
          <p className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">
            {t("origins.featuredRegion")}
          </p>
          <h3 className="font-display text-4xl font-bold mt-3">
            {t(`origins.regions.${REGIONS[active].key}`)}
          </h3>
          <p className="mt-2 text-white/80 italic">
            &ldquo;{REGIONS[active].notes}&rdquo;
          </p>

          <div className="mt-7 grid grid-cols-3 gap-4">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
              <div className="w-12 h-12 rounded-3xl bg-accent text-accent-foreground grid place-items-center mb-4">
                <Mountain className="w-5 h-5" />
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {t("origins.altitude")}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold">
                {REGIONS[active].altitude}
              </p>
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
              <div className="w-12 h-12 rounded-3xl bg-accent text-accent-foreground grid place-items-center mb-4">
                <Leaf className="w-5 h-5" />
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {t("origins.processing")}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold">
                {REGIONS[active].process}
              </p>
            </div>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
              <div className="w-12 h-12 rounded-3xl bg-accent text-accent-foreground grid place-items-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {t("origins.harvest")}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold">
                {REGIONS[active].season}
              </p>
            </div>
          </div>
        </div>

        {/* Region buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {REGIONS.map((r, i) => (
            <button
              key={r.key}
              onClick={() => setActive(i)}
              className={`px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                active === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-cream hover:bg-accent/20 text-foreground"
              }`}
            >
              {t(`origins.regions.${r.key}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
