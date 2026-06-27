import * as vscode from 'vscode';
import {
    LanguageClient,
    LanguageClientOptions,
    ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient | undefined;

export async function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('knot.lsp');
    const serverPath: string = config.get('path', 'knot');

    const serverOptions: ServerOptions = {
        command: serverPath,
        args: ['lsp'],
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'knot' }],
        synchronize: {
            fileEvents: vscode.workspace.createFileSystemWatcher('**/*.knot'),
        },
        errorHandler: {
            error: (_error, _message, _count) => {
                return { action: 2 };
            },
            closed: () => {
                return { action: 1 };
            },
        },
    };

    client = new LanguageClient(
        'knot-lsp',
        'Knot Language Server',
        serverOptions,
        clientOptions
    );

    try {
        await client.start();
        vscode.window.showInformationMessage('Knot LSP started');
    } catch (e) {
        vscode.window.showWarningMessage(
            `Knot LSP failed to start. Ensure '${serverPath}' is in PATH or set knot.lsp.path. Error: ${e}`
        );
    }
}

export function deactivate(): Thenable<void> | undefined {
    if (client) {
        return client.stop();
    }
}
