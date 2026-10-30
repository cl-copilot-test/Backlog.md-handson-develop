import { boardMessages } from "./messages/board.ts";
import { commonMessages } from "./messages/common.ts";
import { navigationMessages } from "./messages/navigation.ts";
import { settingsMessages } from "./messages/settings.ts";
import { taskDetailsMessages } from "./messages/task-details.ts";
import { taskListMessages } from "./messages/task-list.ts";

/** Languages the browser UI can display. Stored in config as `web_language`. */
export const WEB_LANGUAGES = ["en", "ja"] as const;
export type WebLanguage = (typeof WEB_LANGUAGES)[number];

/** Each language is named in itself so it stays recognizable whichever language is active. */
export const WEB_LANGUAGE_NAMES: Record<WebLanguage, string> = { en: "English", ja: "日本語" };

const en = {
	...commonMessages.en,
	...navigationMessages.en,
	...boardMessages.en,
	...taskListMessages.en,
	...taskDetailsMessages.en,
	...settingsMessages.en,
};

export type MessageKey = keyof typeof en;
export type MessageParams = Record<string, string | number>;

const ja: Record<MessageKey, string> = {
	...commonMessages.ja,
	...navigationMessages.ja,
	...boardMessages.ja,
	...taskListMessages.ja,
	...taskDetailsMessages.ja,
	...settingsMessages.ja,
};

const messages: Record<WebLanguage, Record<MessageKey, string>> = { en, ja };

export function isWebLanguage(value: unknown): value is WebLanguage {
	return typeof value === "string" && (WEB_LANGUAGES as readonly string[]).includes(value);
}

/**
 * The configured language wins; when none is configured, follow the browser's preferred
 * languages and fall back to English.
 */
export function resolveWebLanguage(
	configured: WebLanguage | undefined,
	browserLanguages: readonly string[],
): WebLanguage {
	if (configured) {
		return configured;
	}
	for (const browserLanguage of browserLanguages) {
		const base = browserLanguage.toLowerCase().split("-")[0];
		if (isWebLanguage(base)) {
			return base;
		}
	}
	return "en";
}

/** Returns the message for `key`, replacing `{name}` placeholders with `params.name`. */
export function translate(language: WebLanguage, key: MessageKey, params?: MessageParams): string {
	const message = messages[language][key];
	if (!params) {
		return message;
	}
	return message.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
		name in params ? String(params[name]) : placeholder,
	);
}
