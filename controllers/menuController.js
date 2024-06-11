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

// @desc POST Lägger till en produkt i menyn
// @route /menu/add
export const addProduct = async (req, res, next) => {
    try {
        const { title, desc, price } = req.body;
        // Sätter ID till 1 om ingen annan produkt finns i menyn
        let id = 1;
        // Hämtar hela menyn från databasen 
        const menu = await database.find({});
        // Kollar om någon produkt i menyn redan har det inskickade titeln. 
        menu.forEach(item => {
            if (item.title === title) {
                const error = new Error("Det finns redan en produkt med det namnet i menyn.");
                error.status = 400;
                throw error;
            }
        });
        // Loopar alla produkter i menyn om produktens id är högre ändras let id till produktens id +1 
        menu.forEach(item => {
            if (item.id >= id) {
                id = item.id + 1;
            }
        });

        // Skapa det nya produkt objekt 
        const newProduct = {
            id,
            title,
            desc,
            price,
            createdAt: new Date().toString()
        };

        // Lägger till nya produkten i databasen 
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

// @desc POST Ändrar en produkt i menyn
// @route /menu/change/id
export const changeProduct = async (req, res, next) => {
    try {
        const { title, desc, price } = req.body;
        const id = parseInt(req.params.id);

        // Hämtar produkten med medskickat id 
        const foundProduct = await database.findOne({ id: id });
        // kollar om någon produkt hittades med det id. Skickar error om ingen produkt hittas
        if (!foundProduct) {
            const error = new Error("Ingen produkt hittad med det id.");
            error.status = 400;
            throw error;
        }
        // Hämtar hela menyn från databasen 
        const menu = await database.find({});
        // Kollar om någon produkt i menyn redan har det inskickade titeln. 
        menu.forEach(item => {
            if (item.title === title) {
                const error = new Error("Det finns redan en produkt med det namnet i menyn.");
                error.status = 400;
                throw error;
            }
        });
        // Ändrar uppgifter i den hittade produkten 
        foundProduct.title = title;
        foundProduct.desc = desc;
        foundProduct.price = price;
        foundProduct.modifiedAt = new Date().toString();
        // Uppdaterar databasen med den nya informationen 
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

// @desc DELETE Tar bort en produkt från menyn 
// @route /menu/remove/:id
export const deleteProduct = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        // Hämtar produkten med medskickat id 
        const foundProduct = await database.findOne({ id: id });
        // kollar om någon produkt hittades med det id. Skickar error om ingen produkt hittas
        if (!foundProduct) {
            const error = new Error("Ingen produkt hittad.");
            error.status = 400;
            throw error;
        };

        // Tar bort produkten från menyn 
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