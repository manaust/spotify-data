const fs = require("fs");
const playlist = JSON.parse(fs.readFileSync("output/output.json"));
const songs = playlist.tracks.items;

console.log(songs.length);
