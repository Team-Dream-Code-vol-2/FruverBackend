const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const { UserService } = require("./../services/user.service");

const { jwt: { secret: JWT_SECRET } } = require("./../config/config");

const opts = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
        const user = await UserService.findOne({ id: jwt_payload.id })

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    } catch (err) {
        if (err) {
            return done(err, false);
        }
    }
}));
