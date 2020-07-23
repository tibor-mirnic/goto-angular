import { Cookie } from 'tough-cookie';
import { Config } from 'http-proxy-middleware';

const domainRegex = /your-backend-server\.com/gmi;

module.exports = {
  '/api/v1/*': {
    target: 'https://api.your-backend-server.com/v1',
    secure: false,
    pathRewrite: {
      '^/api/v1': ''
    },
    changeOrigin: true,
    logLevel: 'debug',
    onProxyRes: proxyRes => {
      const cookies = proxyRes.headers['set-cookie'] || [];
      const modified = cookies
        .map((cookie: string) => {
          const c: Cookie.Properties = Cookie.parse(cookie).toJSON();

          if (c.secure) {
            c.secure = false;
          }

          if (domainRegex.test(c.domain)) {
            c.domain = 'localhost';
          }

          return Cookie.fromJSON(c).toString();
        });

      proxyRes.headers['set-cookie'] = modified;
    }
  } as Config
};
