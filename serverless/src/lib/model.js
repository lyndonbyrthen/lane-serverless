const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'mikasongdraws.cin7ekzuxzsh.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '',
  port: '3306',
  database: 'mikasongdraws'
});


const getQuery = async query => {
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, rows, fields) {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

class Model {
  constructor() {
    if (!Model.instance) {
      Model.instance = this;
    }
    return Model.instance;
  }

  async getPortfolio() {
    const query = `
      SELECT *
      FROM portfolio
      WHERE publish=1
      ORDER BY weight ASC`
    return await getQuery(query);
  }

  async getComics() {
    const query = `
      SELECT *
      FROM comics
      WHERE publish=1
      ORDER BY date DESC`
    return await getQuery(query);
  }

  async getCopy(id) {
    const query = `
          SELECT *
          FROM copy
          WHERE  id="${id}"`
    const row = await getQuery(query);
    return row[0]['content'];
  }

  async getLinks() {
    const query = `
          SELECT *
          FROM links`
    const rows = await getQuery(query);
    const links = {};
    rows.forEach(row => {
      links[row.id] = row.url;
    });
    return links;
  }

  async getNews() {
    const query = `
          SELECT *
          FROM news
          ORDER BY date ASC`
    const rows = await getQuery(query);
    return rows;
  }

  async getBooks() {
    const query = `
          SELECT *
          FROM books
          ORDER BY weight ASC`
    const rows = await getQuery(query);
    return rows;
  }

  async getActivity() {
    const query = `
          SELECT *
          FROM activity
          WHERE publish=1
          ORDER BY weight ASC`
    const rows = await getQuery(query);
    return rows;
  }

}

const instance = new Model();

Object.freeze(instance);

module.exports = instance;
