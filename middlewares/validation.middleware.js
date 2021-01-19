    const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } 
    catch (e) {
        res
            .status(400)
            .send(e);
    }
}

module.exports = validate;