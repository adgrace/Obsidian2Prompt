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

## Customization

You can customize the output template in the plugin settings. The template uses Handlebars syntax and has access to the following variables:
- `{{source_tree}}`: A string representation of your vault's file structure
- `{{files}}`: An array of objects, each containing `path` and `text` properties for each file in your vault

## Support

If you encounter any issues or have suggestions, please file an issue on the GitHub repository.

## License

This project is licensed under the MIT License.