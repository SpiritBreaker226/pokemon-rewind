# Rewind 'Pokémon' Interview Challenge

Rewind is looking for intelligent, resourceful, full-stack developers to join their growing team. To help them evaluate new talent, they have created this take-home interview question. This question should take you no more than a few hours.

## Notes

### Server

- Add the Ability fields the Card table because an Ability of a card is optional. Furthermore, it keeps the number of helper tables down and helps make the application a little bit maintainable.
- After looking at the HP coming from the Pokemon API for the Card Set for this project, Base 4, its decided, HP will be an integer, which is easier to search than a string.
- To keep the application simple, HP will be 'greater than or equal to' to show as many Pokemon as possible.
- Add HTTP Party gem to take care of the communication between the application and Pokemon TCG. Also, to reduce the amount of code in the application, focusing on the application itself.
- Add Pokemon TCG API call as a method to the Cards model to be stubbed in tests. Furthermore, it means we can switch communication gems if we wish something different and not break all of the tests. We're assuming that the Pokemon TCG API response does not occur change.
- Hardcode the Pokemon card set code to 'base4' as that is the requirements for this project.
- Each card helper class Attacks, Card Groups, Types, and Texts are responsible for managing their data. So that if there is a change that happens to the data structure, there is a single place to change that data without changing different parts of the codebase, leading to more challenging to manage the system.
- For any part of the application that is _not_ types if they find an unknown Type, then it is skipped over as only the Types model is allowed to create Types, so that there is a single point.
- Retreat cost and Attack Cost can use the same card type multiple times. As a result, the card types are counted and add to the value field in the table that connects them to the Type table.
- Due to time constraints, the `back_up_from_pokemon_api` method in the card model is not refactored, those it is bigger then it should.
- `access_pokemon_api` is assumed to work fine or that the Pokemon TCG SDK will take care of network errors. As there is no time to make sure that when the Pokemon API fails that it would do gracefully, and let the user and developer know.
- Add happy paths testing to the controller test and some of the model tests to help speed the development along on the server.
- Card order is by card name since that is easier to search throw the list of cards.

### Database Schema

- Sets will _not_ be in a database table since as to the requirements, the use of one Set. Also, to keep the application complexity down.
  - Suppose we need to add more Sets to the database. Then we will need to add a Sets table and a link table to connect the Cards table to its Sets table so that a card with the same artwork can be in multiple Sets.
    - Use is following in a link table when you are:
      - set_id - the id from the settable
      - card_id - the id from the card table
      - number
      - rarity
- Types are going to have a table because multiple parts of a card required types. The cards' details are Types, Retreat Cost, Types in Resistances and Types in Weaknesses, Cost in Attacks.
  - Types will be hardcoded in the seeds to keep the complexity down, and since Types do not change that often.
- Sub Type, Super Types, Rarity will not be added as database tables to help speed the development. If there is time, then those may be split up later on, into their tables.
  When adding those to a rarity table, since it does not have an endpoint, those will need to check first with the database or memory to keep not having to always connect with a database. Then if rarity is not in the table, add in an entry into its table.
- For Card Types, Sub or Super Types, they need to access the endpoint when doing a back-up. Get the current Card Types, Sub and Super Types from the database, and compare them with those from the endpoint; any new Card Types, Sub or Super Types add them to their respective tables.
- Card Text is in a table with the Card table because a card can have multiple texts, or the JSON response has the Text in an array.
- Since Retreat Cost, Weaknesses and Resistances uses the same fields, they merge into one table called Card Groups. So to access the different parts of Card Groups, you will need to throw the card directly. That way, it reads better as you know what that cards Weaknesses, resistances and retreat cost.

For the schema, the card table is split into the helper tables and is normalized for the most part. When we add data from the Pokemon API, we can organize it and show only the user's relive data when they land on the page or search. Thus we can simplify the table view and show only these primary fields for a card and not overload the table on page load or searching.

Besides, this will reduce the amount of data coming from the server, giving a better performance. If the user wants more details, then they can click on that card and get more information.

- [Link to the Database diagram for the application.](https://photos.app.goo.gl/XrRAMHiVhiLXeaCj7)

### Frontend

- Due to time constraints, the following will have to happen:
  - The Frontend came from another project, which I did, as most of the requirements already done and will have to modify to fit into these project requirements.
  - Purge Backup will _not_ have a confirm dialogue. If there is time, then maybe this will be added.
  - Display the minimum amount of information on the card, so there will not be a detailed view of each card nor displaying of images.
  - Also, there will _not_ be a detailed view of each card nor showing their pictures.
  - The user is allowed to search for any fields they want as it is good user interaction to give the user options to view the data in any combines they want.
- The user can search in any number of combinations of the required search fields. Since it is good to allow the user to search in any number of combinations to see the data they want.

## Installation and running this solution

### Installation

#### Server

##### Pre Requirements

- Ruby 2.5.0 or newer
- Rails 6.0
- Bundler
- Gem

##### To Install

1. If you do not have the newest version or ruby use either `rbenv install 2.7.1 && rbenv global 2.7.1`
   or `rvm install 2.7.1 && rvm use 2.7.1`
2. `gem update rails` to install the latest version is correctly 6.0
3. Make sure you are in the project's root directory
4. Go to `cd server` directory
5. Run `bundle`
6. Run `rails db:migrate`
7. Run `rake db:seed`

##### Usage

Rails server is running on `http://localhost:3000`
_Please note: Rails is a API server only_

From the 'server' directory

- To run the server use the command `rails s`
- To run the test with code coverage use the commend `rspec`
  - To open code coverage in the 'server' directory type `open coverage/index.html`

#### Frontend

##### Pre Requirements

- Have `yarn` installed

##### To Install

1. In the terminal make sure you are in the project's root directory
2. Go to `cd frontend` directory
3. Run `yarn`
4. Run `cp .env.example .env`

##### Usage

Frontend is running on `http://localhost:8080`, you can vist the app once `yarn start` is turn on.

From the 'frontend' directory

- To run the frontend use the commend `yarn start`
- To run the test with code coverage use the commend `yarn test`
  - To open code coverage in the 'frontend' directory type `open coverage/lcov-report/index.html`
- To run the test in watch mode use the commend `yarn test:watch`
