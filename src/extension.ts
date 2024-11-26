import * as vscode from 'vscode';
import * as cp from 'child_process';

async function runCommand(command: string, cwd: string): Promise<string> {
	return new Promise((resolve, reject) => {
		cp.exec(command, { cwd }, (error, stdout) => {
			if (error)
				reject(error);
			else
				resolve(stdout.trim());
		});
	});
}

export async function activate(context: vscode.ExtensionContext) {
	const root = (await vscode.workspace.findFiles('**/.svn', '**/node_modules/**', 1))[0];

	const scm = vscode.scm.createSourceControl('mySCM', 'My SCM');
	const resourceGroup = scm.createResourceGroup('workingTree', 'Working Tree');
	resourceGroup.resourceStates = [
		{
			resourceUri: vscode.Uri.file('/path/to/file'),
			decorations: {
				strikeThrough: false,
				faded: false,
				tooltip: 'Modified'
			}
		}
	];

	context.subscriptions.push(scm);
}

export function deactivate() {}

