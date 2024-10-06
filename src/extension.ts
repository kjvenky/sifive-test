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

function checkForOverlaps(ports: Record<string, { baseAddress: number; sizeBytes: number }>): OverlapResult[] {

    const ranges: Array<{ key: string; start: number; end: number }> = [];

     // Calculate ranges for each port
	 for (const portKey in ports) {
        const { baseAddress, sizeBytes } = ports[portKey];
        const start = baseAddress;
        const end = baseAddress + sizeBytes;
        ranges.push({ key: portKey, start, end });
    }

	const overlaps: OverlapResult[] = [];

    // Check for overlaps
   // Check for overlaps
    for (let i = 0; i < ranges.length; i++) {
        for (let j = i + 1; j < ranges.length; j++) {
            // Check if ranges overlap
            if (ranges[i].start < ranges[j].end && ranges[j].start < ranges[i].end) {
                const overlapStart = Math.max(ranges[i].start, ranges[j].start);
                const overlapEnd = Math.min(ranges[i].end, ranges[j].end);
                overlaps.push({
                    port1: ranges[i].key,
                    port2: ranges[j].key,
                    start: overlapStart,
                    end: overlapEnd,
                });
            }
        }
    }

    return overlaps; // Return detected overlaps
}

// Define the expected structure of the JSON data
interface Port {
    baseAddress: number;
    protocol: string;
    sizeBytes: number;
    widthBits: number;
}

interface OverlapResult {
    port1: string;
    port2: string;
    start: number;
    end: number;
}


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
                    const jsonData = JSON.parse(text) as Record<string, Port>;

                    // Validate JSON against the schema with dynamic ports
                    const validate = ajv.compile(schema);
                    const valid = validate(jsonData);

                    if (valid) {
                        // Check for overlaps
                        const overlaps = checkForOverlaps(jsonData);
                        if (overlaps.length > 0) {
                            const overlapMessages = overlaps.map(
                                (overlap) => `Overlap between ${overlap.port1} and ${overlap.port2} from ${overlap.start} to ${overlap.end}.`
                            ).join('\n');
                            vscode.window.showWarningMessage(`Overlap exists among the ports:\n${overlapMessages}`, { modal: true });
                        } else {
                            vscode.window.showInformationMessage('JSON is valid and no overlaps exist among the ports.');
                        }
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
