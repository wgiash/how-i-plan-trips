// Montauk day trip — single plan, same design language as the roadtrip app.
// Photo rows get wired in once the images are picked (pairs alternate
// right → left; one left-aligned 4-stack for Ditch Plains).

export const L500 = '"TWKLausannePan-500", "TWK Lausanne Pan", system-ui, sans-serif'
export const L400 = '"TWKLausannePan-400", "TWK Lausanne Pan", system-ui, sans-serif'
export const INTER = '"Inter", system-ui, sans-serif'

export const PLAN = {
  kicker: 'SATURDAY · AUGUST 1',
  title: 'Montauk Trip 𓆉 ❀⋆.ೃ࿔*',
  tagline: 'Meet at Grand Central, train to the end of the island, everything on foot.',
  desc: 'Day trip to the end of Long Island. Everyone meets at Grand Central, change at Jamaica, one train out. Lighthouse first, then the beach with lunch on the sand, then dinner in town before the train home.',
  transit: [
    { label: 'GRAND CENTRAL → MONTAUK', value: '~3h 20m', maps: 'https://www.google.com/maps/dir/?api=1&origin=Grand+Central+Terminal,+New+York,+NY&destination=Montauk+Station,+Montauk,+NY&travelmode=transit' },
    { label: 'CHANGE AT JAMAICA', value: '~35m in', maps: 'https://www.google.com/maps/dir/?api=1&origin=Grand+Central+Terminal,+New+York,+NY&destination=Jamaica+Station,+Queens,+NY&travelmode=transit' },
    { label: 'MONTAUK → GRAND CENTRAL', value: '~3h 20m', maps: 'https://www.google.com/maps/dir/?api=1&origin=Montauk+Station,+Montauk,+NY&destination=Grand+Central+Terminal,+New+York,+NY&travelmode=transit' },
    { label: 'ROUND TRIP ON TRAINS', value: '~6h 30m', em: true, maps: 'https://www.mta.info/schedules/lirr/montauk' },
  ],
  stops: [
    {
      name: 'Montauk Point Lighthouse',
      time: 'late morning',
      bullets: [
        'Uber straight from the station when the train gets in (~15 min). The lighthouse is 5.6 miles east of town, the one leg that is not walkable.',
        'Oldest lighthouse in New York State (1796), commissioned under George Washington. Climb it, walk the bluffs, watch the surf at the Point.',
        'Admission about $15. Give it about 1.5h including the views.',
      ],
      photos: { kind: 'pair', align: 'right' },
    },
    {
      name: 'Ditch Plains',
      time: 'beach + lunch, afternoon',
      bullets: [
        'Uber back toward town, get off at Ditch Plains: the surfy, casual beach with the good people-watching.',
        'Lunch at the Ditch Witch, the food truck right on the beach. Eat on the sand.',
        "More lunch picks in town: 668 The Gig Shack (surf food and live music, opens noon), Tacombi La Brisa (tacos on the plaza), John's Drive-In (burgers and shakes), Goldberg's Bagels.",
        'Beach afternoon. Swim, nap, watch the surfers.',
      ],
      photos: { kind: 'stack4', align: 'left' },
    },
    {
      name: 'Town',
      time: 'evening',
      bullets: [
        'Walk into town (~35 min) around 5:30 or 6.',
        'Dinner, all walkable: Shagwong Tavern (old-school classic), Harvest on Fort Pond (bay side, sunset tables, book ahead), Bird on the Roof (cozy, cocktail bar, dinner 5:30 to 9:30), Sel Rrose (oysters and cocktails), or South Edison (local seafood).',
        'If there is time before the train, the bay side faces west for sunset. Then the evening train home.',
      ],
      photos: { kind: 'pair', align: 'right' },
    },
  ],
  callout: {
    label: 'GOOD TO KNOW',
    lines: [
      'One through-ticket, roughly $23 each way off-peak. Buy ahead in TrainTime; summer Saturday trains get crowded.',
      'The last train back is the hard deadline for dinner, so confirm it that morning.',
      'Ubers get scarce and surge on August weekends. Expect a short wait and save a local cab number as backup.',
    ],
  },
}

export const FOOTER_TEXT = 'Saturday · August 1 · Montauk'
