const db = require('../index');

let QUERY = 'SELECT ratio FROM MinVolumeRatio';

const getMinRatio = () => {
  return db.one(QUERY)
    .then((data) => { return data.ratio})
    .catch((err) => {
      console.error(err.stack);
    });
}

module.exports = getMinRatio;