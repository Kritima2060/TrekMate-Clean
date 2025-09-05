const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    return next();
  } catch (err) {
    
    // res.status(400).json({msg:message})
    const status = 422;
    const extraDetails = err.errors[0].message;
    const message = "Fill the input properly";
    // const extraDetails = err.issues.map((curElem) => curElem.message);

    const error = {
      status,
      message,
      extraDetails,
    };
    console.log(error);
    // next(extraDetails);
    next(error);
  }
};

module.exports = validate;