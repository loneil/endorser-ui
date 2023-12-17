// The default router for the Tenant UI backend
// Expand on this (or add other router files) if the TenantUI backend should do much more business actions
// other than serving the static files and proxying to Traction

import express, { Request, Response } from "express";
import config from "config";
import * as innkeeperComponent from "../components/innkeeper";
import * as endorserComponent from "../components/endorser";
import { secure } from "express-oauth-jwt";
import { createRemoteJWKSet } from "jose";
import { NextFunction } from "express";

const jwksService = createRemoteJWKSet(
  new URL(config.get("server.oidc.jwksUri"))
);

export const router = express.Router();

router.use(express.json());

// For the secured innkeepr OIDC login request to verify the token and get a token from Traction
router.get(
  "/innkeeperLogin",
  secure(jwksService),
  async (req: any, res: Response, next: NextFunction) => {
    try {
      // Validate JWT from OIDC login before moving on
      // The realm access check below is pretty Keycloak specific
      // It's a TODO later to see how this could be a more generic OIDC claim
      console.log(req.claims);
      if (
        req.claims.realm_access &&
        req.claims.realm_access.roles &&
        req.claims.realm_access.roles.includes(
          config.get("server.oidc.roleName")
        )
      ) {
        const result = await innkeeperComponent.login();
        res.status(200).send(result);
      } else {
        res.status(403).send();
      }
    } catch (error) {
      console.error(`Error logging in: ${error}`);
      next(error);
    }
  }
);

// For the secured innkeepr OIDC login request to verify the token and get a token from Traction
router.get(
  "/endorserLogin",
  secure(jwksService),
  async (req: any, res: Response, next: NextFunction) => {
    try {
      // Validate JWT from OIDC login before moving on
      // The realm access check below is pretty Keycloak specific
      // It's a TODO later to see how this could be a more generic OIDC claim
      console.log(req.claims);
      if (
        req.claims.realm_access &&
        req.claims.realm_access.roles &&
        req.claims.realm_access.roles.includes(
          config.get("server.oidc.roleName")
        )
      ) {
        const result = await endorserComponent.login();
        res.status(200).send(result);
      } else {
        res.status(403).send();
      }
    } catch (error) {
      console.error(`Error logging in: ${error}`);
      next(error);
    }
  }
);
