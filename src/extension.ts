// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import Ajv from 'ajv';

const ajv = new Ajv();

// Define the schema to support dynamic ports
const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "patternProperties": {
        "^Port[0-9]+$": {
            "type": "object",
            "properties": {
                "baseAddress": { "type": "integer" },
                "protocol": { "type": "string", "enum": ["AHB_LITE", "OTHER_PROTOCOL"] },
                "sizeBytes": { "type": "integer", "minimum": 0 },
                "widthBits": { "type": "integer", "enum": [32, 64] }
            },
            "required": ["baseAddress", "protocol", "sizeBytes", "widthBits"]
        }
    },
    "additionalProperties": false
};
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sifive-test" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('sifive-test.runSiFiveTest', () => {
		 // Get the active editor
		 const editor = vscode.window.activeTextEditor;

		 if (editor) {
            const document = editor.document;

            if (document.languageId === 'json' || document.languageId === 'json5') {
                const text = document.getText();

                try {
                    const jsonData = JSON.parse(text);

                    // Validate JSON against the schema with dynamic ports
                    const validate = ajv.compile(schema);
                    const valid = validate(jsonData);

                    if (valid) {
                        vscode.window.showInformationMessage('JSON is valid according to the schema!');
                    } else {
                        // If invalid, show error message with details
                        vscode.window.showErrorMessage('Invalid JSON structure: ' + ajv.errorsText(validate.errors));
                    }
                } catch (error: unknown) {
                    vscode.window.showErrorMessage('Invalid JSON format');
                }
            } else {
                vscode.window.showErrorMessage('This command only works on JSON or JSON5 files.');
            }
        }
	});

	
	// Add the disposable to the context's subscriptions to clean up on deactivate
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
