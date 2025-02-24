const Partnership = require("../database/schemas/partnership");

exports.createPartnership = async (partnershipData) => {
  return await Partnership.create(partnershipData);
};

exports.findPartnershipsByUser = async (userId, query) => {
  if (query) {
    const pipeline = [];

    if (query.status) {
      pipeline.push({ $match: { status: query.status } });
    }

    if (query.startDate && query.endDate) {
      pipeline.push({
        $match: { start_date: { $gte: query.startDate, $lte: query.endDate } },
      });
    }

    if (query.title) {
      pipeline.push({
        $match: { title: { $regex: query.title, $options: "i" } },
      });
    }

    pipeline.push({ $match: { "created.userId": userId } });

    return await Partnership.aggregate(pipeline);
  }

  return await Partnership.find({ "created.userId": userId });
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