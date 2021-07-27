const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

const Date = moment().subtract(4, "d").add(1, 'd').format();
const data = {
    date: Date
}

jsonfile.writeFile(FILE_PATH, data);

simpleGit().add([FILE_PATH]).commit(Date, { '--date': Date }).push();