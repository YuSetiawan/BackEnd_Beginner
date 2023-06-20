const Pool = require('../config/db'); // import var Pool dari db.js

const selectAllUser = ({sortby, sort, limit, offset}) => {
  return Pool.query(`SELECT * FROM users ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectUser = (id) => {
  return Pool.query(`SELECT * FROM users WHERE id =${id}`);
};

const insertUser = (data) => {
  const {id, name, email, phone_number, gender, birth_date, image} = data;
  return Pool.query(`INSERT INTO users(id, name, email, phone_number, gender, birth_date, image)
  VALUES (${id}, '${name}', '${email}', ${phone_number}, '${gender}', '${birth_date}', '${image}')`);
};

const updateUser = (data) => {
  const {id, name, email, phone_number, gender, birth_date, image} = data;
  return Pool.query(`UPDATE users SET name='${name}', email='${email}', phone_number=${phone_number}, gender='${gender}', birth_date ='${birth_date}', image='${image}' WHERE id =${id}`);
};

const deleteUser = (id) => {
  return Pool.query(`DELETE FROM users WHERE id=${id}`);
};

const countUser = () => {
  return Pool.query(`SELECT COUNT(*) FROM users`);
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM users WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const findName = (name) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE name ILIKE '%${name}%'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllUser,
  selectUser,
  insertUser,
  updateUser,
  deleteUser,
  countUser,
  findId,
  findName,
};
