const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    // const feature = new APIFeatures(Tour.find(), req.query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    //     .paginate();
    const users = await User.find();
    res.status(200).send({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    });
});

exports.createUser = (req, res) => {
    res.status(500).send({ message: 'Erro ao buscar os usuários' });
};

exports.getUser = (req, res) => {
    res.status(500).send({ message: 'Erro ao buscar os usuários' });
};

exports.updateUser = (req, res) => {
    res.status(500).send({ message: 'Erro ao buscar os usuários' });
};

exports.deleteUser = (req, res) => {
    res.status(500).send({ message: 'Erro ao buscar os usuários' });
};
