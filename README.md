# Obsidian2Prompt

Obsidian2Prompt is a plugin for Obsidian that allows you to generate prompts for Large Language Models (LLMs) based on your vault content. 

## Features

- Generate a structured prompt including your vault's file tree and file contents
- Customizable output template using Handlebars syntax
- Easy-to-use interface with a single click to copy the generated prompt to clipboard

## Installation

1. Open Obsidian and go to Settings > Community Plugins
2. Disable Safe Mode
3. Click on "Browse" and search for "Obsidian2Prompt"
4. Click "Install" and then "Enable"

## Usage

1. Click the dice icon in the left ribbon to generate a prompt
2. The prompt will be automatically copied to your clipboard
3. Paste the prompt into your preferred LLM interface

Note: Anthropic's Claude has a token window size of 200k, which equates to about 150,000 words. For context, F. Scott Fitzgerald's "The Great Gatsby" is 47,094 words long. This means Claude can process about 3 times the length of "The Great Gatsby" in a single prompt.

Most Obsidian vaults will fit comfortably within this limit, allowing you to include your entire vault in a single prompt. This opens up powerful possibilities such as:
- Asking questions about the entirety of your vault's content
- Generating summaries of your vault or specific sections
- Creating new content based on the collective knowledge in your vault
- Identifying connections or patterns across your notes

## Customization

You can customize the output template in the plugin settings. The template uses Handlebars syntax and has access to the following variables:
- `{{source_tree}}`: A string representation of your vault's file structure
- `{{files}}`: An array of objects, each containing `path` and `text` properties for each file in your vault

## Support

If you encounter any issues or have suggestions, please file an issue on the GitHub repository.

## License

This project is licensed under the MIT License.

## Acknowledgements

This project is based on [Code2Prompt](https://github.com/mufeedvh/code2prompt) by mufeedvh. We are grateful for their work which served as the inspiration for this Obsidian plugin.