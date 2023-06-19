let {selectAllUser, selectUser, insertUser, updateUser, deleteUser, countUser, findId, findName} = require('../model/user');

const commonHelper = require('../helper/common');
let userController = {
  getAllUser: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || 'id';
      const sort = req.query.sort || 'ASC';
      let result = await selectAllUser({limit, offset, sortby, sort});
      const {
        rows: [count],
      } = await countUser();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(res, result.rows, 200, 'get data success', pagination);
    } catch (error) {
      console.log(error);
    }
  },
  getDetailUser: async (req, res) => {
    const id = Number(req.params.id); // selarasin id parameter/link sama id variabel product
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({message: 'ID Not Found'});
    }
    selectUser(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => res.send(err));
  },

  getNameUser: async (req, res) => {
    const name = req.query.keyword || '';
    await findName(name)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => res.send(err));
  },

  createUser: async (req, res) => {
    // post buat nambahin data ke variable
    let {name, email, phone_number, gender, birth_date, image} = req.body;
    const {
      rows: [count],
    } = await countUser();
    const id = Number(count.count) + 1;
    const data = {
      id,
      name,
      email,
      phone_number,
      gender,
      birth_date,
      image,
    };
    insertUser(data)
      .then((result) => commonHelper.response(res, result.rows, 201, 'Product created'))
      .catch((err) => res.send(err));
  },
  updateUser: async (req, res) => {
    // put buat update data variable
    const id = Number(req.params.id);
    let {name, email, phone_number, gender, birth_date, image} = req.body;
    const {rowCount} = await findId(id);
    if (!rowCount) {
      res.json({message: 'ID is Not Found'});
    }
    const data = {
      id,
      name,
      email,
      phone_number,
      gender,
      birth_date,
      image,
    };
    updateUser(data)
      .then((result) => commonHelper.response(res, result.rows, 200, 'Product updated'))
      .catch((err) => res.send(err));
  },
  deleteUser: async (req, res) => {
    const id = Number(req.params.id);
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({message: 'ID Not Found'});
    }
    deleteUser(id)
      .then((result) => commonHelper.response(res, result.rows, 200, 'Product deleted'))
      .catch((err) => res.send(err));
  },
};

module.exports = userController;
