import Joi from "joi";

const promotionSchema = Joi.object({
    products: Joi.array().required()
        .min(2).message('Du måste skriva in två produkter för att skapa ett nytt erbjudande')
        .max(2).message('Du kan inte ha fler än två produkter för att skapa ett nytt erbjudande'),
    price: Joi.number().required()
        .min(0).message('Du kan inte skapa ett nytt erbjudande om priset är under 0kr'),
});

export default promotionSchema;