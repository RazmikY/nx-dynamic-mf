import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'login',
  exposes: {
    './Routes': 'apps/login/src/app/remote-entry/login.routes.ts',
  },
};

export default config;
