const expressAsyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');
const Dogs = require('../models/dogModel');
const DogsService = require('../services/dogServices');
const sequelize = require('../configs/dbConnection').sequelize;

exports.home = expressAsyncHandler(async (req, res, next) => {
    res.status(200).send('Dogshouseservice. Version1.0.1');
});

exports.getDogs = expressAsyncHandler(async (req, res, next) => {
    try {
        const dogServices = new DogsService(Dogs);
    
        const { order, attribute, limit, pageNumber } = req.query;
    
        const options = {
          order,
          attribute,
          limit: Number(limit),
          pageNumber: Number(pageNumber),
        };
    
        const dogData = await dogServices.sortingAndPagination(options);
    
        res.status(200).json(dogData);

      } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'An error occurred' });
      }
});

exports.createDogs = expressAsyncHandler(async (req, res, next) => {
    const dog = await Dogs.findOne({ where: {name:req.body.name}});
    if (!dog) {
        try {
            if (req.body.tail_length < 0) {
                return next(new AppError('Tail length must be a postive integer', 400));
            }
        
            const newDog = await Dogs.create(req.body);
            res.status(201).json(newDog);

        } catch (error) {
            next(error);
        }
    } else {
        next(new AppError('Dog already exists', 400));
    }
});