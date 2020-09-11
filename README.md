# Rewind 'Pokémon' Interview Challenge

Rewind is looking for intelligent, resourceful, full-stack developers to join their growing team. To help them evaluate new talent, they have created this take-home interview question. This question should take you no more than a few hours.

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

##### Usage

Rails server is running on `http://localhost:3000`
_Please note: Rails is a API server only_

From the 'server' directory

- To run the server use the command `rails s`
- To run the test with code coverage use the commend `rspec`
  - To open code coverage in the 'server' directory type `open coverage/index.html`
