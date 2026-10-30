import { describe, expect, it } from "bun:test";
import { resolveWebLanguage, translate } from "../i18n/index.ts";

describe("web language", () => {
	it("prefers the configured language over the browser languages", () => {
		expect(resolveWebLanguage("en", ["ja-JP"])).toBe("en");
		expect(resolveWebLanguage("ja", ["en-US"])).toBe("ja");
	});

	it("follows the first supported browser language when none is configured", () => {
		expect(resolveWebLanguage(undefined, ["ja-JP", "en-US"])).toBe("ja");
		expect(resolveWebLanguage(undefined, ["fr-FR", "ja"])).toBe("ja");
		expect(resolveWebLanguage(undefined, ["fr-FR"])).toBe("en");
		expect(resolveWebLanguage(undefined, [])).toBe("en");
	});

	it("translates messages and fills placeholders", () => {
		expect(translate("en", "settings.title")).toBe("Settings");
		expect(translate("ja", "settings.title")).toBe("設定");
		expect(translate("en", "taskList.showingCount", { current: 3, total: 10 })).toBe("Showing 3 of 10 tasks");
		expect(translate("ja", "taskList.showingCount", { current: 3, total: 10 })).toBe("10 件中 3 件を表示");
	});

	it("does not expand placeholders that appear inside substituted values", () => {
		expect(translate("en", "taskList.readOnlyBranch", { branch: "{branch}" })).toBe(
			"Read-only task from {branch} branch",
		);
	});
});
