# GitHub Issue Search App

## Description

This project is a React-based application that allows you to search for GitHub issues in the Facebook/React Git repository using the GraphQL GitHub API. It provides a user-friendly interface for searching and exploring the issues related to the React library.

## Prerequisites

Before running this application, make sure you have the following dependencies installed:

- Node.js (version 14 or higher)
- npm (Node Package Manager)

## Installation

1.  Copy the sample environment file to create your own `.env` file:

       ```shell
       cp sample.env .env
       ```

2. Open the `.env` file and replace the placeholder values with your GitHub API credentials:

   ```plaintext
   REACT_APP_GITHUB_TOKEN=your-github-token
   ```

   Note: You can generate a personal access token with the necessary permissions from your GitHub account settings.

3. Install the project dependencies:

   ```shell
   npm install
   ```

## Dev Usage

To start the application, run the following command:

```shell
npm run start
```

This will launch the application in your default web browser. You can now use the search functionality to find GitHub issues in the Facebook/React repository.


## Production Usage

To build the application for production, run the following command:

```shell
npm run build
```

This will create a production build of the application in the `build` directory. 
To serve the application, you can use the `serve` package. If you don't have the `serve` package installed, you can install it by running the following command:

```shell
npm install -g serve
```
    
Then run the following command:
    
```shell
serve -s build
```

## Contribution

Contributions to this project are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).