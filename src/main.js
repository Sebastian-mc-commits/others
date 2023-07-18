const assignFolder = require("./utils/functions/assignFolder");
const getMp3Videos = require("./utils/functions/getMp3Videos");

const videos = [
  "https://www.youtube.com/watch?v=6LXMs8em930",
  "https://www.youtube.com/watch?v=TXYMMsoTMLQ",
  "https://www.youtube.com/watch?v=US0GbUpQ9VU",
  "https://www.youtube.com/watch?v=V3y7IAg9EFs",
  "https://www.youtube.com/watch?v=OxO2tw_rcmY",
  "https://www.youtube.com/watch?v=pTLHo0qzU-k",
  "https://www.youtube.com/watch?v=bw4WrcEu8CY",
  "https://www.youtube.com/watch?v=yqMh16w_-PQ",
  "https://www.youtube.com/watch?v=TDFgWgk3Hdg",
  "https://www.youtube.com/watch?v=MhswasRB-xo",
  "https://www.youtube.com/watch?v=fyZS-L_YAyY",
  "https://www.youtube.com/watch?v=kuJlxgAdoVQ",
  "https://www.youtube.com/watch?v=OwbQMh7ItuU",
  "https://www.youtube.com/watch?v=-PS5Q8O8p_k",
  "https://www.youtube.com/watch?v=gxlB1B9emDc",
  "https://www.youtube.com/watch?v=B1zwsyUy_aU",
  "https://www.youtube.com/watch?v=pjFfoARas_E",
  "https://www.youtube.com/watch?v=fEhnwoVjrgc",
  "https://www.youtube.com/watch?v=TNanOk4NI3A",
  "https://www.youtube.com/watch?v=_BnwvqPUpik",
  "https://www.youtube.com/watch?v=pry-ZU6StYk",
  "https://www.youtube.com/watch?v=SUgQHe902yQ",
  "https://www.youtube.com/watch?v=g1fGCWhK4JU",
  "https://www.youtube.com/watch?v=_3bsI9AK8Ak",
  "https://www.youtube.com/watch?v=sJqDmVekMWU",
  "https://www.youtube.com/watch?v=fvcxGU8C8pw",
  "https://www.youtube.com/watch?v=AiedUZWxGtA",
  "https://www.youtube.com/watch?v=R70wWRqWU_c",
  "https://www.youtube.com/watch?v=vdzKp-7XH6g",
  "https://www.youtube.com/watch?v=SwrIAVlXSMc",
  "https://www.youtube.com/watch?v=L-AushSSq2I",
  "https://www.youtube.com/watch?v=krA4QNOpFbU",
  "https://www.youtube.com/watch?v=BF83Xxawv5A",
  "https://www.youtube.com/watch?v=HqximtGu4uo",
  "https://www.youtube.com/watch?v=bqnY6w6AWm0",
  "https://www.youtube.com/watch?v=Eys-sq3yHvQ",
  "https://www.youtube.com/watch?v=az5AXsWVnCc",
  "https://www.youtube.com/watch?v=VG16Z463irg",
  "https://www.youtube.com/watch?v=KraGlseJd7U",
  "https://www.youtube.com/watch?v=Td3sAqYdeNA",
  "https://www.youtube.com/watch?v=nSVRC2wFKaw",
  "https://www.youtube.com/watch?v=Q0-YLtwAVSg",
  "https://www.youtube.com/watch?v=_5MycQSty00"
];

getMp3Videos(videos)
  .then(() => console.log("Videos converted successfully"))
  .catch((e) => console.log(`Error: ${e.message}`));