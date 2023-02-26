import User from '../models/user.model.js'

//UPDATE
export const updateUser = async (req, res, next) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateUser)
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error)
    }
};

//DELETE
export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('USER Has been deleted')
    } catch (error) {
        next(error)
    }
};

//ALL USERS
export const getUsers = async (req, res, next) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
};

//GET USER
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, isAdmin, ...otherDetails } = user._doc;
        res.status(200).json(otherDetails)
    } catch (error) {
        next(error)
        console.log(req.user.isAdmin);
    }
};

// GET STATS
export const getStats = async (req, res, next) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json(data)
    } catch (error) {
        next(error)

    }
};
