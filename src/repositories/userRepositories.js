const User = require('../database/schemas/user');

exports.getUserByEmail = async (email) => {
    const users = await User.find();
    return users.find((user) => user.email === email);
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

exports.getAllUsers = async (query) => {
  let users;

  users = await User.find();

  if (query) {
    if (query.fullname) {
      users = users.filter(user =>
        user.fullname.toLowerCase().includes(query.fullname.toLowerCase())
      );
    }

    if (query.email) {
      users = users.filter(user =>
        user.email.toLowerCase().includes(query.email.toLowerCase())
      );
    }

    if (query.phoneNumber) {
      users = users.filter(user =>
        user.phoneNumber.includes(query.phoneNumber)
      );
    }
  }

  return users;
};

// exports.getAllUsers = async (query) => {
//     if (query) {
//         const pipeline = [];

//         if (query.fullname) {
//             pipeline.push({ $match: { fullname: { $regex: query.fullname, $options: 'i' } } });
//         }

//         if (query.email) {
//             pipeline.push({ $match: { email: { $regex: query.email, $options: 'i' } } });
//         }

//         if (query.phoneNumber) {
//             pipeline.push({ $match: { phoneNumber: { $regex: query.phoneNumber, $options: 'i' } } });
//         }

//         pipeline.push({
//             $project: {
//                 email: 1,
//                 fullname: 1,
//                 phoneNumber: 1,
//             }
//         });

//         return await User.aggregate(pipeline);
//     }

//     return await User.find();
// };

exports.findUserById = async (id) => {
    return await User.findById(id);
};