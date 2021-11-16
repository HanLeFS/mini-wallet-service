export interface CreateWalletDto {
  wallet_address: string;
  balance?: number;
}

export interface UpdateWalletDto {
  balance: number;
}
