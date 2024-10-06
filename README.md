# SiFive Test Extension

The **SiFive Test** extension for Visual Studio Code validates JSON files for format correctness and checks for schema overlaps. This README provides a comprehensive guide on how to compile, run the extension, execute tests, and understand its underlying architecture and logic.

## Table of Contents

- [How to Compile the Extension](#how-to-compile-the-extension)
- [How to Run the Extension](#how-to-run-the-extension)
- [How to Run the Test](#how-to-run-the-test)
- [Explanation of Your Test](#explanation-of-your-test)
- [Explanation of Your Logic and Architecture](#explanation-of-your-logic-and-architecture)
- [Future Improvements](#future-improvements)

## How to Compile the Extension

To compile the SiFive Test extension, follow these steps:

1. Open a terminal and navigate to the root directory of the project.
2. Run the following command:

    ```bash
    npm run compile
    ```

This command uses TypeScript to compile the source code located in the `src` directory into JavaScript, which will be output to the `out` directory. Make sure you have Node.js and npm installed to execute this command successfully.

## How to Run the Extension

To run the SiFive Test extension:

1. Open the project in Visual Studio Code.
2. Press `F5` to start a new VS Code window with the extension loaded. This action launches another instance of Visual Studio Code with your extension activated.
3. You can use the Command Palette (Ctrl + Shift + P) to access commands provided by the extension for validating JSON files.

## How to Run the Test

To run the tests for the extension, execute the following command in your terminal:

```bash
npm test