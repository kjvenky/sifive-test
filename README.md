# SiFive Test Extension

The **SiFive Test** extension for Visual Studio Code validates JSON files for format correctness and checks for schema overlaps. This README provides a comprehensive guide on how to compile, run the extension, generate a `.vsix` file, install it, run tests, and understand its underlying architecture and logic.

## Table of Contents

- [How to Compile the Extension](#how-to-compile-the-extension)
- [How to Run the Extension](#how-to-run-the-extension)
- [How to Generate a VSIX File](#how-to-generate-a-vsix-file)
- [How to Install the VSIX File](#how-to-install-the-vsix-file)
- [How to Run the Test](#how-to-run-the-test)

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

## How to Generate a VSIX File

To generate a `.vsix` file for the extension, follow these steps:

1. Make sure you are in the root directory of the project.
2. Run the following command:

    ```bash
    npx vsce package
    ```

This command uses the `vsce` tool to create a `.vsix` file in the root directory of your project. The file will be named according to your extension's name and version as specified in the `package.json` file.

## How to Install the VSIX File

To install the generated `.vsix` file in Visual Studio Code, follow these steps:

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window.
3. Click on the three-dot menu in the top right corner of the Extensions view.
4. Select **Install from VSIX...** from the dropdown menu.
5. Browse to the location of your `.vsix` file and select it.
6. The extension will be installed, and you will see it listed among your installed extensions.

## How to Run the Test

To run the tests for the extension, execute the following command in your terminal:

```bash
npm test