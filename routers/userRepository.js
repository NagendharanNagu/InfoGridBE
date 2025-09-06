// src/routes/members/members.repository.js

const userSchema = require("../Model/userSchema");
const mongoUtils = require("../utils/mongoUtils");

const UsersRepository = {
  /**
   * Find a member by MongoDB _id
   */
  findById: (id) => mongoUtils.findById(userSchema, id),

  /**
   * Find a member by custom filter
   */
  findOne: (filter, projection = null) =>
    mongoUtils.findOne(userSchema, filter, projection),

  /**
   * Find multiple members by filter
   */
  findMany: (filter, projection = null, options = {}) =>
    mongoUtils.findMany(userSchema, filter, projection, options),

  /**
   * Update member by _id
   */
  updateById: (id, update) => mongoUtils.updateById(userSchema, id, update),

  /**
   * Find one member by filter and update
   */
  findOneAndUpdate: (filter, update, options = { new: true }) =>
    mongoUtils.findOneAndUpdate(userSchema, filter, update, options),

  /**
   * Delete a member by _id
   */
  deleteById: (id) => mongoUtils.deleteById(userSchema, id),

  /**
   * Perform bulk updates on multiple members
   * Each item in `updates` should be: { filter: {}, update: {} }
   */
  bulkUpdate: (updates, options = { ordered: false }) =>
    mongoUtils.bulkUpdateDocuments(userSchema, updates, options),

  /**
   * Custom logic: Fetch members for a given year, plan IDs, and member IDs
   */
  findByYearPlanAndMembers: (year, planIds, memberIds) => {
    return mongoUtils.findMany(userSchema, {
      year,
      planId: { $in: planIds },
      memberId: { $in: memberIds },
    });
  },

  /**
   * Count documents matching a filter
   */
  countDocuments: (filter = {}) =>
    mongoUtils.countDocuments(userSchema, filter),

  /**
   * Check if a member exists matching a filter
   */
  exists: (filter = {}) => mongoUtils.exists(userSchema, filter),

  /**
   * Find distinct values for a field
   */
  distinct: (field, filter = {}) =>
    mongoUtils.distinct(userSchema, field, filter),

  /**
   * Perform aggregation pipeline on members
   */
  aggregate: (pipeline = []) => mongoUtils.aggregate(userSchema, pipeline),

  /**
   * Insert multiple members
   */
  insertMany: (docs, options = {}) =>
    mongoUtils.insertMany(userSchema, docs, options),

  /**
   * Delete multiple members by filter
   */
  deleteMany: (filter = {}) => mongoUtils.deleteMany(userSchema, filter),

  /**
   * Bulk insert or update members (upsert)
   */
  bulkInsertOrUpdate: (operations, options = { ordered: false }) =>
    mongoUtils.bulkInsertOrUpdate(userSchema, operations, options),
};

module.exports = UsersRepository;
 