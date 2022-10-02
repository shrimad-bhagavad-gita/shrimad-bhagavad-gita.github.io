const groups = [
  {
    name: "Anger",
    description: "Anger",
    isActive: true,
    id: 1,
    cards: [
      3
    ]
  },
  {
    name: "Confusion",
    description: "Confusion",
    isActive: true,
    id: 2,
    cards: [
      1, 2
    ]
  },
  {
    name: "Envy",
    description: "Envy",
    isActive: true,
    id: 3,
    cards: [
      1, 3
    ]
  }

];


const cards = [
  {
    code: "BG 1.1",
    name: "Chapter 1, Verse 1",
    description: "dhrtarastra uvaca dharma-ksetre kuru-ksetre samaveta yuyutsavah    mamakah pandavas caiva    kim akurvata sanjaya",
    synonmys: "sanjayah--Sanjaya; uvaca--said; drstva--after seeing; tu--but; pandavaanikam--the soldiers of the Pandavas; vyudham--arranged in military phalanx; duryodhanah--King Duryodhana; tada--at that time; acaryam--the teacher; upasangamya--approaching nearby; raja--the king; vacanam--words; abravit--spoke.",
    meaning: "Dhrtarastra said: O Sanjaya, after assembling in the place of pilgrimage at Kuruksetra, what did my sons and the sons of Pandu do, being desirous to fight?",
    chapter: "1",
    verse: "1",
    id: 1
  },
  {
    code: "BG 1.2",
    name: "Chapter 1, Verse 2",
    description: "sanjaya uvaca    drstva tu pandavanikam    vyudham duryodhanas tada    acaryam upasangamya    raja vacanam abravit",
    synonmys: "pasya--behold; etam--this; pandu-putranam--of the sons of Pandu; acarya--O teacher; mahatim--great; camum--military force; vyudham--arranged; drupada-putrena--by the son of Drupada; tava--your; sisyena--disciple; dhi-mata--very intelligent.",
    meaning: "Sanjaya said: O King, after looking over the army gathered by the sons of Pandu, King Duryodhana went to his teacher and began to speak the following words:",
    chapter: "1",
    verse: "2",
    id: 2
  },
  {
    code: "BG 1.3",
    name: "Chapter 1, Verse 3",
    description: "pasyaitam pandu-putranam     acarya mahatim camum    vyudham drupada-putrena    tava sisyena dhimata",
    synonmys: "pasya--behold; etam--this; pandu-putranam--of the sons of Pandu;   acarya--O teacher; mahatim--great; camum--military force; vyudham--    arranged; drupada-putrena--by the son of Drupada; tava--your; sisyena--    disciple; dhi-mata--very intelligent.",
    meaning: "O my teacher, behold the great army of the sons of Pandu, so expertly    arranged by your intelligent disciple, the son of Drupada.",
    chapter: "1",
    verse: "3",
    id: 3
  }
];

module.exports = {
  groups,
  cards
};
