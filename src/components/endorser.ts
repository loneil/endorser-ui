import axios from "axios";
import config from "config";

const ENDORSER_CONFIG_LIST: Array<any> = config.get("server.endorsers");

/**
 * @function login
 * Use the configured Endorser Admin secret to get the token
 * @returns {string} The inkeeper token
 */
export const login = async (endorserId: string) => {
  const endorserConfig = ENDORSER_CONFIG_LIST.find(
    (endorser) => endorser.id === endorserId
  );
  const loginUrl = `${endorserConfig.url}/endorser/token`;
  const payload = {
    grant_type: "",
    client_id: "",
    client_secret: "",
    username: endorserConfig.user,
    password: endorserConfig.password,
    scope: "",
  };
  const res = await axios.post(loginUrl, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
};
