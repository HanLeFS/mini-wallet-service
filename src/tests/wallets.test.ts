import mongoose from 'mongoose';
import request from 'supertest';
import App from '@/app';
import WalletsRoute from '@routes/wallet.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Wallets', () => {
  describe('[GET] /wallets/{address}', () => {
    it('response wallet with exists address given', async () => {
      const walletsRoute = new WalletsRoute();
      const wallets = walletsRoute.walletsController.walletService.wallets;
      const address = '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219a';

      wallets.findOne = jest.fn().mockReturnValue({
        wallet_address: '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219a',
        balance: 120,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([walletsRoute]);
      return request(app.getServer()).get(`${walletsRoute.path}/${address}`).expect(200);
    });

    it('response 409 error code with a address that not found', async () => {
      const walletsRoute = new WalletsRoute();
      const wallets = walletsRoute.walletsController.walletService.wallets;
      const address = '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219b';

      wallets.findOne = jest.fn().mockReturnValue(undefined);

      (mongoose as any).connect = jest.fn();
      const app = new App([walletsRoute]);
      return request(app.getServer()).get(`${walletsRoute.path}/${address}`).expect(409);
    });

    it('response 404 error code if do not give to param an address', async () => {
      const walletsRoute = new WalletsRoute();
      const address = '';
      const app = new App([walletsRoute]);
      return request(app.getServer()).get(`${walletsRoute.path}/${address}`).expect(404);
    });

    it('response 422 error code if give to param an invalid address', async () => {
      const walletsRoute = new WalletsRoute();
      const address = 'dasdasdaasdas';
      const app = new App([walletsRoute]);
      return request(app.getServer()).get(`${walletsRoute.path}/${address}`).expect(422);
    });
  });

  describe('[POST] /wallets', () => {
    it('create a wallet success', (done) => {
      const walletsRoute = new WalletsRoute();
      const wallets = walletsRoute.walletsController.walletService.wallets;
      const dataCreate = {
        wallet_address: '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219a',
        balance: 1
      }

      wallets.create = jest.fn().mockReturnValue({
        wallet_address: '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219a',
        balance: 1,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([walletsRoute]);
      request(app.getServer())
        .post(`${walletsRoute.path}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(dataCreate)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('response 422 error code if give to param an invalid address', (done) => {
      const walletsRoute = new WalletsRoute();
      const dataCreate = {
        wallet_address: '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219aaAA',
        balance: 1
      }
      const app = new App([walletsRoute]);
      request(app.getServer())
        .post(`${walletsRoute.path}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(dataCreate)
        .expect(422)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('response 422 error code if balance is not passed', (done) => {
      const walletsRoute = new WalletsRoute();
      const dataCreate = {
        wallet_address: '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219a',
      }
      const app = new App([walletsRoute]);
      request(app.getServer())
        .post(`${walletsRoute.path}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(dataCreate)
        .expect(422)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('response 422 error code if address value is blank', (done) => {
      const walletsRoute = new WalletsRoute();
      const dataCreate = {
        wallet_address: '',
        balance: 1
      }
      const app = new App([walletsRoute]);
      request(app.getServer())
        .post(`${walletsRoute.path}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(dataCreate)
        .expect(422)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('[PUT] /wallets/{address}', () => {
    it('update balance in wallet success', async () => {
      const walletsRoute = new WalletsRoute();
      const wallets = walletsRoute.walletsController.walletService.wallets;
      const address = '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219a';
      const dataUpdate = {
        balance: 100
      }

      wallets.findOneAndUpdate = jest.fn().mockReturnValue({
        wallet_address: '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219a',
        balance: 100,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([walletsRoute]);
      return request(app.getServer())
        .put(`${walletsRoute.path}/${address}`)
        .send(dataUpdate);
    });

    it('response 400 error code with an address that not found', (done) => {
      const walletsRoute = new WalletsRoute();
      const wallets = walletsRoute.walletsController.walletService.wallets;
      const address = '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219b';
      const dataUpdate = {
        balance: 100
      }

      wallets.findOneAndUpdate = jest.fn().mockReturnValue(undefined);

      (mongoose as any).connect = jest.fn();
      const app = new App([walletsRoute]);
      request(app.getServer())
        .put(`${walletsRoute.path}/${address}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .send(dataUpdate)
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('response 404 error code if do not give to param an address', async () => {
      const walletsRoute = new WalletsRoute();
      const address = '';
      const app = new App([walletsRoute]);
      return request(app.getServer()).put(`${walletsRoute.path}/${address}`).expect(404);
    });

    it('response 422 error code if give to param an invalid address', async () => {
      const walletsRoute = new WalletsRoute();
      const address = 'dasdasdaasdas';
      const app = new App([walletsRoute]);
      return request(app.getServer()).put(`${walletsRoute.path}/${address}`).expect(422);
    });
  });

  describe('[DELETE] /wallets/{address}', () => {
    it('delete wallet success', (done) => {
      const walletsRoute = new WalletsRoute();
      const wallets = walletsRoute.walletsController.walletService.wallets;
      const address = '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219a';
      wallets.findOneAndDelete = jest.fn().mockReturnValue({
        wallet_address: '0x16e65b9390e5e0c925e03511ccd4fcd51eb5219a',
        balance: 100,
      });

      (mongoose as any).connect = jest.fn();
      const app = new App([walletsRoute]);
      request(app.getServer())
        .delete(`${walletsRoute.path}/${address}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

    it('response 404 error code if do not give to param an address', async () => {
      const walletsRoute = new WalletsRoute();
      const address = '';
      const app = new App([walletsRoute]);
      return request(app.getServer()).put(`${walletsRoute.path}/${address}`).expect(404);
    });

    it('response 422 error code if give to param an invalid address', async () => {
      const walletsRoute = new WalletsRoute();
      const address = 'dasdasdaasdas';
      const app = new App([walletsRoute]);
      return request(app.getServer()).put(`${walletsRoute.path}/${address}`).expect(422);
    });
  });
});
