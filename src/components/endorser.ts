import axios from "axios";
import config from "config";

/**
 * @function login
 * Use the configured Endorser Admin secret to get the token
 * @returns {string} The inkeeper token
 */
export const login = async () => {
  const loginUrl =
    "https://bcovrin-endorser-service-dev.apps.silver.devops.gov.bc.ca/endorser/token";
  const payload = {
    grant_type: "",
    client_id: "",
    client_secret: "",
    username: "endorser-admin",
    password: "64UlLKcErNvVeCuFmL8BsxfnlLkLcfb/f8Ex/6DVQXo=",
    scope: "",
  };
  const res = await axios.post(loginUrl, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return res.data;
};
