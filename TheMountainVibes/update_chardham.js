const fs = require("fs");

let content = fs.readFileSync("treks-data.js", "utf8");

// 1. Remove "char-dham" from the forEach array
content = content.replace(
  /\[\s*"char-dham",\s*"panch-kedar",\s*"annapurna",\s*\]\.forEach/,
  '[\n  "panch-kedar",\n  "annapurna",\n].forEach',
);

// 2. We don't necessarily need to remove the char-dham block from the 'd' object inside the template because it won't be accessed anymore, but it's cleaner to just leave it or it won't hurt.

// 3. Inject the new char-dham object into the main TREKS object right before "}; // end of TREKS"
// Wait, the main object doesn't end with "}; // end of TREKS". It ends with "};" followed by "// Fill remaining treks"

const charDhamData = `  "char-dham": {
    title: "Char Dham Yatra",
    img: "/The-Mountain-Vibes/photos/Treks/treks/(16)%20Char%20Dham.jpg",
    region: "Uttarakhand",
    diff: "Easy to Moderate",
    season: "May to June & September to October",
    dur: "10–12 Days",
    alt: "11,755 ft",
    dist: "Overland",
    startEnd: "Haridwar / Rishikesh",
    price: 25000,
    priceOld: "₹32,000",
    dates: ["May 15, 2026", "Jun 10, 2026", "Sep 20, 2026"],
    about:
      "The Char Dham Yatra is one of the most sacred pilgrimage journeys in India, covering the four holy shrines of Yamunotri, Gangotri, Kedarnath, and Badrinath in Uttarakhand. Nestled deep within the Garhwal Himalayas, this spiritual journey attracts millions of devotees and adventure seekers every year. The Char Dham route combines spirituality, Himalayan beauty, ancient temples, river valleys, snow-covered mountains, and cultural heritage. Pilgrims believe that completing the Char Dham Yatra washes away sins and leads to spiritual liberation. Apart from its religious importance, the yatra offers breathtaking landscapes, scenic mountain roads, glacier-fed rivers, dense forests, and unforgettable Himalayan experiences.",
    bestTime:
      "The best time for Char Dham Yatra is during Summer (May to June) and Autumn (September to October). Summer offers pleasant weather and open temples, representing the peak pilgrimage season. Autumn provides clear skies, stable weather, and beautiful Himalayan views with fewer crowds. Monsoon season is generally avoided due to landslides and heavy rainfall.",
    highlights: [
      "🛕 Yamunotri, Gangotri, Kedarnath, and Badrinath Temples",
      "🏔 Scenic Himalayan roads and valleys",
      "🙏 Spiritual rituals and holy rivers",
      "🏘 Traditional mountain culture and villages",
      "🌊 River confluences and hot springs",
      "⛰️ Views of Chaukhamba and other Himalayan peaks",
    ],
    itinerary: [
      {
        day: 1,
        title: "Haridwar / Rishikesh to Barkot",
        sub: "Drive: 180 km | 7–8 Hours | 4,000 ft",
        points: [
          "The journey begins from Haridwar or Rishikesh and proceeds toward Barkot through scenic mountain roads and river valleys.",
          "Trekkers witness beautiful Himalayan landscapes, forests, and traditional villages throughout the drive.",
          "Barkot serves as the base for the Yamunotri pilgrimage.",
        ],
      },
      {
        day: 2,
        title: "Barkot to Yamunotri and Return",
        sub: "Trek: 6 km One Way | 10,804 ft",
        points: [
          "The trek to Yamunotri begins from Janki Chatti. Pilgrims can trek, hire ponies, or use palanquins.",
          "Yamunotri Temple is dedicated to Goddess Yamuna and is located beside hot water springs surrounded by mountains.",
          "Pilgrims take holy baths in Surya Kund before offering prayers at the temple.",
          "Return to Barkot after darshan.",
        ],
      },
      {
        day: 3,
        title: "Barkot to Uttarkashi",
        sub: "Drive: 100 km | 4–5 Hours | 3,800 ft",
        points: [
          "The drive follows scenic valleys and river routes toward Uttarkashi, an important spiritual and trekking town in Uttarakhand.",
          "Pilgrims can visit the famous Kashi Vishwanath Temple in the evening.",
        ],
      },
      {
        day: 4,
        title: "Uttarkashi to Gangotri and Return",
        sub: "Drive: 100 km One Way | 10,200 ft",
        points: [
          "The route toward Gangotri passes through Harsil Valley, one of the most beautiful locations in Uttarakhand.",
          "Gangotri Temple is dedicated to Goddess Ganga and marks the spiritual origin of the River Ganga.",
          "The surrounding snow-covered mountains and Bhagirathi River create a peaceful spiritual atmosphere.",
          "Return to Uttarkashi after temple visit.",
        ],
      },
      {
        day: 5,
        title: "Uttarkashi to Guptkashi",
        sub: "Drive: 220 km | 8–9 Hours | 4,300 ft",
        points: [
          "The journey continues through Rudraprayag and scenic Himalayan valleys toward Guptkashi.",
          "Guptkashi is an important stop before Kedarnath and is famous for the Vishwanath Temple and views of Chaukhamba Peak.",
        ],
      },
      {
        day: 6,
        title: "Guptkashi to Kedarnath",
        sub: "Trek: 16 km | 11,755 ft",
        points: [
          "The Kedarnath trek begins from Gaurikund and gradually ascends through mountain valleys and river routes.",
          "Pilgrims can also use ponies, palkis, or helicopter services.",
          "Kedarnath Temple, dedicated to Lord Shiva, is one of the twelve Jyotirlingas and among the holiest temples in India.",
          "The temple backdrop against snow-covered peaks creates an unforgettable spiritual experience.",
        ],
      },
      {
        day: 7,
        title: "Kedarnath to Guptkashi",
        sub: "Descent",
        points: [
          "After morning prayers and temple darshan, descend back to Gaurikund and drive toward Guptkashi.",
          "The evening is reserved for rest and recovery.",
        ],
      },
      {
        day: 8,
        title: "Guptkashi to Badrinath",
        sub: "Drive: 190 km | 7–8 Hours | 10,279 ft",
        points: [
          "The route passes through Joshimath and scenic Himalayan landscapes before reaching Badrinath.",
          "Badrinath Temple, dedicated to Lord Vishnu, lies between Nar and Narayan mountain ranges beside the Alaknanda River.",
          "Pilgrims can also visit Tapt Kund, Mana Village, Vyas Gufa, and Bhim Pul.",
        ],
      },
      {
        day: 9,
        title: "Badrinath to Rudraprayag",
        sub: "Drive: 160 km | 6–7 Hours",
        points: [
          "After morning darshan at Badrinath Temple, drive toward Rudraprayag through beautiful mountain roads and river confluences.",
        ],
      },
      {
        day: 10,
        title: "Rudraprayag to Haridwar / Rishikesh",
        sub: "Drive: 160 km | 6–7 Hours",
        points: [
          "Drive back to Haridwar or Rishikesh concludes the Char Dham Yatra.",
        ],
      },
    ],
    includes: [
      "All accommodation during the Yatra",
      "All meals (breakfast, lunch, dinner)",
      "Transportation via Tempo Traveler / Innova",
      "Experienced driver and guide",
      "Basic first aid kit",
    ],
    excludes: [
      "Helicopter, pony, or palanquin charges",
      "Special pooja tickets and offerings",
      "Personal trekking gear and warm clothing",
      "Travel insurance",
      "Extra snacks, beverages, and tips",
    ],
    carry: [
      "🥾 Comfortable trekking shoes",
      "🧥 Warm jackets and woolens",
      "🌧 Raincoat and waterproof gear",
      "💊 Personal medicines",
      "🕶 Sunglasses and sunscreen",
      "🦯 Walking stick or trekking pole",
      "🛂 ID proof and travel documents",
      "💧 Water bottles and energy snacks",
    ],
    photos: [
      "/The-Mountain-Vibes/photos/Treks/treks/(16)%20Char%20Dham.jpg",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&q=80",
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=600&q=80",
    ],
    reviews: [
      {
        name: "Sanjay Mishra",
        loc: "Delhi",
        e: "👨",
        r: 5,
        date: "May 2025",
        text: "The Char Dham Yatra was a deeply spiritual and beautifully organized journey. The accommodations were clean, and the travel was smooth despite the mountain roads.",
      },
      {
        name: "Nita Patel",
        loc: "Ahmedabad",
        e: "👩",
        r: 5,
        date: "September 2025",
        text: "Visiting Kedarnath and Badrinath with Mountain Vibes was an incredible experience. The guides were very helpful during the treks and darshan.",
      },
    ],
    faqs: [
      {
        q: "How difficult is the Char Dham Yatra?",
        a: "The Char Dham Yatra is categorized as Easy to Moderate. The journey mainly involves road travel with moderate trekking required at Yamunotri (6 km) and Kedarnath (16 km). Basic fitness and proper acclimatization are recommended.",
      },
      {
        q: "What is the best time for Char Dham Yatra?",
        a: "The best time is May to June and September to October. Monsoon season (July-August) is generally avoided due to landslides and heavy rainfall.",
      },
    ],
  },
};`;

content = content.replace(
  /};\n\n\/\/ Fill remaining treks with quick template/,
  ",\n" + charDhamData + "\n\n// Fill remaining treks with quick template",
);

fs.writeFileSync("treks-data.js", content, "utf8");
console.log("Successfully updated treks-data.js via node script.");
