// Ground truth: PAPER_SPEC.md (1:1 JSX export of the two Paper artboards).
// Artboard A = Option 1, Artboard B = Option 2. Deltas between the artboards
// (fonts, caption styles, image radii, gaps) are reproduced verbatim per option.

export const L500 = '"TWKLausannePan-500", "TWK Lausanne Pan", system-ui, sans-serif'
export const L400 = '"TWKLausannePan-400", "TWK Lausanne Pan", system-ui, sans-serif'
export const INTER = '"Inter", system-ui, sans-serif'

// Caption style variants, verbatim from the export (A mixes Inter-italic and
// Lausanne captions; B's single caption is Inter-italic).
const capInterItalicRight = {
  alignSelf: 'stretch', color: '#8A8A8A', display: 'flex', flexWrap: 'wrap',
  fontFamily: INTER, fontSize: '13px', fontStyle: 'italic',
  justifyContent: 'end', lineHeight: '16px', textAlign: 'right',
}
const capInterItalicLeft = {
  color: '#8A8A8A', fontFamily: INTER, fontSize: '13px', fontStyle: 'italic',
  lineHeight: '16px',
}
const capLausanneRight = {
  alignSelf: 'stretch', color: '#8A8A8A', display: 'flex', flexWrap: 'wrap',
  fontFamily: L400, fontSize: '13px', justifyContent: 'end',
  lineHeight: '16px', textAlign: 'right',
}
const capLausanneLeft = {
  color: '#8A8A8A', fontFamily: L400, fontSize: '13px', lineHeight: '16px',
}

export const OPTIONS = [
  {
    id: 'o1',
    chip: 'Beacon + Cold Spring',
    star: false,
    label: 'OPTION 1',
    labelLetterSpacing: null, // A's OPTION label has no letterSpacing
    activeChipColor: '#F2F0EF',
    title: 'Beacon + Cold Spring',
    titleFont: { fontFamily: INTER, fontWeight: 700 }, // A: Inter 700
    desc: 'Two riverside towns, 15 minutes apart. Good food, a bit of art, and views of the river and mountains.',
    descFont: { fontFamily: INTER },
    drive: [
      { label: 'NYC → BEACON', value: '1h 25m', maps: 'https://www.google.com/maps/dir/New+York,+NY/Beacon,+NY/' },
      { label: 'BEACON → COLD SPRING', value: '15m', maps: 'https://www.google.com/maps/dir/Beacon,+NY/Cold+Spring,+NY/' },
      { label: 'COLD SPRING → NYC', value: '1h 15m', maps: 'https://www.google.com/maps/dir/Cold+Spring,+NY/New+York,+NY/' },
      { label: 'ROUND TRIP', value: '~2h 55m', em: true, maps: 'https://www.google.com/maps/dir/New+York,+NY/Beacon,+NY/Cold+Spring,+NY/New+York,+NY/' },
    ],
    stops: [
      {
        name: 'Beacon',
        sup: '1',
        time: 'morning to midday',
        nested: true,
        bulletsGap: '12px',
        bullets: [
          'Dia:Beacon, big contemporary art in a converted Nabisco factory. Tickets are about $25. Give it ~1.5h and go earlier, since it closes mid-afternoon.',
          'Prefer to skip it? People say Dia is boring and empty. Do Main Street instead and save the $25.',
          "Main Street, the better food of the two towns. Lunch and shops: Homespun Foods, Meyer's Olde Dutch, or just look around.",
        ],
        photosGroup: {
          // A: { alignItems:'start', alignSelf:'stretch', gap: 20 (unitless) }
          style: { alignItems: 'start', alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: 20 },
          rows: [
            {
              align: 'right',
              rowStyle: { alignItems: 'center', alignSelf: 'stretch', display: 'flex', gap: '12px', justifyContent: 'end' },
              groupStyle: { alignItems: 'end', alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center', paddingTop: '4px' },
              imgs: [
                { src: 'beacon-dia-glass', w: 314, pos: '50%', radius: null },
                { src: 'beacon-dia-warhol', w: 158, pos: '50%', radius: null },
              ],
              caption: 'Dia:Beacon',
              captionStyle: capInterItalicRight,
            },
            {
              align: 'left',
              rowStyle: { alignItems: 'flex-start', display: 'flex', gap: '12px' },
              groupStyle: { alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: '10px' },
              imgs: [
                { src: 'beacon-bookshop', w: 158, pos: '50%', radius: null },
                { src: 'beacon-station', w: 158, pos: '50%', radius: null },
              ],
              caption: 'Beacon, Main Street',
              captionStyle: capInterItalicLeft,
            },
          ],
        },
      },
      {
        name: 'Cold Spring',
        sup: '2',
        time: 'afternoon to evening',
        nested: true,
        bulletsGap: '16px',
        bulletsStretch: true,
        bullets: [
          'Walk Main Street down to the river: antique shops, bookstores, and views of the Hudson and Breakneck Ridge.',
          "Early dinner before heading home. It's a village and nothing closes, so it's the easy part of the day.",
          "Food: Hudson Hil's Café, Cathryn's Tuscan Grill (check hours).",
        ],
        photosGroup: {
          style: { alignItems: 'start', alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: 20 },
          rows: [
            {
              align: 'right',
              rowStyle: { alignItems: 'center', alignSelf: 'stretch', display: 'flex', gap: '12px', justifyContent: 'end' },
              groupStyle: { alignItems: 'end', alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between', paddingTop: '4px' },
              imgs: [
                { src: 'cold-spring-riverside-tree', w: 158, pos: '50%', radius: null },
                { src: 'cold-spring-waterfront-bench', w: 158, pos: '50%', radius: null },
              ],
              caption: 'Cold Spring riverfront',
              captionStyle: capLausanneRight,
            },
            {
              align: 'left',
              rowStyle: { alignItems: 'flex-start', display: 'flex', gap: '12px' },
              groupStyle: { alignSelf: 'stretch', display: 'flex', flexDirection: 'column', gap: '10px' },
              imgs: [
                { src: 'cold-spring-main-st', w: 141, pos: '50% 54.829%', radius: null },
                { src: 'cold-spring-signpost', w: 118, pos: '50%', radius: null },
              ],
              caption: 'Cold Spring, Main Street',
              captionStyle: capLausanneLeft,
            },
          ],
        },
      },
    ],
    callout: {
      label: 'GOOD TO KNOW',
      labelLetterSpacing: null,
      width: null, // A: full width
      lines: [
        'Both towns are on the Metro-North Hudson Line if anyone would rather take the train instead.',
        'Need to book Dia in advance, $25 per person.',
      ],
    },
    sources: [
      { n: '1', text: 'Beacon · reddit.com/r/hudsonvalley/comments/1ir7omt', url: 'https://www.reddit.com/r/hudsonvalley/comments/1ir7omt/my_thoughts_on_beacon_ny/' },
      { n: '2', text: 'Cold Spring · reddit.com/r/hudsonvalley/comments/15xoseq', url: 'https://www.reddit.com/r/hudsonvalley/comments/15xoseq/is_cold_spring_a_good_place_to_go_for_a_long/' },
    ],
  },
  {
    id: 'o2',
    chip: 'Cold Spring + Innisfree / Millbrook',
    star: true,
    label: 'OPTION 2',
    labelLetterSpacing: '0.02em', // B's OPTION label adds letterSpacing
    activeChipColor: '#FFFFFF', // B's active chip text is #FFFFFF, not #F2F0EF
    title: 'Cold Spring + Innisfree / Millbrook',
    titleFont: { fontFamily: L500, fontWeight: 500 }, // B: Lausanne 500
    desc: 'Cold Spring in the morning, then up to the Innisfree garden and Millbrook village. The prettiest mix, and the longest day in the car.',
    descFont: { fontFamily: L400 },
    drive: [
      { label: 'NYC → COLD SPRING', value: '1h 15m', maps: 'https://www.google.com/maps/dir/New+York,+NY/Cold+Spring,+NY/' },
      { label: 'COLD SPRING → MILLBROOK', value: '50m', maps: 'https://www.google.com/maps/dir/Cold+Spring,+NY/Millbrook,+NY/' },
      { label: 'MILLBROOK → NYC', value: '1h 45m', maps: 'https://www.google.com/maps/dir/Millbrook,+NY/New+York,+NY/' },
      { label: 'ROUND TRIP', value: '~3h 50m', em: true, maps: 'https://www.google.com/maps/dir/New+York,+NY/Cold+Spring,+NY/Millbrook,+NY/New+York,+NY/' },
    ],
    stops: [
      {
        name: 'Cold Spring',
        sup: null, // B's Cold Spring stop has no superscript
        time: 'morning',
        nested: false,
        bullets: [
          'River walk, Main Street, antique shops, early lunch. Same as Option 1, just the morning half.',
        ],
      },
      {
        name: 'Innisfree Garden',
        sup: '1',
        time: 'early afternoon',
        nested: true,
        bulletsGap: '16px',
        bullets: [
          'A 185-acre garden built in Chinese and Japanese style around a 40-acre lake. Paths open onto water, meadow, and woods. This is the gorgeous one.',
          'Adults $10. Open May to Oct, Wed to Sun. Closes 5pm on weekends, so get there with time to spare.',
          'Mostly outdoors, so weather matters.',
        ],
        photosGroup: {
          // B: gap '14px' + paddingTop 4, plain column
          style: { display: 'flex', flexDirection: 'column', gap: '14px', paddingTop: '4px' },
          rows: [
            {
              align: 'left',
              rowStyle: { alignItems: 'flex-start', display: 'flex', gap: '12px' },
              groupStyle: { display: 'flex', flexDirection: 'column', gap: '10px' },
              imgs: [
                { src: 'innisfree-lake-path', w: 315, pos: '50%', radius: '4px' },
                { src: 'innisfree-pond', w: 210, pos: '50%', radius: '4px' },
              ],
              caption: null,
            },
            {
              align: 'left',
              rowStyle: { alignItems: 'flex-start', display: 'flex', gap: '12px' },
              groupStyle: { display: 'flex', flexDirection: 'column', gap: '10px' },
              imgs: [
                { src: 'innisfree-bridge', w: 315, pos: '50%', radius: '4px' },
                { src: 'innisfree-stone-steps', w: 142, pos: '50%', radius: '4px' },
              ],
              caption: 'Innisfree Garden',
              captionStyle: capInterItalicLeft,
            },
          ],
        },
      },
      {
        name: 'Millbrook village',
        sup: '2',
        time: 'optional · late afternoon',
        nested: false,
        bullets: [
          'Small horse-country town. Franklin Avenue for coffee and shops (Merritt Bookstore, the antiques mall), and food like Barbaro or Café Les Baux.',
          'The 6-acre Tribute Garden sits right on the avenue.',
        ],
      },
    ],
    callout: {
      label: 'TRADE-OFF',
      labelLetterSpacing: '0.02em',
      width: '611px', // B: fixed width (clamped to 100% for mobile)
      lines: [
        'More driving than Option 1, but less to spend: Innisfree is $10 versus $25 for Dia. No museum, just the garden and two nice main streets.',
      ],
    },
    sources: [
      { n: '1', text: 'Innisfree · yelp.com/biz/innisfree-garden-millbrook', url: 'https://www.yelp.com/biz/innisfree-garden-millbrook' },
      { n: '2', text: 'Millbrook · reddit.com/r/hudsonvalley/comments/1nir4dj', url: 'https://www.reddit.com/r/hudsonvalley/comments/1nir4dj/millbrook_whats_the_vibe/' },
    ],
  },
]

export const FOOTER_TEXT = 'Sunday · July 26 · Hudson Valley'
