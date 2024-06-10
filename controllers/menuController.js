import nedb from 'nedb-promises';

//Skapar menu-db
export const database = new nedb({
    filename: './data/menu.db',
    autoload: true
});

// @desc GET Hämtar allt på menyn
// @route /menu
export const getMenu = async (req, res, next) => {
    try {
        const menu = await database.find({});
        res.status(200).json({
            success: true,
            status: 200,
            data: menu
        });
    } catch (error) {
        next(error);
    }
};

export const addProduct = async (req, res, next) => {
    try {
        const { title, desc, price } = req.body;

        let id = 1;
        const menu = await database.find({});
        menu.forEach(item => {
            if (item.id >= id) {
                id = item.id + 1;
            }
        });

        const newProduct = {
            id,
            title,
            desc,
            price,
            createdAt: new Date().toString()
        };

        database.insert(newProduct);
        res.status(200).send({
            success: true,
            status: 200,
            message: 'Ny produkt tillagt',
            data: newProduct
        });
    } catch (error) {
        next(error);
    }
}

export const changeProduct = async (req, res, next) => {
    try {
        const { title, desc, price } = req.body;
        const id = parseInt(req.params.id);

        const foundProduct = await database.findOne({ id: id });

        if (!foundProduct) {
            const error = new Error("Ingen produkt hittad.");
            error.status = 400;
            throw error;
        }
        foundProduct.title = title;
        foundProduct.desc = desc;
        foundProduct.price = price;
        foundProduct.modifiedAt = new Date().toString();
        database.update({ id: id }, foundProduct);

        res.status(200).send({
            success: true,
            status: 200,
            message: 'Produkten är nu uppdaterad ',
            data: foundProduct
        });
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const foundProduct = await database.findOne({ id: id });

        if (!foundProduct) {
            const error = new Error("Ingen produkt hittad.");
            error.status = 400;
            throw error;
        };

        database.remove({ id: id });

        res.status(200).send({
            success: true,
            status: 200,
            message: 'Produkten är nu bortagen ',
            data: foundProduct
        });
    } catch (error) {
        next(error);
    }
}

export default database;