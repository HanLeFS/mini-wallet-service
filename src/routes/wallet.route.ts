import { Router } from 'express';
import WalletsController from '@controllers/wallet.controller';
import { Routes } from '@interfaces/routes.interface';
import { create, update, address, validate } from './validator';

class WalletsRoute implements Routes {
  public path = '/wallets';
  public router = Router();
  public walletsController = new WalletsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:address`, address(), validate, this.walletsController.getWalletByAddess);
    this.router.post(`${this.path}`, create(), validate, this.walletsController.createWallet);
    this.router.put(`${this.path}/:address`, update(), validate, this.walletsController.updateWallet);
    this.router.delete(`${this.path}/:address`, address(), validate, this.walletsController.deleteWallet);
  }
}

export default WalletsRoute;
