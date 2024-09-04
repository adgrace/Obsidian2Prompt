import { App, Notice, Plugin, PluginSettingTab, Setting, TFile, TFolder, ButtonComponent } from 'obsidian';
import * as Handlebars from 'handlebars';

interface Obsidian2PromptSettings {
    template: string;
}

const DEFAULT_SETTINGS: Obsidian2PromptSettings = {
    template: `Source Tree:
{{ source_tree }}

{{#each files}}
{{path}}:
\`\`\`\`\`\`\`
{{text}}
\`\`\`\`\`\`\`

{{/each}}`
}

export default class Obsidian2PromptPlugin extends Plugin {
    settings: Obsidian2PromptSettings;

    async onload() {
        await this.loadSettings();

        this.addRibbonIcon('clipboard-copy', 'Generate Prompt', async () => {
            const sourceTree = await this.generateSourceTree(this.app.vault.getRoot());
            const files = await this.getFilesContent();

            const template = Handlebars.compile(this.settings.template);
            const output = template({ source_tree: sourceTree, files: files }).trimEnd();

            await navigator.clipboard.writeText(output);
            new Notice('Prompt generated and copied to clipboard');
        });

        this.addSettingTab(new Obsidian2PromptSettingTab(this.app, this));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async generateSourceTree(folder: TFolder, depth: number = 0): Promise<string> {
        let tree = '';
        const indent = '  '.repeat(depth);
        
        for (const child of folder.children) {
            if (child instanceof TFile) {
                const fileNameWithoutExtension = child.name.replace(/\.md$/, '');
                tree += `${indent}├── ${fileNameWithoutExtension}\n`;
            } else if (child instanceof TFolder) {
                tree += `${indent}├── ${child.name}/\n`;
                tree += await this.generateSourceTree(child, depth + 1);
            }
        }
        
        return tree;
    }

    async getFilesContent(): Promise<Array<{path: string, text: string}>> {
        const files = this.app.vault.getFiles();
        const result = [];

        for (const file of files) {
            const filePathWithoutExtension = file.path.replace(/\.md$/, '');
            const content = await this.app.vault.read(file);
            result.push({
                path: filePathWithoutExtension,
                text: content
            });
        }

        return result;
    }
}

class Obsidian2PromptSettingTab extends PluginSettingTab {
    plugin: Obsidian2PromptPlugin;

    constructor(app: App, plugin: Obsidian2PromptPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        const headerEl = containerEl.createEl('div', { cls: 'setting-item-heading' });
        headerEl.style.display = 'flex';
        headerEl.style.justifyContent = 'space-between';
        headerEl.style.alignItems = 'center';

        headerEl.createEl('h2', { text: 'Obsidian2Prompt Settings' });

        // Add reset button to the right side of the header
        new ButtonComponent(headerEl)
            .setIcon('reset')
            .setTooltip('Reset to Default')
            .onClick(async () => {
                this.plugin.settings.template = DEFAULT_SETTINGS.template;
                await this.plugin.saveSettings();
                this.display();
            });

        const descFragment = document.createDocumentFragment();
        descFragment.append(
            "Use Handlebars syntax. Available variables:",
            descFragment.createEl("br"),
            "- {{source_tree}}",
            descFragment.createEl("br"),
            "- {{files}} (array with {path, text})"
        );

        new Setting(containerEl)
            .setName('Output Template')
            .setDesc(descFragment)
            .addTextArea(text => text
                .setPlaceholder('Enter your template here')
                .setValue(this.plugin.settings.template)
                .onChange(async (value) => {
                    this.plugin.settings.template = value;
                    await this.plugin.saveSettings();
                })
            );

        // Adjust the height of the text area
        const textAreaEl = containerEl.querySelector('textarea');
        if (textAreaEl) {
            textAreaEl.style.minHeight = '200px';  // Approximately 10 lines
            textAreaEl.style.width = '100%';
        }
    }
}