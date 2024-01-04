// Not really a router, but the configuration to proxy calls to THIS backend over to Traction
import config from "config";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";

const ENDORSER_CONFIG_LIST: Array<any> = config.get("server.endorsers");

// Send calls to api/traction to the configured Traction environment
// If we need to alter any request bodies or anything when coming from the tenant UI
// can do that in these options (like with onProxyReq)
// https://www.npmjs.com/package/http-proxy-middleware#intercept-and-manipulate-requests
const options = {
  // unused but required default
  target: 'localhost:8080',
  // set the router to change the target to the correct endorser
  router: (req: any) => {
    // get the endorserId path param
    const endorserCfg = ENDORSER_CONFIG_LIST.find(
      (endorser) => endorser.id === req.params.endorserId
    );
    const url: string = `${endorserCfg.url}/endorser/v1`;
    return url;
  },
  changeOrigin: true,
  // So we go to the root of proxied service (lose the api/{endorserid}/endorser part)
  pathRewrite: { "^/api/.*/endorser": "" },
  followRedirects: true,
};

export const endorserProxy = createProxyMiddleware(options);
