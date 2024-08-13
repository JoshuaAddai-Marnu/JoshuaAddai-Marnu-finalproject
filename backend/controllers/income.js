const IncomeSchema = require("../models/incomeModel")
const UserSchema = require("../models/userModel")



exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body

    const user = req.user
    const myProfile = await UserSchema.findOne({ email: user.email })

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date,
        user: myProfile
    })

    try {
        //validations
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'Amount must be a positive number!' })
        }
        await income.save()
        res.status(200).json({ message: 'Income Added' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }

    console.log(income)

}

exports.getIncomes = async (req, res) => {
    try {
        const user = req.user
        const myProfile = await UserSchema.findOne({ email: user.email })
        const incomes = await IncomeSchema.find({ user: myProfile }).sort({ createdAt: -1 })
        res.status(200).json(incomes)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    //console.log(params);
    IncomeSchema.findByIdAndDelete(id)
        .then((income) => {
            res.status(200).json({ message: 'Income Deleted' })
        })
        .catch((err) => {
            res.status(500).json({ message: 'Server Error' })
        })
}