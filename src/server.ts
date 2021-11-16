process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import WalletsRoute from '@routes/wallet.route';

const app = new App([new WalletsRoute()]);

app.listen();
