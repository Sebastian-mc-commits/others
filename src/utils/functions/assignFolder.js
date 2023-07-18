const fs = require("fs")
const path = require("path")

const assignFolder = (sourceFolder, destinationFolder) => {
  fs.readdir(sourceFolder, (err, files) => {
    if (err) {
      console.log("Error reading folder")
      return
    }

    const mp3Files = files.filter(file => path.extname(file) === ".mp4");

    mp3Files.forEach(file => {
      const sourceFilePath = path.join(sourceFolder, file);
      const destinationFilePath = path.join(destinationFolder, file);

      fs.renameSync(sourceFilePath, destinationFilePath)
    })
  })
}

module.exports = assignFolder