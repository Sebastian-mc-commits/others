
const getMp4Videos = async (videos) => {
  const ydl = require("youtube-dl-exec");
  await Promise.all(
    videos.map((video) => {
      return ydl.exec(video, {
        noCheckCertificates: true
      });
    })
  );
};

module.exports = getMp4Videos