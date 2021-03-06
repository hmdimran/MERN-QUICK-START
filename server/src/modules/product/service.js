// load repository.js
const { save, update, getById, deleteById } = require("../../core/repository");
const Model = require("./model");

// const eventEmitter = require("../../core/event-manager").getInstance();
// const modelName = "Product";

const search = async (payload) => {
  const queries = [];

  if (payload.name) {
    queries.push({ name: { $regex: payload.name, $options: "i" } });
  }

  // product.size (number)
  if (payload.size) {
    queries.push({ size: parseInt(payload.size, 10) });
  }

  // payload.fromDate && payload.toDate
  if (payload.manufacturingDateRange) {
    const fromDate = payload.manufacturingDateRange[0];
    const toDate = payload.manufacturingDateRange[1];
    queries.push({
      manufacturingDate: { $gte: new Date(fromDate), $lte: new Date(toDate) },
    });
  }

  let query = {};
  if (queries.length === 1) {
    query = { ...queries[0] };
  }
  if (queries.length > 1) {
    query = { $and: queries };
  }
  const take = parseInt(payload.pageSize, 10);
  const skip = (parseInt(payload.current, 10) - 1) * take;

  // sort
  let sort = {};
  if (payload.sort) {
    const key = payload.sort;
    const value = parseInt(payload.order, 10) ?? 1;
    sort[key] = value;
  } else {
    sort = { updatedAt: -1 };
  }

  const data = await Model.collection
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(take);
  const items = { data: await data.toArray(), total: 200 };
  return items;
};

const count = async (payload) => {
  // let searchQuery = null;
  const queries = [];

  if (payload.name) {
    queries.push({ name: { $regex: payload.name, $options: "i" } });
  }

  // product.size (number)
  if (payload.size) {
    queries.push({ size: parseInt(payload.size, 10) });
  }

  // payload.fromDate && payload.toDate
  if (payload.fromDate && payload.toDate) {
    queries.push({
      createdAt: {
        $gte: new Date(payload.fromDate),
        $lte: new Date(payload.toDate),
      },
    });
  }

  let query = {};
  if (queries.length === 1) {
    query = { ...queries[0] };
  }
  if (queries.length > 1) {
    query = { $and: queries };
  }

  const t = await Model.collection.find(query).count();
  const items = { total: t };
  return items;
};

const setupEventListeners = () => {
  // eventEmitter.on(`${modelName}Created`, (model) => {
  //   // console.log(`${modelName} created`, model);
  // });
  // eventEmitter.on(`${modelName}Updated`, (model) => {
  //   // console.log(`${modelName} updated`, model);
  // });
  // eventEmitter.on(`${modelName}Deleted`, (model) => {
  //   // console.log(`${modelName} deleted`, model);
  // });
};

setupEventListeners();

module.exports = { save, update, deleteById, getById, search, count };
