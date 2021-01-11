const fs = require('fs');
const path = require('path');

const makeFilePath = (filename) => path.join(__dirname, '../data/', filename);

const getFromFile = (filename, key) => {
  if (!filename) return undefined;
  const filePath = makeFilePath(filename);
  const raw = fs.readFileSync(filePath);
  const parsed = JSON.parse(raw);
  return parsed[key];
};

const htmlStripper = (str) => str.replace(/(<([^>]+)>)/gi, '');

const dateFormatter = (date) => (property) => {
  const airdate = new Date(date);
  if (property === 'unixTime') return airdate.getTime();
  if (property === 'year') return airdate.getFullYear().toString();
};

const buildData = (episodeArray) =>
  episodeArray.reduce((acc, episode) => {
    const episodeDate = dateFormatter(episode.airstamp);
    acc.push({
      objectID: episode.id,
      season: `Season ${episode.season}`,
      number: `Episode ${episode.number}`,
      name: episode.name,
      airdate: episode.airdate,
      year: episodeDate('year'),
      date_timestamp: episodeDate('unixTime'),
      summary: htmlStripper(episode.summary),
      thumbnail: episode.image.medium,
      url: episode.url,
    });
    return acc;
  }, []);

module.exports = {
  makeFilePath,
  getFromFile,
  buildData,
};
