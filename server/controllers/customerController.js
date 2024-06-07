const Customer = require("../models/Customer");
const mongoose = require("mongoose");


/**
 * GET /
 * Home Page
 */



exports.getAllCustomers = async (req, res) => {

    const messages = await req.flash('info');

    const locals = {
        title: 'Nodejs',
        decsription: 'Free Nodejs User Management System',
    }

    let perPage = 12;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([{ $sort: { updateAt: -1 } }]).skip(perPage * page - perPage).limit(perPage).exec();
        const count = await Customer.countDocuments({});
        res.json({
            success: true,
            message: messages,
            locals: locals,
            customers: customers,
            currentPage: page,
            totalPages: Math.ceil(count / perPage),
            totalCustomers: count
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

//Home
exports.homepage = async (req, res) => {

    const messages = await req.flash('info');

    const locals = {
        title: 'Nodejs',
        decsription: 'Free Nodejs User Management System',
    }

    let perPage = 12;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([{ $sort: { updateAt: -1 } }]).skip(perPage * page - perPage).limit(perPage).exec();
        const count = await Customer.countDocuments({});

        res.render('index', {
            locals,
            customers,
            current: page,
            pages: Math.ceil(count / perPage),
            messages
        })   

    } catch (error) {
        console.log(error)
    }
};

exports.about = async (req, res) => {
    const locals = {
        title: 'Nodejs',
        decsription: 'Free Nodejs User Management System',
    }
    try {
        res.render("about", locals);
    } catch (error) {
        console.log(error);
    }
}



// exports.homepage = async (req, res) => {

//     const messages = await req.flash('info');

//     const locals = {
//         title: 'Nodejs',
//         decsription: 'Free Nodejs User Management System',
//     }

//     try {
//         const customers = await Customer.find({}).limit(22);
//         res.render('index', { locals, messages, customers });
//     } catch (error) {
//         console.log(error)
//     }
// };

/**
 * GET /
 * New Customer Page
 */
exports.addCustomer = async (req, res) => {
    const locals = {
        title: 'Add New Customer - Nodejs',
        decsription: 'Free Nodejs User Management System'
    }
    res.render('customer/add', locals);
};

/**
 * POST /
 * Create Customer
 */
exports.postCustomer = async (req, res) => {
    console.log(req.body);

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        details: req.body.details
    })

    try {
        await Customer.create(newCustomer);
        await req.flash('info', 'New customer has been added.');
        
        res.redirect('/');
    } catch (error) {
        console.log(error)
    }
};
/**
 * GET /
 * View Customer
 */

exports.view = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id });

        const locals = {
            title: "View Customer Data",
            description: "Free NodeJs User Management System",
        };

        res.render("customer/view", {
            locals,
            customer,
        });
    } catch (error) {
        console.log(error);
    }
};

/**
 * GET /
 * Edit Customer
 */

exports.edit = async (req, res) => {
    try {
        const customer = await Customer.findOne({ _id: req.params.id });
        const locals = {
            title: "Edit Customer Data",
            description: "Free NodeJs User Management System",
        };
        res.render("customer/edit", {
            locals,
            customer,
        })
    } catch (error) {
        console.log(error);
    }
}


/**
 * PUT /
 * Update Customer
 */

exports.editPost = async (req, res) => {
    try {
        await Customer.findByIdAndUpdate(req.params.id,{
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            tel: req.body.tel,
            email: req.body.email,
            details: req.body.details,
            updateAt: Date.now(),
        });

        await res.redirect(`/edit/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }
}


/**
 * DELETE /
 * Delete Customer
 */

exports.deleteCustomer = async (req, res) => {
    try {
        await Customer.deleteOne({ _id: req.params.id });
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
}



/**
 * Get /
 * Search Customer
 */

exports.searchCustomers = async (req, res) => {

    const locals = {
        title: "Search Customer Data",
        description: "Free NodeJs User Management System",
    };

    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const customers = await Customer.find({
            $or: [
                { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
            ],
        });
        res.render("search", {
            customers,
            locals,
        })
    } catch (error) {
        console.log(error)
    }
}

