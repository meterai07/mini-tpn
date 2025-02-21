const { createPartnership, findPartnershipsByUser, findPartnershipById, updatePartnership, deletePartnership } = require('../repositories/partnershipRepositories');
const { encrypt } = require('../utils/crypto');
const response = require('../utils/response');

exports.createNewPartnership = async (req, res) => {
  try {
    const files = req.files?.map(file => file.path);
    const partnershipData = {
      ...req.body,
      attachments: files || [],
      created: {
        userId: req.user._id,
        by: encrypt(req.user.fullname)
      }
    };

    const partnership = await createPartnership(partnershipData);
    response(res, 201, 'Partnership created successfully', partnership);
  } catch (error) {
    response(res, 500, error.message);
  }
};

exports.getUserPartnerships = async (req, res) => {
  try {
    let partnerships = await findPartnershipsByUser(req.user._id);
    const { title, status } = req.query;
    if (title) {
        partnerships = partnerships.filter(partnership => partnership.title.includes(title));
    }
    
    if (status) {
        partnerships = partnerships.filter(partnership => partnership.status.toLowerCase() === status.toLowerCase());
    }

    response(res, 200, 'Partnerships retrieved successfully', partnerships);
  } catch (error) {
    response(res, 500, error.message);
  }
};

exports.getPartnershipById = async (req, res) => {
  try {
    const partnership = await findPartnershipById(req.params.id);
    if (!partnership) {
        return response(res, 404, 'Partnership not found');
    }
    response(res, 200, 'Partnership retrieved successfully', partnership);
  } catch (error) {
    response(res, 500, error.message);
  }
};

exports.updateUserPartnership = async (req, res) => {
  try {
    const partnership = await updatePartnership(req.params.id, req.body);
    if (!partnership) {
        return response(res, 404, 'Partnership not found');
    }
    response(res, 200, 'Partnership updated successfully', partnership);
  } catch (error) {
    response(res, 500, error.message);
  }
};

exports.deleteUserPartnership = async (req, res) => {
  try {
    const partnership = await deletePartnership(req.params.id);
    if (!partnership) {
        return response(res, 404, 'Partnership not found');
    }
    response(res, 200, 'Partnership deleted successfully', partnership);
  } catch (error) {
    response(res, 500, error.message);
  }
};