
// Kontrollerar om inloggad användare är admin för att ge tillgång för att få tillgång till admin funktioner 

const adminHandler = () => {
    return (req, res, next) => {
        if (global.currentUser) {
            if (global.currentUser.role !== 'admin') {
                const error = new Error();
                error.status = 400;
                error.message = 'Du måste vara admin för att kunna utföra dessa uppgifter';
                next(error);
            } else {
                next();
            }
        } else {
            const error = new Error();
            error.status = 400;
            error.message = 'Logga in som en admin användare för att kunna göra ändringar';
            next(error);
        }
    }
}

export default adminHandler;