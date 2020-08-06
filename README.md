# FFXIV-Tracker

![Master Build & Deploy](https://github.com/waywardware/traxiv/workflows/Master%20Build%20&%20Deploy/badge.svg)

The aim of this project is to be able track progress for various aspects of activities on Final Fantasy XIV on a clean, modern, single-page website.

## What is working

Currently the tracker is available at [ffxivtracker.com](https://www.ffxivtracker.com/).

### Player Mounts

* Searching for player based on their name
* Pinning players to a group
* Sharing group through url parameters (`https://www.ffxivtracker.com/?pid=<player_id>%2C<second_player_id>`)
* Filtering player's mounts by how they're obtained (Raid, Trial, Achievement, etc.)
* Manually checking off which mounts have been obtained (Since server-side updates can take a while)
* Checking where/how mounts can be obtained via mouse over

## Contributing

Feel free contribute, all contributions are greatly appreciated. Create an issue if you have any feature requests, change requests, bugs, or questions. If you see something that could be improved in the code base or in the documentation, go ahead and create a PR.

## Development 

The core libraries used in this project are Rect, Redux, Redux-Api-Middleware, and Material UI. To keep package version consistency, please you `yarn`

### Getting started

1. Clone the project: `git clone git@github.com:waywardware/FFXIV-Tracker.git`
2. Install all dependencies: `yarn install`

You should be good to go from there. Make any code changes you want and  run `yarn start` to get a dev build of the site up and running. This version should auto-update whenever code changes are saved, but it is a bit slow than a proper build. You can get a proper build by running `yarn build`.
