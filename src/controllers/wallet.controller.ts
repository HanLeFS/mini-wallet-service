import { NextFunction, Request, Response } from 'express';
import { CreateWalletDto, UpdateWalletDto } from '@dtos/wallets.dto';
import { Wallet } from '@interfaces/models/wallets.interface';
import walletService from '@services/wallets.service';
import { walletObjMerge } from '@response/wallet.response-schema';

class WalletsController {
  public walletService = new walletService();

  public getWalletByAddess = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const walletAddress: string = req.params.address;
      const findOneUserData: Wallet = await this.walletService.findWalletByAddress(walletAddress);
      // const { wallet_address, balance } = findOneUserData;
      res.status(200).json({ data: walletObjMerge(findOneUserData), message: 'success' });
    } catch (error) {
      next(error);
    }
  };

  public createWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const walletData: CreateWalletDto = req.body;
      const createWalletData: Wallet = await this.walletService.createWallet(walletData);

      res.status(201).json({ data: walletObjMerge(createWalletData), message: 'create successfully' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public updateWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const walletAddess: string = req.params.address;
      const walletData: UpdateWalletDto = req.body;
      const updateWalletData: Wallet = await this.walletService.updateWallet(walletAddess, walletData);

      res.status(200).json({ data: walletObjMerge(updateWalletData), message: 'update successfully' });
    } catch (error) {
      next(error);
    }
  };

  public deleteWallet = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const walletAddess: string = req.params.address;
      const deleteWalletData: Wallet = await this.walletService.deleteWallet(walletAddess);

      res.status(200).json({ data: walletObjMerge(deleteWalletData), message: 'delete successfully' });
    } catch (error) {
      next(error);
    }
  };
}

export default WalletsController;
