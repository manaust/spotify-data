global.fetch = require("node-fetch");
const fs = require("fs");

const client_id = "da84309f99a6481ea9c11a933d21ede1";
const client_secret = "4f5fb5ce723a41198eb08f1bde690454";
const encoded = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const getToken = async () => {
  console.log("Fetching token...");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encoded}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = await res.json();
  return data.access_token;
};

const getTracks = async (token, i) => {
  console.log("Fetching tracks...");
  const res = await fetch(
    `https://api.spotify.com/v1/playlists/3IbpLQIpxm4pAAOrhmdUfu/tracks?offset=${
      i * 100
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
};

const writeToFile = (json, i) => {
  console.log("Writing json to file...");
  fs.writeFile(
    `output/output${i}.json`,
    JSON.stringify(json),
    "utf8",
    (err) => {
      if (err) {
        console.error("An error occured while writing JSON to file.");
        return;
      }
      console.log("JSON file has been saved.");
    }
  );
};

const fetchAll = async () => {
  const token = await getToken();
  let i = 0;
  while (true) {
    const playlist = await getTracks(token, i);
    const items = playlist.items;

    if (items.length == 0) {
      return;
    }

    writeToFile(items, i);
    i++;
  }
};

fetchAll();
