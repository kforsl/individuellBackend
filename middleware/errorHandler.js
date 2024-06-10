
// Tar emot ett errorobjekt och svarar med antingen det medskickade error.status eller 500. Svarar också med det meddelande vi skickar med.
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        status: err.status,
        message: err.message
    });
}

export default errorHandler;