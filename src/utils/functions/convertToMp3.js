const fs = require("fs")
const path = require("path")

const convertToMp3 = (sourceFolder) => {
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.log("Error reading folder")
      return
    }

    const mp3Files = files.filter(file => path.extname(file) === ".mp4");

    mp3Files.forEach(file => {
      const sourceFilePath = path.join(sourceFolder, file + path.extname(file));

      fs.renameSync(sourceFilePath)
    })
  })
}

module.exports = convertToMp3