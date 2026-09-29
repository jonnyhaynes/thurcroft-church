import type {
  Block,
  ChurchEvent,
  ContentPage,
  FacilityGroup,
  ImageRef,
  NewsPost,
  ServiceTime,
  WeeklyActivity,
} from "./types";

const IMG = "/images/church";

// NOTE: alt text for the church's own photos is provisional — the images were
// downloaded from the ACNY media library and must be reviewed with the church
// before launch. See docs/alt-text-review.md.
export const gallery: ImageRef[] = [
  {
    src: `${IMG}/church-01.jpg`,
    alt: "St Simon and St Jude Parish Church seen across the lawn from the south-west, with its tower, tall arched window and long tiled roof.",
  },
  {
    src: `${IMG}/church-02.jpg`,
    alt: "The church at dusk, its tower standing against pink and purple streaked clouds, with the porch light on and the door open.",
    caption: "The church at dusk.",
  },
  {
    src: `${IMG}/church-03.jpg`,
    alt: "A black-and-white photograph of New Orchard Farm, a large brick farmhouse with a white porch and outbuildings.",
    caption: "New Orchard Farm, where the first worshipping community met in 1915.",
  },
  {
    src: `${IMG}/church-04.jpg`,
    alt: "A faded photograph of the north side of the church, showing the long nave with its rows of windows and the parish noticeboard.",
  },
  {
    src: `${IMG}/church-05.jpg`,
    alt: "An aerial view of the church beside the old timber-framed church hall, with the village green and terraced houses beyond.",
    caption: "The church and the old church hall from the air.",
  },
  {
    src: `${IMG}/church-06.png`,
    alt: "A two-part historical image: a black-and-white photograph of the original timber-framed church, and a 1965 colour photograph of the same building in use as the church hall.",
    caption: "The original church building, which later became the church hall.",
  },
];

export const heroImage: ImageRef = {
  src: `${IMG}/home-hero.jpg`,
  alt: "St Simon and St Jude Parish Church on a bright day, its tower and tall arched window rising above the green church lawn.",
};

export const serviceTimes: ServiceTime[] = [
  {
    id: "holy-communion",
    title: "Holy Communion",
    pattern: "1st, 2nd & 3rd Sundays",
    time: "10:30am",
    description:
      "Our main Sunday service, with hymns and worship songs, a reading from the Bible and Holy Communion.",
    order: 1,
  },
  {
    id: "all-age",
    title: "All Age Service",
    pattern: "4th Sunday of the month",
    time: "10:30am",
    description:
      "A relaxed, family-friendly service for all ages. Children are very welcome, and there is no expectation to sit still.",
    order: 2,
  },
  {
    id: "said-communion",
    title: "Said Holy Communion",
    pattern: "Wednesday after the 4th Sunday",
    time: "10:00am",
    description: "A quieter, said service of Holy Communion.",
    order: 3,
  },
];

export const weeklyActivities: WeeklyActivity[] = [
  {
    id: "thursday-mornings",
    name: "Thursday mornings",
    when: "Every Thursday, 9:30am–12:30pm",
    description:
      "The church is open for enquiries, cleaning, gardening and refreshments. During term time, Post 16 students from The Willows Special Educational Needs School come to help with gardening, cleaning and other tasks which build their independence, confidence and life skills.",
  },
  {
    id: "coffee-morning",
    name: "Coffee morning",
    when: "First Friday of each month (except January)",
    description: "Join us for coffee, cake and a chat.",
  },
  {
    id: "little-saints",
    name: "The Little Saints Toddler Group",
    when: "Twice a month, Monday afternoons during term time",
    description: "A friendly group for parents, carers and their little ones.",
  },
  {
    id: "holiday-club",
    name: "Holiday Brunch Club",
    when: "During the school holidays",
    description: "A brunch club for children and their carers during the school holidays.",
  },
];

export const facilityGroups: FacilityGroup[] = [
  {
    heading: "Accessibility",
    items: [
      "Inclusive church — everyone is welcome at Thurcroft Parish Church",
      "Accessible parking in the car park in front of the church, on the north side",
      "Ramp for wheelchairs, mobility scooters, pushchairs and prams, and at the Lady Chapel",
      "Step-free access with wide entrances inside the building",
      "A wheelchair is available in church should anyone need it",
      "Gluten-free Communion wafers are available",
      "Assistance dogs — all dogs are very welcome in our church",
      "Accessible toilet for wheelchair users",
      "Dementia aware and accessible",
      "We do not have a hearing (induction) loop, but we use microphones",
      "Baby changing shelf available in one toilet",
    ],
  },
  {
    heading: "Our building",
    items: [
      "Car park on the north side of the church",
      "Toilets with baby changing facilities, and disabled toilets",
      "Bike rack",
    ],
  },
  {
    heading: "Music and worship",
    items: [
      "Space for concerts and live music",
      "The current organ is a Hammond Organ E112, given by Mr R Down",
    ],
  },
  {
    heading: "Groups, courses and activities",
    items: [
      "Coffee morning on the first Friday of each month except January",
      "Holiday Brunch Club for children and carers during the school holidays",
      "The Little Saints Toddler Group, twice a month on a Monday afternoon in term time",
    ],
  },
  {
    heading: "Help for visitors",
    items: [
      "The church is open every Thursday morning, 9:30am–12:30pm",
      "Dogs are always welcome during services and activities",
      "We take donations to deliver to the food bank at Liberty Church in Thurcroft",
    ],
  },
  {
    heading: "Other features",
    items: ["Our church room is available to hire at £15 per hour"],
  },
];

export const events: ChurchEvent[] = [
  {
    slug: "thursday-mornings",
    title: "Thursday Mornings",
    summary:
      "The church is open every Thursday morning for enquiries, cleaning, gardening and refreshments.",
    body: [
      {
        _type: "paragraph",
        text: "The church is open every Thursday morning, 9:30am–12:30pm, for enquiries, cleaning, gardening and refreshments.",
      },
      {
        _type: "paragraph",
        text: "During term time, Post 16 students from The Willows Special Educational Needs School come to church to help with gardening, cleaning and other tasks which help with their independence, confidence and life skills.",
      },
      {
        _type: "paragraph",
        text: "Everyone is welcome to call in — whether you have a question, would like to help, or would just like a cup of tea.",
      },
    ],
    recurring: { day: "Every Thursday", time: "9:30am–12:30pm" },
    venue: "St Simon and St Jude, Church Street, Thurcroft",
    tags: ["Family friendly", "Refreshments", "Community"],
    image: gallery[0],
    featured: true,
  },
  {
    slug: "coffee-morning",
    title: "Coffee Morning",
    summary: "Coffee, cake and a chat on the first Friday of each month (except January).",
    body: [
      {
        _type: "paragraph",
        text: "Our monthly coffee morning takes place on the first Friday of each month, except January. Come along for coffee, cake and company — no need to book.",
      },
    ],
    recurring: { day: "First Friday of the month", time: "From 10:00am" },
    venue: "St Simon and St Jude, Church Street, Thurcroft",
    tags: ["Refreshments", "Community"],
    image: gallery[1],
  },
];

export const news: NewsPost[] = [
  {
    slug: "a-new-roof-on-the-north-aisle",
    title: "A new roof is fitted on the North Aisle",
    // Date to be confirmed with the church (available on their Facebook page).
    date: undefined,
    excerpt: "Work to replace the roof over the North Aisle has been completed.",
    body: [
      {
        _type: "paragraph",
        text: "A new roof has been fitted on the North Aisle. Our thanks go to everyone who gave, prayed and worked to make the repairs possible.",
      },
      {
        _type: "paragraph",
        text: "The church building opened for worship on 1st July 1939, and caring for it is an ongoing act of stewardship by the whole parish.",
      },
    ],
    coverImage: gallery[3],
  },
];

// ---------------------------------------------------------------------------
// Pages — largely migrated from ACNY, with a light editorial pass.
// ---------------------------------------------------------------------------

const historyBlocks: Block[] = [
  {
    _type: "paragraph",
    text: "Until the 20th century, Thurcroft consisted of Thurcroft Hall and four farms — New Orchard, Sawn Moor, Green Arbour and later Steadfolds Farm (although the first official record of a settlement in Thurcroft was 1319).",
  },
  {
    _type: "paragraph",
    text: "The land on which the village would one day stand was bought in the 1800s, along with Thurcroft Hall, by a Sheffield brewer, Thomas Marrian. His son, Thomas Marrian Jr, leased the coal mining rights to the Rother Vale Colliery Company in 1902.",
  },
  {
    _type: "paragraph",
    text: "Thurcroft came into being as a village after 1909 with the sinking of the local pit, and there soon arose the need for a village church.",
  },
  {
    _type: "paragraph",
    text: "Before there was an actual church building, a worshipping community known as Thurcroft Mission Church began, meeting in a room at New Orchard Farm in 1915.",
  },
  {
    _type: "paragraph",
    text: "Eventually, church members bought a wooden hut which cost £48. On 28th October 1917, the dedication of the Mission Church took place.",
  },
  {
    _type: "paragraph",
    text: "In July 1921 a new church building made of wood was erected, completed in 1922 and named St Simon and St Jude. It was later used as the Church Hall until it was demolished in 1995.",
  },
  {
    _type: "paragraph",
    text: "In 1935 the Diocesan Church Extension Committee resolved to build a new church, supported by a £2,000 allocation, contributions from the Rother Vale Colliery Company, and £25,000 donated by its chairman, Walter Benton-Jones. A new church building was constructed, with the foundation stone laid on 2nd October 1937 by the Rother Vale Colliery Company Chairman, Sir Walter Benton-Jones, Baronet.",
  },
  { _type: "paragraph", text: "The church opened for worship on 1st July 1939." },
  {
    _type: "paragraph",
    text: "On 23rd May 1948 the church became a Parish Church in its own right, having previously been within the Parish of Laughton-en-le-Morthen.",
  },
  {
    _type: "paragraph",
    text: "Between 1948 and 1965 the Vicars of Thurcroft also served the Parish Church of Holy Trinity in Ulley while it had no incumbent.",
  },
  {
    _type: "paragraph",
    text: "In recent years, Thurcroft was in partnership with Maltby from 2009 to 2021, with Laughton-en-le-Morthen joining in 2018. Since 2022, Thurcroft has been in partnership with St Leonard's Church in Dinnington, sharing services and activities together.",
  },
];

const parishPriestsBlocks: Block[] = [
  { _type: "heading", text: "Vicar of Laughton" },
  { _type: "list", style: "bullet", items: ["1915–1919 Rev C Galleymore"] },
  { _type: "heading", text: "Priests in charge" },
  {
    _type: "list",
    style: "bullet",
    items: [
      "1919–1924 Rev W A Kendal",
      "1924–1928 Rev A Crossland",
      "1928–1931 Rev W Paskin",
      "1931–1935 Rev C W Scott",
      "1935–1938 Rev C Norton",
      "1938–1942 Rev A King",
      "1942–1946 Rev W J Lowry",
    ],
  },
  { _type: "heading", text: "Vicars" },
  {
    _type: "list",
    style: "bullet",
    items: [
      "1946–1955 Rev K F Kinns",
      "1955–1960 Rev J Kennedy",
      "1960–1961 Rev F Milverton",
      "1961–1966 Rev F J Humble",
      "1966–1972 Rev J W A Copeland",
      "1973–1982 Rev S J Matthews",
      "1982–1987 Rev W Charlton",
      "1987–1988 Rev M J Robinson",
      "1988–1995 Rev John Butterfield",
      "1993–1995 Rev Richard Gomersall (Deacon/Curate)",
    ],
  },
  { _type: "heading", text: "Recent years" },
  {
    _type: "list",
    style: "bullet",
    items: [
      "1996–2005 Rev Paul Hunter",
      "2009–2014 Rev Peter Craig-Wild (Priest in Charge) and Rev Dhoe Craig-Wild (Assistant Curate)",
      "2010–2013 Rev Janet Franklin (Deacon/Curate)",
      "2015–2021 Rev Mike Rajkovic (Priest in Charge)",
      "2017–2019 Rev Keith Hanson (Mission Development Vicar)",
      "2022– Rev Miranda Hayes (Priest in Charge)",
      "2023–2025 Rev Louise McInnes (Deacon/Curate)",
      "2024– Rev Dave Johnson (Deacon/Curate, ordained Priest in 2025)",
    ],
  },
];

export const pages: ContentPage[] = [
  {
    slug: "about",
    title: "Our story",
    eyebrow: "About us",
    intro:
      "Welcome to St Simon and St Jude, Thurcroft's Parish Church — at the heart of the community it serves. It is open for all of us.",
    body: [
      {
        _type: "paragraph",
        text: "We are also part of a Mission Area with St Leonard's Church in Dinnington. We are a family-friendly church offering a warm, inclusive welcome where everyone can participate fully in worship, fellowship and ministry.",
      },
      {
        _type: "paragraph",
        text: "Come and join us. We read from the Bible, sing hymns and worship songs, and share a good time together. The church is open on different days and times throughout the week.",
      },
      { _type: "paragraph", text: "Everyone is welcome at St Simon and St Jude." },
      { _type: "heading", text: "Thurcroft history" },
      ...historyBlocks,
    ],
    seo: {
      description:
        "The story of St Simon and St Jude, Thurcroft — from a mission church in 1915 to a parish church at the heart of the community.",
    },
  },
  {
    slug: "weddings",
    title: "Weddings",
    eyebrow: "Life events",
    intro:
      "Marrying in church is personal, meaningful and as spiritual as you want it to be.",
    body: [
      {
        _type: "paragraph",
        text: "If you are thinking of marrying at Thurcroft Parish Church, you can visit St Simon and St Jude on a Thursday or Sunday morning from 9:30am–12:30pm.",
      },
      {
        _type: "paragraph",
        text: "There are certain requirements which need to be met in order for you to be married in church — the reading of the banns. A meeting with the vicar will follow, who will advise and prepare you for your wedding day.",
      },
      {
        _type: "paragraph",
        text: "If you are marrying in another parish and need your banns called in Thurcroft, please visit the church and this will also be arranged.",
      },
      { _type: "image", src: gallery[1].src, alt: gallery[1].alt },
    ],
  },
  {
    slug: "baptisms",
    title: "Baptisms and christenings",
    eyebrow: "Life events",
    intro: "Baptisms, also known as christenings, take place on the 1st and 3rd Sunday of the month.",
    body: [
      {
        _type: "paragraph",
        text: "If you would like to book a baptism for yourself or a child at St Simon and St Jude, please come to church on a Thursday or Sunday morning from 9:30am–12:30pm to fill in a baptism booking form.",
      },
      {
        _type: "paragraph",
        text: "The vicar will then contact you to arrange a meeting, with a view to booking a date and going through the baptism service with you.",
      },
      {
        _type: "paragraph",
        text: "Families are invited back to the next All Age Service, held on the 4th Sunday of each month, to collect baptism cards and candles.",
      },
      {
        _type: "paragraph",
        text: "The church is open 9:30am–12:30pm on Thursdays and Sundays.",
      },
    ],
  },
  {
    slug: "safeguarding",
    title: "Safeguarding",
    intro:
      "The Parish of Thurcroft is committed to the safeguarding and care of children, young people and adults who visit and use the building.",
    body: [
      {
        _type: "paragraph",
        text: "The PCC has adopted the Church of England's House of Bishops guidance, best practice and policies on safeguarding.",
      },
      {
        _type: "paragraph",
        text: "The Diocese of Sheffield's website has safeguarding pages containing vital links and information, including contacts for the Diocesan Safeguarding Adviser who advises our Parish Safeguarding Officers.",
      },
      { _type: "heading", text: "Who to contact" },
      {
        _type: "paragraph",
        text: "If you are concerned that a child or adult has been harmed, or may be at risk of harm, please contact our Parish Safeguarding Officer, Rev Dave Johnson, via the church on 01909 318059, or the Diocesan Safeguarding Adviser for the Diocese of Sheffield.",
      },
      {
        _type: "paragraph",
        text: "If you have immediate concerns about the safety of someone, please contact the police and your local authority Children or Adult Services.",
      },
    ],
    seo: {
      description:
        "Safeguarding information and contacts for the Parish of Thurcroft, St Simon and St Jude.",
    },
  },
  {
    slug: "memorial-book",
    title: "Memorial book",
    body: [
      {
        _type: "paragraph",
        text: "We have a Memorial Book in church. If you would like a loved one's name to be written in the book, a donation of £10 would be appreciated. Names are added as requested on the memorial book form — these are available in church. Please gift aid if you can.",
      },
      {
        _type: "paragraph",
        text: "Call in at the church to fill in a form, or contact the Churchwardens via the church on 01909 318059.",
      },
    ],
  },
  {
    slug: "school-uniform-swap-point",
    title: "School uniform swap point",
    body: [
      {
        _type: "paragraph",
        text: "We have set up a school uniform swap point at the church. Any uniform you no longer need from Thurcroft primary schools can be dropped off at church when we are open. Please contact us if you need something.",
      },
      {
        _type: "paragraph",
        text: "We are hoping this project will help the village both financially and environmentally. We are also accepting uniform in need of minor repairs — the uniforms don't need to be perfect, just usable. Thank you.",
      },
    ],
  },
  {
    slug: "our-old-church-building",
    title: "Our old church building",
    body: [
      {
        _type: "paragraph",
        text: "Our old church building, which later became the Church Hall, before it was demolished in 1995.",
      },
      {
        _type: "image",
        src: `${IMG}/church-05.jpg`,
        alt: "An aerial view of the church beside the old timber-framed church hall, with the village green beyond.",
        caption: "The church and the old church hall from the air.",
      },
    ],
  },
  {
    slug: "parish-priests",
    title: "Parish priests",
    intro: "A record of the priests who have served the parish of Thurcroft.",
    body: parishPriestsBlocks,
  },
];
