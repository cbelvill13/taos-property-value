"use client";

import { useState } from "react";

const MESSAGE_MAX = 150;
const GARAGE_OPTIONS = ["none", "1", "2", "3+"];
const BEDS_OPTIONS = [
  { value: "", label: "—" },
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5+" },
];
const GUEST_HOUSE_BEDS_OPTIONS = [
  { value: "", label: "—" },
  { value: "0", label: "0" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4+" },
];
const BATHS_OPTIONS = [
  { value: "", label: "—" },
  { value: "0.5", label: "0.5" },
  { value: "1", label: "1" },
  { value: "1.5", label: "1.5" },
  { value: "2", label: "2" },
  { value: "2.5", label: "2.5" },
  { value: "3", label: "3" },
  { value: "3.5", label: "3.5" },
  { value: "4", label: "4+" },
];
const ACREAGE_OPTIONS = [
  { value: "", label: "—" },
  { value: "LT_1", label: "Less than 1" },
  { value: "ONE_TO_FIVE", label: "1–5" },
  { value: "FIVE_TO_TEN", label: "5–10" },
  { value: "TEN_TO_TWENTY", label: "10–20" },
  { value: "TWENTY_PLUS", label: "20+" },
];
const REMODELED_OPTIONS = [
  { value: "", label: "" },
  { value: "YES", label: "Yes" },
  { value: "NO", label: "No" },
  { value: "UNKNOWN", label: "Unknown" },
];
const ELECTRIC_OPTIONS = [
  "Grid – Connected",
  "Grid – Nearby",
  "Grid – At Lot",
  "Off Grid",
  "Combo",
];
const GAS_OPTIONS = [
  "Natural Gas",
  "Propane",
];
const WATER_SOURCE_OPTIONS = [
  { value: "", label: "" },
  { value: "Well - Private", label: "Well - Private" },
  { value: "Well - Shared", label: "Well - Shared" },
  { value: "Community", label: "Community" },
  { value: "Municipal", label: "Municipal" },
  { value: "Cistern", label: "Cistern" },
  { value: "Must Drill", label: "Must Drill" },
];
const WASTEWATER_OPTIONS = [
  { value: "", label: "" },
  { value: "Septic", label: "Septic" },
  { value: "Sewer", label: "Sewer" },
  { value: "Must Install", label: "Must Install" },
];
const VIEW_OPTIONS = [
  { value: "", label: "—" },
  { value: "MOUNTAIN", label: "Mountain" },
  { value: "VALLEY", label: "Valley" },
  { value: "SUNSET", label: "Sunset" },
  { value: "RIVER_CREEK", label: "River / Creek" },
  { value: "GOLF", label: "Golf" },
  { value: "NONE", label: "None" },
];
const ADJACENCY_OPTIONS = [
  { value: "", label: "—" },
  { value: "ADJACENT_BLM", label: "Adjacent to BLM Land" },
  { value: "ADJACENT_NATIONAL_FOREST", label: "Adjacent to National Forest" },
  { value: "ADJACENT_OPEN_SPACE", label: "Adjacent Open Space" },
  { value: "OTHER", label: "Other" },
];
const ACCESS_OPTIONS = [
  { value: "", label: "—" },
  { value: "PAVED_ROAD", label: "Paved Road" },
  { value: "PRIVATE_ROAD", label: "Private Road" },
  { value: "OTHER", label: "Other" },
];
const TIMELINE_OPTIONS = [
  { value: "", label: "" },
  { value: "just-curious", label: "Just curious" },
  { value: "within-3-months", label: "Within 3 months" },
  { value: "within-6-months", label: "Within 6 months" },
  { value: "within-12-months", label: "Within 12 months" },
  { value: "flexible", label: "Flexible" },
];
const HOA_OPTIONS = [
  { value: "", label: "—" },
  { value: "YES", label: "Yes" },
  { value: "NO", label: "No" },
  { value: "UNKNOWN", label: "Unknown" },
];
const RESTRICTIONS_OPTIONS = [
  { value: "", label: "—" },
  { value: "noneKnown", label: "None Known" },
  { value: "hoa", label: "HOA" },
  { value: "deed", label: "Deed Restrictions" },
  { value: "conservation", label: "Conservation" },
  { value: "easement", label: "Easement" },
  { value: "landGrant", label: "Land Grant" },
  { value: "other", label: "Other" },
  { value: "unknown", label: "Unknown" },
];
const WATER_RIGHTS_OPTIONS = [
  { value: "", label: "—" },
  { value: "unknown", label: "Unknown" },
  { value: "none", label: "None" },
  { value: "surface", label: "Surface" },
  { value: "wellDomestic", label: "Domestic Well" },
  { value: "wellShared", label: "Shared Well" },
  { value: "acequia", label: "Acequia / Ditch Rights" },
  { value: "adjudicated", label: "Adjudicated / Documented" },
  { value: "other", label: "Other" },
];
const BUILDING_STYLE_OPTIONS = [
  { value: "", label: "—" },
  { value: "FRAME", label: "Frame" },
  { value: "ADOBE", label: "Adobe" },
  { value: "PUMICE", label: "Pumice" },
  { value: "POST_AND_BEAM", label: "Post & Beam" },
  { value: "STRAWBALE", label: "Strawbale" },
  { value: "EARTHSHIP", label: "Earthship" },
  { value: "MANUFACTURED", label: "Manufactured" },
  { value: "MODULAR", label: "Modular" },
];

const inputSelectClass =
  "w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500";

function parseNum(s: string): number | undefined {
  const n = parseFloat(s.trim());
  return Number.isFinite(n) ? n : undefined;
}

export default function Home() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [garage, setGarage] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [acreage, setAcreage] = useState("");
  const [yearBuilt, setYearBuilt] = useState("");
  const [remodeled, setRemodeled] = useState("");
  const [buildingStyle, setBuildingStyle] = useState("");
  const [electric, setElectric] = useState("");
  const [gas, setGas] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [wastewater, setWastewater] = useState("");
  const [waterRights, setWaterRights] = useState("");
  const [irrigatedAcres, setIrrigatedAcres] = useState("");
  const [hoa, setHoa] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [restrictionsNotes, setRestrictionsNotes] = useState("");
  const [view, setView] = useState("");
  const [adjacency, setAdjacency] = useState("");
  const [access, setAccess] = useState("");
  const [guestHouseBeds, setGuestHouseBeds] = useState("");
  const [guestHouseBaths, setGuestHouseBaths] = useState("");
  const [guestHouseSqft, setGuestHouseSqft] = useState("");
  const [hasTriedToSellRecently, setHasTriedToSellRecently] = useState<"yes" | "no" | "">("");
  const [priorListPrice, setPriorListPrice] = useState("");
  const [priorListStartDate, setPriorListStartDate] = useState("");
  const [priorListEndDate, setPriorListEndDate] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const canSubmit =
    fullName.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.replace(/\D/g, "").length >= 10 &&
    address.trim().length > 0 &&
    consent &&
    notes.length <= MESSAGE_MAX;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!fullName.trim()) err.fullName = "Full name is required.";
    if (!email.trim()) err.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) err.email = "Please enter a valid email address.";
    if (!phone.trim()) err.phone = "Phone is required.";
    else if (phone.replace(/\D/g, "").length < 10) err.phone = "Please enter a valid phone number (at least 10 digits).";
    if (!address.trim()) err.address = "Property address is required.";
    if (notes.length > MESSAGE_MAX) err.notes = `Notes must be at most ${MESSAGE_MAX} characters.`;
    if (!consent) err.consent = "You must agree to be contacted.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    setLoading(true);
    setErrors({});
    try {
      const criteria: Record<string, unknown> = {
        leadKind: "HOME_VALUE_SNAPSHOT",
        propertyAddress: address.trim(),
      };
      if (beds !== "") criteria.beds = Number(beds);
      if (baths !== "") criteria.baths = Number(baths);
      if (garage.trim()) criteria.garage = garage.trim();
      const sqftNum = parseNum(squareFootage);
      if (sqftNum !== undefined) criteria.squareFootage = sqftNum;
      if (acreage.trim()) criteria.acreage = acreage.trim();
      const yearNum = parseNum(yearBuilt);
      if (yearNum !== undefined) criteria.yearBuilt = yearNum;
      if (remodeled === "YES" || remodeled === "NO" || remodeled === "UNKNOWN") criteria.remodeled = remodeled;
      if (buildingStyle.trim()) criteria.buildingStyle = buildingStyle.trim();
      if (electric.trim()) criteria.electric = electric.trim();
      if (gas.trim()) criteria.gas = gas.trim();
      if (waterSource.trim()) criteria.waterSource = waterSource.trim();
      if (wastewater.trim()) criteria.wastewater = wastewater.trim();
      if (waterRights.trim()) criteria.waterRights = waterRights.trim();
      const irrigatedNum = parseNum(irrigatedAcres);
      if (irrigatedNum !== undefined) criteria.irrigatedAcres = irrigatedNum;
      if (hoa === "YES" || hoa === "NO" || hoa === "UNKNOWN") criteria.hoa = hoa;
      if (restrictions.trim()) criteria.restrictions = restrictions.trim();
      if (restrictionsNotes.trim()) criteria.restrictionsNotes = restrictionsNotes.trim().slice(0, 120);
      if (view.trim()) criteria.view = view.trim();
      if (adjacency.trim()) criteria.adjacency = adjacency.trim();
      if (access.trim()) criteria.access = access.trim();
      const ghSqft = parseNum(guestHouseSqft);
      const hasGhBeds = guestHouseBeds.trim() !== "";
      const hasGhBaths = guestHouseBaths.trim() !== "";
      const hasGhSqft = ghSqft !== undefined;
      if (hasGhBeds || hasGhBaths || hasGhSqft) {
        criteria.guestHouse = {
          has: true,
          ...(hasGhBeds && { beds: Number(guestHouseBeds) }),
          ...(hasGhBaths && { baths: Number(guestHouseBaths) }),
          ...(hasGhSqft && { sqft: ghSqft }),
        };
      }
      if (hasTriedToSellRecently === "yes") {
        criteria.triedToSellRecently = {
          has: true,
          ...(parseNum(priorListPrice) !== undefined && { priorListPrice: parseNum(priorListPrice) }),
          ...(priorListStartDate.trim() && { startDate: priorListStartDate.trim() }),
          ...(priorListEndDate.trim() && { endDate: priorListEndDate.trim() }),
        };
      } else if (hasTriedToSellRecently === "no") {
        criteria.triedToSellRecently = { has: false };
      }
      if (timeline.trim()) criteria.timeline = timeline.trim();

      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          criteria,
          message: notes.trim().slice(0, MESSAGE_MAX) || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setErrors({ submit: data.error ?? "Something went wrong. Please try again." });
        return;
      }
      setSuccess(true);
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setBeds("");
      setBaths("");
      setGarage("");
      setSquareFootage("");
      setAcreage("");
      setYearBuilt("");
      setRemodeled("");
      setBuildingStyle("");
      setElectric("");
      setGas("");
      setWaterSource("");
      setWastewater("");
      setWaterRights("");
      setIrrigatedAcres("");
      setHoa("");
      setRestrictions("");
      setRestrictionsNotes("");
      setView("");
      setAdjacency("");
      setAccess("");
      setGuestHouseBeds("");
      setGuestHouseBaths("");
      setGuestHouseSqft("");
      setHasTriedToSellRecently("");
      setPriorListPrice("");
      setPriorListStartDate("");
      setPriorListEndDate("");
      setTimeline("");
      setNotes("");
      setConsent(false);
      setErrors({});
    } catch (e) {
      setErrors({
        submit: e instanceof Error ? e.message : "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Taos Home Value",
        url: "https://taoshomevalue.com",
        description:
          "Request a market-based pricing snapshot for your Taos-area property.",
      },
      {
        "@type": "RealEstateAgent",
        name: "Taos Home Value",
        url: "https://taoshomevalue.com",
        areaServed: "Taos County, New Mexico",
        description:
          "Request a market-based pricing snapshot for your Taos-area property.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-white text-neutral-900">
      <header className="w-full border-b">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl sm:aspect-[3/1]">
            <img
              src="/images/136-3x1hero.jpg"
              alt="Taos landscape"
              className="h-full w-full object-cover"
            />

            {/* Left readability gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

            {/* Text overlay — masthead + full contact info on mobile and desktop */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-[85%] px-4 py-4 text-center sm:max-w-[70%] sm:px-7 sm:py-7">
                <div className="text-white">
                  {/* Site identity masthead — not a link */}
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-white sm:text-sm sm:tracking-widest">
                      TaosHomeValue.com
                    </div>
                    <div className="mt-0.5 text-[10px] font-medium text-white/80 sm:text-xs">
                      Taos · NM
                    </div>
                  </div>
                  {/* Brought to You By + name + contact — pushed down for clear gap */}
                  <div className="mt-5">
                    <div className="text-[10px] font-medium uppercase tracking-wide text-white/85 sm:text-xs">
                      Brought to You By
                    </div>
                    <div className="mt-1 text-xs font-semibold leading-snug tracking-tight sm:text-sm sm:leading-normal">
                      Chad Belvill - Associate Broker
                    </div>
                    <div className="mt-1.5 space-y-0.5 text-xs leading-snug text-white/90 sm:mt-2 sm:space-y-1 sm:text-sm sm:leading-normal">
                      <div>Dreamcatcher Real Estate Co. Inc.</div>
                      <div>515 Gusdorf Rd Suite 6 Taos, NM 87571</div>
                      <div>
                        <a href="tel:5757793612" className="text-inherit no-underline hover:underline" aria-label="Call cell 575-779-3612">575-779-3612</a> cell /{" "}
                        <a href="tel:5757583606" className="text-inherit no-underline hover:underline" aria-label="Call office 575-758-3606">575-758-3606</a> office
                      </div>
                      <div>
                        <a href="mailto:chad@exclusivetaos.com" className="text-inherit no-underline hover:underline" aria-label="Email chad@exclusivetaos.com">chad@exclusivetaos.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Get a local pricing snapshot for your Taos-area property.
        </h1>
        <p className="mt-2 text-base leading-relaxed text-neutral-600 sm:text-lg">
          A credible value range looks at the full market: what's selling, what's not, how pricing is shifting, and how buyers are behaving right now.
        </p>

        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          That context turns raw data into pricing that holds up in the real world.
        </p>

        <h2 className="mt-8 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
          What I’m actually looking at
        </h2>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          When I evaluate a property, I’m not just pulling recent sales. I’m weighing:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-base leading-relaxed text-neutral-700">
          <li>Current inventory pressure in your price range</li>
          <li>How long similar homes are taking to sell</li>
          <li>Where listings started vs. where they actually closed</li>
          <li>Price reductions, expirations, and quiet withdrawals</li>
          <li>Property-specific factors buyers price in immediately</li>
          <li>Location details that matter in this market — and the ones that don’t</li>
        </ul>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          The goal isn’t a flattering number. It’s a range that reflects how buyers are behaving right now.
        </p>

        <h2 className="mt-8 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
          Why this isn’t an instant estimate
        </h2>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          This isn’t an automated guess and it isn’t a one-size-fits-all number.
        </p>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          Pricing works when it’s based on patterns across many local outcomes — not just a handful of recent sales. Seeing what sold is important. Seeing what didn’t, how long it took, and why buyers hesitated is just as important.
        </p>
        <p className="mt-3 text-base leading-relaxed text-neutral-700">
          That wider lens is what produces a pricing range you can actually use.
        </p>

        <h2 className="mt-8 text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
          Request a pricing snapshot
        </h2>
        <p className="mt-2 text-base leading-relaxed text-neutral-700">
          Share a few details about the property and your timing. I’ll follow up with a value range and the reasoning behind it.
        </p>

        {success ? (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-800">
            <p className="font-medium">Got it — I’ll send your pricing snapshot.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border bg-white p-4">
            {errors.submit && (
              <p className="mb-3 text-sm text-red-600" role="alert">
                {errors.submit}
              </p>
            )}

            <div className="space-y-3">
              <div>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Full name *"
                />
                {errors.fullName && <p className="mt-0.5 text-xs text-red-600">{errors.fullName}</p>}
              </div>
              <div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Email *"
                />
                {errors.email && <p className="mt-0.5 text-xs text-red-600">{errors.email}</p>}
              </div>
              <div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Phone *"
                />
                {errors.phone && <p className="mt-0.5 text-xs text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Property address *"
                />
                {errors.address && <p className="mt-0.5 text-xs text-red-600">{errors.address}</p>}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="beds" className="block text-xs font-medium text-neutral-600">Beds</label>
                <select id="beds" value={beds} onChange={(e) => setBeds(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {BEDS_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="baths" className="block text-xs font-medium text-neutral-600">Baths (halves ok)</label>
                <select id="baths" value={baths} onChange={(e) => setBaths(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {BATHS_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="garage" className="block text-xs font-medium text-neutral-600">Garage</label>
                <select id="garage" value={garage} onChange={(e) => setGarage(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  <option value="">—</option>
                  {GARAGE_OPTIONS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="squareFootage" className="block text-xs font-medium text-neutral-600">Square footage</label>
                <input
                  id="squareFootage"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="e.g. 1850"
                />
              </div>
              <div className="sm:col-span-2">
                <span className="block text-xs font-medium text-neutral-600">Guest house</span>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div>
                    <label htmlFor="guestHouseBeds" className="block text-xs text-neutral-500">Guest house beds</label>
                    <select id="guestHouseBeds" value={guestHouseBeds} onChange={(e) => setGuestHouseBeds(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                      {GUEST_HOUSE_BEDS_OPTIONS.map((o) => (
                        <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guestHouseBaths" className="block text-xs text-neutral-500">Guest house baths</label>
                    <select id="guestHouseBaths" value={guestHouseBaths} onChange={(e) => setGuestHouseBaths(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                      {BATHS_OPTIONS.map((o) => (
                        <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="guestHouseSqft" className="block text-xs text-neutral-500">Guest house sq ft</label>
                    <input id="guestHouseSqft" type="text" inputMode="numeric" pattern="[0-9]*" value={guestHouseSqft} onChange={(e) => setGuestHouseSqft(e.target.value)} className={`mt-1 ${inputSelectClass}`} placeholder="—" />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="acreage" className="block text-xs font-medium text-neutral-600">Acreage</label>
                <select id="acreage" value={acreage} onChange={(e) => setAcreage(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {ACREAGE_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="yearBuilt" className="block text-xs font-medium text-neutral-600">Year built</label>
                <input
                  id="yearBuilt"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="e.g. 1995"
                />
              </div>
              <div>
                <label htmlFor="remodeled" className="block text-xs font-medium text-neutral-600">Remodeled</label>
                <select id="remodeled" value={remodeled} onChange={(e) => setRemodeled(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {REMODELED_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label || "—"}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="buildingStyle" className="block text-xs font-medium text-neutral-600">Building Style</label>
                <select id="buildingStyle" value={buildingStyle} onChange={(e) => setBuildingStyle(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {BUILDING_STYLE_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="access" className="block text-xs font-medium text-neutral-600">Access</label>
                <select id="access" value={access} onChange={(e) => setAccess(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {ACCESS_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="timeline" className="block text-xs font-medium text-neutral-600">Timeline</label>
                <select id="timeline" value={timeline} onChange={(e) => setTimeline(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {TIMELINE_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label || "—"}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="electric" className="block text-xs font-medium text-neutral-600">Electric</label>
                <select id="electric" value={electric} onChange={(e) => setElectric(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  <option value="">—</option>
                  {ELECTRIC_OPTIONS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="gas" className="block text-xs font-medium text-neutral-600">Gas</label>
                <select id="gas" value={gas} onChange={(e) => setGas(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  <option value="">—</option>
                  {GAS_OPTIONS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="waterSource" className="block text-xs font-medium text-neutral-600">Water source</label>
                <select id="waterSource" value={waterSource} onChange={(e) => setWaterSource(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {WATER_SOURCE_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label || "—"}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="wastewater" className="block text-xs font-medium text-neutral-600">Wastewater</label>
                <select id="wastewater" value={wastewater} onChange={(e) => setWastewater(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {WASTEWATER_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label || "—"}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="waterRights" className="block text-xs font-medium text-neutral-600">
                  Water Rights
                </label>
                <select
                  id="waterRights"
                  value={waterRights}
                  onChange={(e) => setWaterRights(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                >
                  {WATER_RIGHTS_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="irrigatedAcres" className="block text-xs font-medium text-neutral-600">
                  Irrigated Acres
                </label>
                <input
                  id="irrigatedAcres"
                  type="text"
                  inputMode="decimal"
                  pattern="[0-9]*(\\.[0-9]*)?"
                  value={irrigatedAcres}
                  onChange={(e) => setIrrigatedAcres(e.target.value)}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="—"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="hoa" className="block text-xs font-medium text-neutral-600">HOA</label>
              <select id="hoa" value={hoa} onChange={(e) => setHoa(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                {HOA_OPTIONS.map((o) => (
                  <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="restrictions" className="block text-xs font-medium text-neutral-600">Restrictions</label>
              <select
                id="restrictions"
                value={restrictions}
                onChange={(e) => setRestrictions(e.target.value)}
                className={`mt-1 ${inputSelectClass}`}
              >
                {RESTRICTIONS_OPTIONS.map((o) => (
                  <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                ))}
              </select>
              <div className="mt-2">
                <input
                  id="restrictionsNotes"
                  type="text"
                  value={restrictionsNotes}
                  onChange={(e) => setRestrictionsNotes(e.target.value.slice(0, 120))}
                  maxLength={120}
                  className={`mt-1 ${inputSelectClass}`}
                  placeholder="Restrictions notes"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="view" className="block text-xs font-medium text-neutral-600">View</label>
                <select id="view" value={view} onChange={(e) => setView(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {VIEW_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="adjacency" className="block text-xs font-medium text-neutral-600">Adjacency</label>
                <select id="adjacency" value={adjacency} onChange={(e) => setAdjacency(e.target.value)} className={`mt-1 ${inputSelectClass}`}>
                  {ADJACENCY_OPTIONS.map((o) => (
                    <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <span className="block text-xs font-medium text-neutral-600">Tried to sell recently?</span>
              <div className="mt-2 flex gap-4">
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="triedToSell" checked={hasTriedToSellRecently === "yes"} onChange={() => setHasTriedToSellRecently("yes")} className="border-neutral-300 text-neutral-700 focus:ring-neutral-500" />
                  Yes
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="triedToSell" checked={hasTriedToSellRecently === "no"} onChange={() => setHasTriedToSellRecently("no")} className="border-neutral-300 text-neutral-700 focus:ring-neutral-500" />
                  No
                </label>
                <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
                  <input type="radio" name="triedToSell" checked={hasTriedToSellRecently === ""} onChange={() => setHasTriedToSellRecently("")} className="border-neutral-300 text-neutral-700 focus:ring-neutral-500" />
                  —
                </label>
              </div>
              {hasTriedToSellRecently === "yes" && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label htmlFor="priorListPrice" className="block text-xs text-neutral-500">Prior list price</label>
                    <input id="priorListPrice" type="text" inputMode="numeric" pattern="[0-9]*" value={priorListPrice} onChange={(e) => setPriorListPrice(e.target.value)} className={`mt-1 ${inputSelectClass}`} placeholder="—" />
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="priorListStartDate" className="block text-xs text-neutral-500">List start date</label>
                      <input id="priorListStartDate" type="date" value={priorListStartDate} onChange={(e) => setPriorListStartDate(e.target.value)} className={`mt-1 ${inputSelectClass}`} />
                    </div>
                    <div>
                      <label htmlFor="priorListEndDate" className="block text-xs text-neutral-500">List end date</label>
                      <input id="priorListEndDate" type="date" value={priorListEndDate} onChange={(e) => setPriorListEndDate(e.target.value)} className={`mt-1 ${inputSelectClass}`} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="notes" className="block text-xs font-medium text-neutral-600">Notes <span className="font-normal text-neutral-400">(max {MESSAGE_MAX})</span></label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.slice(0, MESSAGE_MAX))}
                  maxLength={MESSAGE_MAX}
                  rows={2}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
                  placeholder="Anything else you’d like me to know."
                />
                <p className="mt-0.5 text-right text-xs text-neutral-500">{notes.length} / {MESSAGE_MAX}</p>
                {errors.notes && <p className="mt-0.5 text-xs text-red-600">{errors.notes}</p>}
              </div>
              <div>
                <label className="inline-flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-300 text-neutral-700 focus:ring-neutral-500"
                  />
                  <span className="text-xs text-neutral-700">
                    I agree to be contacted by phone, text, or email about my request. I can opt out anytime. *
                  </span>
                </label>
                {errors.consent && <p className="mt-0.5 text-xs text-red-600">{errors.consent}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || loading}
              className="mt-4 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending…" : "Request pricing snapshot"}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-neutral-500">
          By submitting, you agree you may be contacted by phone/text/email. Unsubscribe anytime.
        </p>

        {/* Compliance strip — bottom of page */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-neutral-200 bg-neutral-50 px-4 py-6 sm:gap-6">
          <img src="/compliance/equal-housing.svg" alt="Equal Housing Opportunity" className="h-6 w-auto sm:h-7" />
          <img src="/compliance/NAR.svg" alt="National Association of Realtors" className="h-6 w-auto sm:h-7" />
          <img src="/compliance/NMAR.svg" alt="New Mexico Realtors" className="h-6 w-auto sm:h-7" />
          <img src="/compliance/ECAR.svg" alt="Enchanted Circle Association of Realtors" className="h-6 w-auto sm:h-7" />
        </div>
      </section>
    </main>
    </>
  );
}
