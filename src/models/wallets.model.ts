import { model, Schema, Document } from 'mongoose';
import { Wallet } from '@interfaces/models/wallets.interface';

const walletSchema: Schema = new Schema({
  wallet_address: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const walletModel = model<Wallet & Document>('Wallet', walletSchema);

export default walletModel;
