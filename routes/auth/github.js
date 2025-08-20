const passport = require("passport");
const crypto = require("crypto");
const GitHubStrategy  = require("passport-github2").Strategy;

const { Usuario } = require("../../models");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_OAUTH_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const usuarioEmail =
        profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : `${profile.username}@github.local`; // Fallback se não houver email público

      try {
        let usuario = await Usuario.findOneAndUpdate(
          { email: usuarioEmail },
          { githubUsuarioId: profile.id }
        );

        if (!usuario) {
          usuario = await Usuario.create({
            email: usuarioEmail,
            githubUsuarioId: profile.id,
            nome: profile.displayName || profile.username,
            senha: (await crypto.randomBytes(48)).toString("hex"),
          });
        }

        done(null, usuario);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
