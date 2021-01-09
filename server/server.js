const express = require('express');
const { getFromFile, buildData } = require('../utils/helpers');
const algoliasearch = require('algoliasearch');
const app = express();
require('dotenv').config();
const PORT = 3000;

const client = algoliasearch(process.env.APP_ID, process.env.ADMIN_KEY);
const index = client.initIndex('Episodes');

const { episodes } = getFromFile('westworld.json', '_embedded');
const episodesToUpload = buildData(episodes);

index
  .saveObjects(episodesToUpload)
  .then(({ objectIDs }) => {
    console.log(objectIDs);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
