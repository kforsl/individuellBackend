import promotionsDB from "../controllers/promotionController.js";

// Promotion 3 för 2
const thirdItemFree = async (cart, menu) => {
    try {
        if (cart.length >= 3) {
            cart[2].price = 0;
        } else {
            let freeItem = cart.findIndex(item => item.price === 0);
            if (freeItem !== -1) {
                const beforePromotion = await menu.findOne({ title: cart[freeItem].title });
                cart[freeItem].price = beforePromotion.price;
            }
        }
        return cart;
    } catch (error) {
        console.log(error);
    }
}

// Gratis frakt om du är inloggad.
export const freeUserShipping = (shipping) => {
    if (global.currentUser) {
        shipping = 0;
    }
    return shipping;
}

// Våga vägra pengar.
const goBankrupt = (cart, shipping) => {
    cart.forEach(item => {
        item.price = 0;
    });
    shipping = 0;
    return { cart, shipping };
}

// Funktion som kontrollerar om någon skapad promotion är aktiv 
export const handleDiscounts = async (cart, products, specialPrice) => {
    // Kontrollerar så att varukorgen inte har mer produkter än vad ett erbjudande innehåller
    if (cart.length <= products.length) {
        let count = 0;
        // Kontrollerar så att alla produkter i varukorgen ingår i erbjudandet,
        cart.forEach(item => {
            if (products.includes(item.title)) {
                count++;
            }
        });
        // Lägger ihop priset på varukorgens innehåll är ett giltigt erbjudande
        if (count === products.length) {
            let price = 0;
            cart.forEach(c => {
                price += c.price;
            });
            // returnerar skillnaden på varukorgs priset och specialpriset 
            return price - specialPrice;
        } else {
            // om Varukorgen inte har ett giltigt erbjudande returnera 0
            return 0;
        }
    } else {
        // om varukorgen har för många produkter returnera 0 
        return 0;
    }
}

// Knyter en funktion till respektive promotions id i databasen {promotion.id : funktionsNamn}
const promotions = {
    threeForTwo: thirdItemFree,
    freeShipping: freeUserShipping,
    liquidate: goBankrupt,
}

export const runPromotions = async (cart, menu, shipping) => {
    try {
        // Hämtar alla aktiva promotions
        const activePromotions = await promotionsDB.find({ active: true });

        // "for of" loop istället för forEach då "for of" hanterar async bättre. (tydligen)
        // forEach väntar inte på att en async funktion har kört klart förens den startar nästa varv. Det gör "for of".
        for (const promotion of activePromotions) {
            const functionToRun = promotions[promotion.id];
            if (functionToRun) {
                if (promotion.id === 'freeShipping') {
                    shipping = functionToRun(shipping);
                } else if (promotion.id === 'liquidate') {
                    const result = functionToRun(cart, shipping);
                    shipping = result.shipping;
                    cart = result.cart;
                } else {
                    await functionToRun(cart, menu);
                }
            } else {
                if (promotion.id.includes('deal')) {
                    global.discount = await handleDiscounts(cart, promotion.products, promotion.price);
                } else {
                    const error = new Error(`Kan inte hitta en kampanj för ${promotion.id}`);
                    error.status = 404;
                    throw error;
                }
            }
        }
        return { cart, shipping };
    } catch (error) {
        console.log(error);
    }

};