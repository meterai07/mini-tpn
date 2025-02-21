const Partnership = require('../database/schemas/partnership');

exports.createPartnership = async (partnershipData) => {
  return await Partnership.create(partnershipData);
};

exports.findPartnershipsByUser = async (userId) => {
  return await Partnership.find({ 'created.userId': userId });
};

exports.findPartnershipById = async (id) => {
  return await Partnership.findById(id);
};

exports.updatePartnership = async (id, updateData) => {
  return await Partnership.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deletePartnership = async (id) => {
  return await Partnership.findByIdAndDelete(id);
};