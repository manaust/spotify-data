const fs = require("fs");

const all = [];
let i = 0;

const writeToFile = (json) => {
  console.log("Writing json to file...");
  fs.writeFile(`api/songs.json`, JSON.stringify(json), "utf8", (err) => {
    if (err) {
      console.error("An error occured while writing JSON to file.");
      return;
    }
    console.log("JSON file has been saved.");
  });
};

while (true) {
  try {
    const tracks = JSON.parse(fs.readFileSync(`api/output${i}.json`));
    for (let j = 0; j < tracks.length; j++) {
      let currTrack = tracks[j].track;

      const large = currTrack.album.images.filter((obj) => {
        return obj.height === 640;
      })[0];

      const medium = currTrack.album.images.filter((obj) => {
        return obj.height === 300;
      })[0];

      const small = currTrack.album.images.filter((obj) => {
        return obj.height === 64;
      })[0];

      currTrack.thumbnail_large = large.url;
      currTrack.thumbnail_medium = medium.url;
      currTrack.thumbnail_small = small.url;

      if (currTrack.name.indexOf(" -") != -1) {
        currTrack.name = currTrack.name.substring(
          0,
          currTrack.name.indexOf(" -")
        );
      }
      currTrack.artist = currTrack.artists[0].name;
      currTrack.release_date = currTrack.album.release_date;
      currTrack.album = currTrack.album.name;

      delete currTrack.disc_number;
      delete currTrack.preview_url;
      delete currTrack.track_number;
      delete currTrack.video_thumbnail;
      delete currTrack.available_markets;
      delete currTrack.track;
      delete currTrack.type;
      delete currTrack.episode;
      delete currTrack.is_local;
      delete currTrack.external_ids;
      delete currTrack.external_urls;
      delete currTrack.uri;
      delete currTrack.href;

      delete currTrack.artists;

      all.push(currTrack);
    }
  } catch (error) {
    writeToFile(all.sort((a, b) => (a.name > b.name ? 1 : -1)));
    return;
  }
  i++;
}
