const models = require("../models/data-models");
const {
  ProductViewModel,
} = require("../models/view-models/product-view-model");
const { FilterViewModel } = require("../models/view-models/filter-view-model");
const { NotFound } = require("../common/errors");

const Model = models.Filter;

const getAll = async () => {
  const items = await Model.find();
  const viewModels = items.map((item) => ProductViewModel.convert(item));
  return viewModels;
};

const save = async (filter) => {
  const model = await Model.createNew(filter);
  const savedItem = await model.save();
  return savedItem._id;
};

const update = async (filter) => {
  const { id } = filter;
  const model = await Model.findById(id);
  if (model) {
    model.fromDate = filter.fromDate;
    model.toDate = filter.toDate;
    model.filterName = filter.filterName;
    model.searchText = filter.searchText;
    model.updatedAt = Date.now().toString();
    model.save();
    return model._id;
  }
  throw new NotFound(`Filter not found by the id: ${id}`);
};

const deleteById = async (id) => {
  const model = await Model.findById(id);
  if (model) {
    const result = await Model.deleteOne({ _id: id });
    return result;
  }

  throw new NotFound(`Product not found by the id: ${id}`);
};

const getById = async (id) => {
  const model = await Model.findById(id);
  const viewModel = ProductViewModel.convert(model);
  return viewModel;
};

const search = async (query) => {
  const items = await Model.find(query);
  const viewModels = items.map((item) => FilterViewModel.convert(item));
  return viewModels;
};

module.exports = { getAll, save, update, deleteById, getById, search };
