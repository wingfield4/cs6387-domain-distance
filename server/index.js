var fs = require('fs');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

const levenshteinDistance = require('./utilities/levenshteinDistance');
app.post('/analyzeDomains', async (req, res, next) => {
  const THRESHOLD = 2;
  const { domains } = req.body;

  if(!domains)
    throw new Error('No domains submitted!');

  let safeDomains = fs.readFileSync('safeDomains.txt', 'utf8').split('\n');
  let dangerousMatches = [];

  safeDomains.forEach(safeDomain => {
    domains.forEach(checkedDomain => {
      let distance = levenshteinDistance(safeDomain.toLowerCase(), checkedDomain.toLowerCase());
      if(distance > 0 && distance <= THRESHOLD) {
        dangerousMatches.push({
          safeDomain,
          checkedDomain,
          distance
        });
      }
    });
  });

  res.json(dangerousMatches);
});

app.listen('8080');
console.log('app is listening on port 8080');
