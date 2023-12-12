const models = require('../models');

const { Entry } = models;

const makeEntry = async (req, res) => {
  if (!req.body.feeling || !req.body.summary || !req.body.manage || !req.body.future) {
    return res.status(400).json({ error: 'RAWR! All fields are required!' });
  }

  const entryData = {
    feeling: req.body.feeling,
    summary: req.body.summary,
    manage: req.body.manage,
    future: req.body.future,
    date: req.body.date,
    owner: req.session.account._id,
  };

  try {
    const newEntry = new Entry(entryData);
    await newEntry.save();
    // return res.json({redirect: '/maker'});
    return res.status(201).json({ 
      feeling: newEntry.feeling,
      summary: newEntry.summary,
      manage: newEntry.manage,
      future: newEntry.future,
      date: newEntry.date
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Entry already exists!!!!!!!' });
    }
    return res.status(500).json({ error: 'An error occured making entry! No!' });
  }
};

const makerPage = async (req, res) => res.render('app');

const getEntrys = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Entry.find(query).select('feeling summary manage future date').lean().exec();

    //I get the reverse order of the entries so the most recent one appears first
    const reverseOrder = await docs.reverse();

    return res.json({ entrys: reverseOrder });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving entrys! WHY?!?!' });
  }
};

module.exports = {
  makerPage,
  makeEntry,
  getEntrys,
};
