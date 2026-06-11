import {
	Plugin,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	type MyPluginSettings,
} from './settings';
import { WebEmbedMRC } from './WebEmbed';

// Remember to rename these classes and interfaces!

export default class MyPlugin extends Plugin {
	declare settings: MyPluginSettings;

	override async onload() {
		await this.loadSettings();
		this.registerMarkdownCodeBlockProcessor('granite-web-embed', (source, el, ctx) => {
			ctx.addChild(new WebEmbedMRC(el, source))
		});
	}

	override onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<MyPluginSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

