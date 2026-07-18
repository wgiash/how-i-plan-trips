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
  desc: 'Day trip to the end of Long Island. Everyone meets at Grand Central, change at Jamaica, one train out. Lighthouse first, then lunch in the village, the beach right across the road, and the 5:15 train home.',
  transit: [
    { label: 'GRAND CENTRAL → MONTAUK', value: '~3h 20m', maps: 'https://www.google.com/maps/dir/?api=1&origin=Grand+Central+Terminal,+New+York,+NY&destination=Montauk+Station,+Montauk,+NY&travelmode=transit' },
    { label: 'CHANGE AT JAMAICA', value: '~35m in', maps: 'https://www.google.com/maps/dir/?api=1&origin=Grand+Central+Terminal,+New+York,+NY&destination=Jamaica+Station,+Queens,+NY&travelmode=transit' },
    { label: 'MONTAUK → GRAND CENTRAL', value: '~3h 20m', maps: 'https://www.google.com/maps/dir/?api=1&origin=Montauk+Station,+Montauk,+NY&destination=Grand+Central+Terminal,+New+York,+NY&travelmode=transit' },
    { label: 'ROUND TRIP ON TRAINS', value: '~6h 30m', em: true, maps: 'https://www.mta.info/schedules/lirr/montauk' },
  ],
  stops: [
    {
      name: 'Montauk Point',
      time: '10:30 to 12:00',
      bullets: [
        'The 6:48 from Grand Central gets in around 10:15. Uber straight from the station to the Point (~15 min); the lighthouse is 5.6 miles east of town, the one leg that is not walkable.',
        'Oldest lighthouse in New York State (1796), commissioned under George Washington. Climb it, walk the bluffs, watch the surf at the Point.',
        'Admission about $15. Give it about 1.5h including the views.',
      ],
      photos: { kind: 'pair', align: 'right' },
    },
    {
      name: 'Lunch',
      time: '12:30 to 1:45',
      bullets: [
        "Uber back from the lighthouse to the village: 668 The Gig Shack (surf food and live music, opens noon). Backups: Tacombi La Brisa, John's Drive-In, Goldberg's Bagels.",
      ],
      photos: { kind: 'pair', align: 'left' },
    },
    {
      name: 'Kirk Park Beach',
      time: '2:00 to 4:00',
      bullets: [
        'The beach is right there: Kirk Park, a 3 minute walk from lunch across Montauk Highway. Wide sand, lifeguards, restrooms.',
        'Beach afternoon. Swim, nap. Two hours on the sand; leave by 4.',
      ],
      photos: { kind: 'pair', align: 'right' },
    },
    {
      name: 'Montauk Village',
      time: '4:00 to 5:15',
      bullets: [
        'Leave the sand by 4 and wander back through the village: a full hour for the shops before the train.',
        "Quick browses on the way: White's Drug and Department Store (the Main Street classic), Homeport (books and local goods), Whalebone (soft tees, near the station end).",
        'Grab snacks for the ride at Montauk Bake Shoppe (the jelly croissants).',
        'Be at the station by 5 for the 5:15; Grand Central around 8:35.',
      ],
      photos: { kind: 'pair', align: 'right' },
    },
  ],
  callout: {
    label: 'GOOD TO KNOW',
    lines: [
      'One through-ticket, roughly $23 each way off-peak. Buy ahead in TrainTime; summer Saturday trains get crowded.',
      'The 5:15 back is the hard out: be at the station by 5, and confirm the exact time in TrainTime that morning.',
      'Ubers get scarce and surge on August weekends. Expect a short wait and save a local cab number as backup.',
    ],
  },
}

export const FOOTER_TEXT = 'Saturday · August 1 · Montauk'
