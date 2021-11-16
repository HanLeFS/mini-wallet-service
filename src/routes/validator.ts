import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { body, param, validationResult } from 'express-validator';
import { logger } from '@utils/logger';
import Web3 from 'web3';

export const create = () => {
  return [
    // wallet address must exists
    body('wallet_address')
      .exists()
      .custom(value => {
        const web3 = new Web3();
        if (!web3.utils.isAddress(value)) {
          throw new Error('ETH address invalid!');
        }
        return true;
      }),
    // balance must be a number
    body('balance').isNumeric(),
  ];
};

export const update = () => {
  return [
    // wallet address must exists
    param('address')
      .exists()
      .custom(value => {
        const web3 = new Web3();
        if (!web3.utils.isAddress(value)) {
          throw new Error('ETH address invalid!');
        }
        return true;
      }),
    // balance must be a number
    body('balance').isNumeric().withMessage('balance must be a number'),
  ];
};

export const address = () => {
  return param('address')
    .exists()
    .custom(value => {
      const web3 = new Web3();
      if (!web3.utils.isAddress(value)) {
        throw new Error('ETH address invalid!');
      }
      return true;
    });
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};
