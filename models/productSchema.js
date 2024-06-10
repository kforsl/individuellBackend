import Joi from "joi";

const productSchema = Joi.object({
    title: Joi.string()
        .min(3).message("Din titel måste innehålla minst 3 tecken")
        .max(25).message("Din titel får högst innehålla 15 tecken")
        .required(),
    desc: Joi.string()
        .min(10).message("Din desc måste innehålla minst 3 tecken")
        .max(100).message("Din desc får högst innehålla 50 tecken")
        .required(),
    price: Joi.number().min(0).required()
});

export default productSchema;