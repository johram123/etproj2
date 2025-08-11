import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

const audience = process.env.AUTH0_AUDIENCE;
const scope = "openid profile email"; // add API scopes here if defined

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      ...(audience ? { audience } : {}),
      scope,
    },
  }),
});
