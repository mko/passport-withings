/**
 * Module dependencies.
 */
var util = require('util')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy;


/**
 * `Strategy` constructor.
 *
 * The Withings authentication strategy authenticates requests by delegating to
 * Withings using the OAuth protocol.
 *
 * Applications must supply a `verify` callback which accepts a `token`,
 * `tokenSecret` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `consumerKey`     identifies client to Withings
 *   - `consumerSecret`  secret used to establish ownership of the consumer key
 *   - `callbackURL`     URL to which Withings will redirect the user after obtaining authorization
 *
 * Examples:
 *
 *     passport.use(new WithingsStrategy({
 *         consumerKey: '128-bit-consumer-key',
 *         consumerSecret: '128-bit-consumer-secret'
 *         callbackURL: 'https://www.example.net/auth/withings/callback'
 *       },
 *       function(token, tokenSecret, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'https://oauth.withings.com/account/request_token';
  options.accessTokenURL = options.accessTokenURL || 'https://oauth.withings.com/account/access_token';
  options.userAuthorizationURL = options.userAuthorizationURL || 'https://oauth.withings.com/account/authorize';
  options.sessionKey = options.sessionKey || 'oauth:withings';

  OAuthStrategy.call(this, options, verify);
  this.name = 'withings';
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);

/**
 * Retrieve user profile from Withings.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `id (Withings userid)`
 *
 * @param {String} token
 * @param {String} tokenSecret
 * @param {Object} params
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {
    try {
      var profile = { provider: 'withings' };
      profile.id = params['userid'];
      
      done(null, profile);
    } catch(e) {
      done(e);
    }
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
