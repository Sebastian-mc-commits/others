const getMp3Videos = async (videos, dir = "music") => {

  const {Downloader} = require("ytdl-mp3");
  const downloader = new Downloader({
    getTags: true,
    outputDir: __dirname + "/" + dir
  })

  for await (const video of videos) {
    try {
      await downloader.downloadSong(video)
    }
    catch (e) {
      console.log("Error found" + e.message)
    }
  }
};

module.exports = getMp3Videos