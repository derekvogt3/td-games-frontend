# TD Games

## An online gaming platform that allows users to play, interact and message each other in real-time.

## Creators:

- [Tony Cheng](https://github.com/TLCheng11)
- [Derek Vogt](https://github.com/derekvogt3)

## Git Repos:

- [Frontend](https://github.com/derekvogt3/td-games-frontend)
- [Backend](https://github.com/derekvogt3/td-games-backend)

# Descriptions

- Designed simple games like Tic Tac Toe that can be played with friends online.
- Provided users with instant messaging functions between friends and monitored their online status.
- Tracked unread messages and shown as a badge on the navigation menu.
- Employed SQLite database to store game histories and user data.
- Recorded every move to let users pause and resume games anytime they wanted and play multiple games simultaneously.

# System dependencies

- Ruby: 2.7.4
- Node: 16.17.1
- SQLite

# Configuration:

## Frontend:

- Install packages: npm install
- Start server: npm start
- open [localhost:3021](http://localhost:4000/) on your browser

## Backend (Sinatra):

- Install packages: bundle install
- Initialize Database: rake db:migrate db:seed
- Start server: rake server
