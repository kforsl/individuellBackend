import nedb from "nedb-promises";
import menuDb from './menuController.js';
import { v4 } from "uuid";

//Skapar promotions db
const database = new nedb({ filename: "./data/promotions.db", autoload: true });

// @desc GET hämtar alla promotions, även inaktiva. 
// @route /promotions
export const getPromotions = async (req, res, next) => {
    try {
        const promotions = await database.find({});
        res.status(200).json({
            success: true,
            status: 200,
            data: promotions
        });
    } catch (error) {
        next(error);
    }
}

// @desc GET hämtar alla promotions, även inaktiva. 
// @route /promotions/add
export const addPromotion = async (req, res, next) => {
    try {
        const { products, price } = req.body;


        // Kontrollerar så att de två inskriva produkterna finns med i menyn. Skickar error om något inskrivet inte finns med i menyn
        for (const product of products) {
            const foundProduct = await menuDb.findOne({ title: product });
            if (!foundProduct) {
                const error = new Error(`Ingen produkt hittad med namn '${product}'. Vänligen skriv in en produkt som finns med i menyn.`);
                error.status = 400;
                throw error;
            };
        };

        // Gör en kopia av products från body och byter vänder arrayen
        const flippedProducts = [...products].reverse()

        // kontrollerar om produkts från body redan finns med i databasen, kollar både inskrivet och omvänt
        const foundPromotion = await database.findOne({ $or: [{ products: products }, { products: flippedProducts }] })

        // Skickar error om det redan finns ett erbjudande med de produkterna. 
        if (foundPromotion) {
            const error = new Error(`Det finns redan ett erbjudande med de här produkterna.`);
            error.status = 400;
            throw error;
        } else {
            // Skapar ett promotion objekt 
            let newPromotion = {};
            // Kontrollerar om de två inskriva produkterna är samma för att skriva ett passade meddelande. 
            if (products[0] === products[1]) {
                // uppdaterar promotion objektet
                newPromotion = {
                    id: `deal${v4().slice(0, 6)}`,
                    active: true,
                    promotion: `Köp två ${products[0]} för ${price}kr`,
                    information: `Just nu vid köp av två ${products[0]} betala kampanjpriset ${price}kr`,
                    price,
                    products
                };
            } else {
                // uppdaterar promotion objektet
                newPromotion = {
                    id: `deal${v4().slice(0, 6)}`,
                    active: true,
                    promotion: `Köp en ${products[0]} och en ${products[1]} för ${price}kr`,
                    information: `Just nu vid köp av en ${products[0]} och en ${products[1]} betala kampanjpriset ${price}kr`,
                    price,
                    products
                };
            }
            // Lägger in nya promotion i databasen
            database.insert(newPromotion);
            res.status(200).send({
                success: true,
                status: 200,
                message: 'Nytt erbjudande tillagt',
                data: newPromotion
            });
        }
    } catch (error) {
        next(error);
    }
}

export default database;