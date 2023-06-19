let {selectAllProduct, selectProduct, insertProduct, updateProduct, deleteProduct, countProduct, findId, findName} = require('../model/products');

const commonHelper = require('../helper/common');
let productController = {
  getAllProduct: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || 'id';
      const sort = req.query.sort || 'ASC';
      let result = await selectAllProduct({limit, offset, sortby, sort});
      const {
        rows: [count],
      } = await countProduct();
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
  getDetailProduct: async (req, res) => {
    const id = Number(req.params.id); // selarasin id parameter/link sama id variabel product
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({message: 'ID Not Found'});
    }
    selectProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => res.send(err));
  },

  getNameProduct: async (req, res) => {
    const name = req.query.keyword || '';
    await findName(name)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'get data success');
      })
      .catch((err) => res.send(err));
  },

  createProduct: async (req, res) => {
    // post buat nambahin data ke variable
    let {name, stock, price, image, rate, brand, id_category} = req.body;
    const {
      rows: [count],
    } = await countProduct();
    const id = Number(count.count) + 1;
    const data = {
      id,
      name,
      stock,
      price,
      image,
      rate,
      brand,
      id_category,
    };
    insertProduct(data)
      .then((result) => commonHelper.response(res, result.rows, 201, 'Product created'))
      .catch((err) => res.send(err));
  },
  updateProduct: async (req, res) => {
    // put buat update data variable
    const id = Number(req.params.id);
    let {name, stock, price, image, rate, brand, id_category} = req.body;
    const {rowCount} = await findId(id);
    if (!rowCount) {
      res.json({message: 'ID is Not Found'});
    }
    const data = {
      id,
      name,
      stock,
      price,
      image,
      rate,
      brand,
      id_category,
    };
    updateProduct(data)
      .then((result) => commonHelper.response(res, result.rows, 200, 'Product updated'))
      .catch((err) => res.send(err));
  },
  deleteProduct: async (req, res) => {
    const id = Number(req.params.id);
    const {rowCount} = await findId(id);
    if (!rowCount) {
      return res.json({message: 'ID Not Found'});
    }
    deleteProduct(id)
      .then((result) => commonHelper.response(res, result.rows, 200, 'Product deleted'))
      .catch((err) => res.send(err));
  },
};

module.exports = productController;
