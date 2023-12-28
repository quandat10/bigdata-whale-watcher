# Crypto Whale Watcher

Constantly looking at the order book and depth charts of different crypto-currencies on different exchanges can be painstakingly tedious. I decided to create this app to simultaneously monitor different exchanges and currencies without being bothered by insignificant trades and orders. With this app, a person can get real time trade and volume alerts from GDAX, Binance, and Bitfinex. These alerts currently occur on Telegram, but are easily switchable with other services.

## Basic Setup

1. [Clone][] the repository

2. [Create a Telegram Bot][] using BotFather, note down the authorization-token.

3. Create a group or channel, and add the bot to it. Then [get the group/channel's chat_id][].

4. Create a PostgreSQL database.<br>

   ```
   docker exec -it postgres createdb --username=admin --owner=admin bigdata
   ```

5. Create a file with name ".env" in the parent directory.

6. Add the auth-token, respective chat_id(s), and database url to the ".env" file as key-value pairs in the form shown below. These key-value pairs will be exported to the environment variables.
   ```
   BOT_TOKEN=Your:<your-bot-token>
   CHAT_ID=<main-chat-id>
   DATABASE_URL=postgres://<username>@localhost:5432/<db-name>
   ```
7. Run `npm install`, and run the app via `npm run start`.

**Notes**:

- If you get Database errors, try running `npm run db:migrate`. **IMPORTANT**: This command deletes and recreates all tables. You will need to run this every time you make a change in the list of currencies in the config file.
- A lot of the major hosting services come preinstalled with PostgreSQL or provide some plugin. Therefore the steps for creating and setting up the database may differ. For example, [Heroku](https://www.heroku.com/) has an excellend PostgreSQL plugin which upon installation automatically adds the environment variable for the database URL.
- On your local machine, the app will be served on port 3000 of localhost.

## Customizing

The app is made to use certain limits and services that may or may not be suitable for others. Therefore it is possible to make changes and customize the app to better suit the developers requirements. Please do not send pull requests to the main repository with these changes.

### Currency Pairs

Currency pairs are defined in the [config.js][] file, and can easily be added and removed as needed. One needs to be mindful to try and add pairs that are supported by both Binance and Bitfinex. Not doing so can cause unexpected behavior.

### Limits

The alerts are triggered by checking the various limits for the crypto-currency. You can learn about each limit in the [wiki][] section of this project.

Limit changes are persistent and are saved to the PostgreSQL databse on the running machine. Limits can easily be changed without affecting the repository through the browser by going to the endpoint of the running app. If you are running the app on your local machine, it'll be served on [localhost:3000](http://localhost:3000).

Limits can also be changed by editing the migration file, and running `npm run db:migrate`, in which case changes will be saved on the repository level.

### Alerts

The app currently uses Telegram as the medium for alerts. However, if one requires they can choose to add and/or replace it with other services like Discord. It is recommended you keep the structure of the functions the same.

The alerts are managed in [message.js](./lib/message.js).
