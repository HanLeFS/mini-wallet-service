import { CreateWalletDto, UpdateWalletDto } from '@dtos/wallets.dto';
import { HttpException } from '@exceptions/HttpException';
import { Wallet } from '@interfaces/models/wallets.interface';
import walletModel from '@models/wallets.model';
import { isEmpty } from '@utils/util';

class WalletService {
  public wallets = walletModel;

  public async findWalletByAddress(walletAddress: string): Promise<Wallet> {
    if (isEmpty(walletAddress)) throw new HttpException(400, 'Wallet not found!');

    const findWallet: Wallet = await this.wallets.findOne({ wallet_address: walletAddress });
    if (!findWallet) throw new HttpException(409, 'Wallet not found!');

    return findWallet;
  }

  public async createWallet(walletData: CreateWalletDto): Promise<Wallet> {
    if (isEmpty(walletData)) throw new HttpException(400, "You're not walletData");

    const findWallet: Wallet = await this.wallets.findOne({ wallet_address: walletData.wallet_address });
    if (findWallet) throw new HttpException(409, `You're address ${walletData.wallet_address} already exists`);

    const createWalletData: Wallet = await this.wallets.create({ ...walletData });
    console.log(createWalletData);

    return createWalletData;
  }

  public async updateWallet(walletAddress: string, walletData: UpdateWalletDto): Promise<Wallet> {
    if (isEmpty(walletData)) throw new HttpException(400, 'Data invalid!');

    const walletUpdated: Wallet = await this.wallets.findOneAndUpdate({ wallet_address: walletAddress }, walletData, { new: true });
    if (!walletUpdated) {
      throw new HttpException(400, 'Cannot update your wallet!');
    }
    return walletUpdated;
  }

  public async deleteWallet(walletAddress: string): Promise<Wallet> {
    const deleteWalletByAddess: Wallet = await this.wallets.findOneAndDelete({ wallet_address: walletAddress });
    if (!deleteWalletByAddess) {
      throw new HttpException(400, 'Wallet not exists');
    }

    return deleteWalletByAddess;
  }
}

export default WalletService;
