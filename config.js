var config = {};

config.twitter = {};
config.twitter.consumer_key = process.env.TWITTER_CONSUMER_KEY || '';
config.twitter.consumer_secret = process.env.TWITTER_CONSUMER_SECRET || '';
config.twitter.access_token = process.env.TWITTER_ACCESS_TOKEN_KEY || '';
config.twitter.access_token_secret = process.env.TWITTER_ACCESS_TOKEN_SECRET || '';
config.twitter.timeout = 20*1000 // 20 seconds;

config.trend_limit = 25;
config.place = 'Dubai';
config.woeid = 1940345; // Dubai's Where On Earth ID

module.exports = config;
