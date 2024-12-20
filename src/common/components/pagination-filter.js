

export const applyQuery = (model, join_model) => async (req, res, next) => {
    try {
      const { page = 1, limit = 5, ...filters } = req.query;
  
    
      const queryOptions = {
        where: { ...filters  , userId: req.user.id },
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
        include: join_model ? [{
            model: join_model, 
        }] : [],
      };
      const data = await model.findAll(queryOptions);
      //   console.log(data);
      req.data = data;
      next();
    } catch (error) {
        res.status(401).json({ message: "Error occured in pagination-filter component" });
    }
};
  
  