/**
 * mongoUtils.js
 * -------------
 * This module contains reusable utility functions for performing common MongoDB operations
 * on Mongoose models. It abstracts and standardizes database interactions across the application.
 *
 * Why use mongoUtils?
 * -------------------
 * 1. **DRY Principle**: Avoid repeating the same query logic in multiple places.
 *    Instead, call these reusable functions to keep code clean and maintainable.
 *
 * 2. **Error Handling**: Centralized try-catch blocks handle and log errors consistently,
 *    reducing boilerplate and improving debugging.
 *
 * 3. **Lean Queries**: By default, queries return plain JavaScript objects (lean: true),
 *    which improves performance by skipping Mongoose document overhead, unless you need
 *    full Mongoose documents with methods.
 *
 * 4. **Flexible Query Options**: Supports projections, filters, sorting, pagination,
 *    and update options to fit various use cases.
 *
 * 5. **Bulk Operations**: Provides convenient methods for bulk updates and bulk insert/update
 *    (upsert), which are essential for efficient batch processing.
 *
 * 6. **Consistency**: Ensures uniform usage of Mongoose query patterns, making it easier
 *    to onboard new developers and maintain code quality.
 *
 * Usage Guidelines:
 * -----------------
 * - Always prefer using these utils for interacting with MongoDB models to maintain consistency.
 * - Use `lean: true` (default) when you don't need Mongoose document methods, to improve query speed.
 * - Handle any specific business logic or validation outside these utilities.
 * - For complex aggregation pipelines, use the `aggregate` method.
 * - For bulk operations, prepare your updates/operations according to the specified formats.
 *
 * Examples:
 *  - Find a document by ID:
 *      const doc = await mongoUtils.findById(Model, id);
 *
 *  - Update a document by filter and return the updated version:
 *      const updatedDoc = await mongoUtils.findOneAndUpdate(Model, { _id: id }, { name: 'New Name' });
 *
 *  - Perform a bulk update:
 *      const result = await mongoUtils.bulkUpdateDocuments(Model, [
 *        { filter: { status: 'pending' }, update: { status: 'completed' } },
 *      ]);
 *
 * This module helps keep database access organized, efficient, and easy to maintain.
 *
 * NOTE:
 * -----
 * It is recommended to create a `repository.js` file for each domain (e.g., `members`, `assessment`)
 * that acts as an abstraction layer on top of these utils. The repository handles domain-specific
 * business logic and coordinates mongoUtils calls, keeping the service layer clean and consistent.
 *
 * This approach improves code organization, reusability, and makes maintenance easier across
 * different parts of the application.
 */

const mongoose = require("mongoose");

/**
 * Find a document by ID
 */
const findById = async (model, id, projection = null, lean = true) => {
  try {
    let query = model.findById(id, projection);
    if (lean) query = query.lean();
    return await query.exec();
  } catch (err) {
    console.error(`[mongoUtils.findById] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Find one document by filter
 */
const findOne = async (model, filter, projection = null, lean = true) => {
  try {
    let query = model.findOne(filter, projection);
    if (lean) query = query.lean();
    return await query.exec();
  } catch (err) {
    console.error(`[mongoUtils.findOne] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Update a document by ID
 */
const updateById = async (
  model,
  id,
  update,
  options = { new: true },
  lean = true
) => {
  try {
    let query = model.findByIdAndUpdate(id, update, options);
    if (lean) query = query.lean();
    return await query.exec();
  } catch (err) {
    console.error(`[mongoUtils.updateById] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Find one and update
 */
const findOneAndUpdate = async (
  model,
  filter,
  update,
  options = { new: true },
  lean = true
) => {
  try {
    let query = model.findOneAndUpdate(filter, update, options);
    if (lean) query = query.lean();
    return await query.exec();
  } catch (err) {
    console.error(`[mongoUtils.findOneAndUpdate] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Delete by ID
 */
const deleteById = async (model, id, lean = true) => {
  try {
    console.log(model, id, lean);
    let query = model.findByIdAndDelete(id);
    if (lean) query = query.lean();
    return await query.exec();
  } catch (err) {
    console.error(`[mongoUtils.deleteById] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Find many documents
 */
const findMany = async (
  model,
  filter,
  projection = null,
  options = {},
  lean = true
) => {
  try {
    let query = model.find(filter, projection, options);
    if (lean) query = query.lean();
    return await query.exec();
  } catch (err) {
    console.error(`[mongoUtils.findMany] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Delete multiple documents by filter
 */
const deleteMany = async (model, filter = {}) => {
  try {
    return await model.deleteMany(filter).exec();
  } catch (err) {
    console.error(`[mongoUtils.deleteMany] Error: ${err.message}`);
    throw err;
  }
};

/**
 * TO insert one document
 */
const insertOne = async (model, doc, options = {}) => {
  try {
    return await model.insertOne(doc, options);
  } catch (err) {
    console.error(`[mongoUtils.insertOne] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Insert multiple documents
 */
const insertMany = async (model, docs, options = {}) => {
  try {
    return await model.insertMany(docs, options);
  } catch (err) {
    console.error(`[mongoUtils.insertMany] Error: ${err.message}`);
    throw err;
  }
};
/**
 * Count documents matching a filter
 */
const countDocuments = async (model, filter = {}) => {
  try {
    return await model.countDocuments(filter).exec();
  } catch (err) {
    console.error(`[mongoUtils.countDocuments] Error: ${err.message}`);
    throw err;
  }
};
/**
 * Check if a document exists matching a filter
 */
const exists = async (model, filter = {}) => {
  try {
    return await model.exists(filter);
  } catch (err) {
    console.error(`[mongoUtils.exists] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Find distinct values for a field
 */
const distinct = async (model, field, filter = {}) => {
  try {
    return await model.distinct(field, filter).exec();
  } catch (err) {
    console.error(`[mongoUtils.distinct] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Perform aggregation pipeline
 */
const aggregate = async (model, pipeline = []) => {
  try {
    return await model.aggregate(pipeline).exec();
  } catch (err) {
    console.error(`[mongoUtils.aggregate] Error: ${err.message}`);
    throw err;
  }
};
/**
 * Bulk update documents using bulkWrite
 * @param {mongoose.Model} model
 * @param {Array<{ filter: Object, update: Object }>} updates
 * @param {Object} options - bulkWrite options (e.g., ordered: false)
 * @returns {Promise<Object>}
 */
const bulkUpdateDocuments = async (
  model,
  updates,
  options = { ordered: false }
) => {
  if (!Array.isArray(updates) || updates.length === 0) {
    return {
      matchedCount: 0,
      modifiedCount: 0,
      message: "No updates to perform",
    };
  }

  const bulkOps = updates.map(({ filter, update }) => ({
    updateOne: {
      filter,
      update: { $set: update },
    },
  }));

  try {
    return await model.bulkWrite(bulkOps, options);
  } catch (err) {
    console.error(`[mongoUtils.bulkUpdateDocuments] Error: ${err.message}`);
    throw err;
  }
};

/**
 * Bulk insert or update documents (upsert)
 * Each operation should define a filter and a document to insert/update
 */
//  operations = [
//   {
//     updateOne: {
//       filter: { _id: doc._id },
//       update: { $set: doc },
//       upsert: true,
//     }
//   }
// ];
const bulkInsertOrUpdate = async (
  model,
  operations = [],
  options = { ordered: false }
) => {
  if (!Array.isArray(operations) || operations.length === 0) {
    return {
      insertedCount: 0,
      upsertedCount: 0,
      message: "No operations to perform",
    };
  }

  try {
    return await model.bulkWrite(operations, options);
  } catch (err) {
    console.error(`[mongoUtils.bulkInsertOrUpdate] Error: ${err.message}`);
    throw err;
  }
};
module.exports = {
  findById,
  findOne,
  updateById,
  findOneAndUpdate,
  deleteById,
  findMany,
  deleteMany,
  insertOne,
  insertMany,
  countDocuments,
  exists,
  distinct,
  aggregate,
  bulkUpdateDocuments,
  bulkInsertOrUpdate,
};
 