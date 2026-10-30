import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
	type MessageKey,
	type MessageParams,
	type WebLanguage,
	isWebLanguage,
	resolveWebLanguage,
	translate,
} from '../../i18n';

interface LanguageContextType {
	language: WebLanguage;
	selectedLanguage: WebLanguage | undefined;
	setLanguage: (language: WebLanguage | undefined) => void;
	t: (key: MessageKey, params?: MessageParams) => string;
}

// Components rendered without a provider (e.g. in isolation) display English.
const LanguageContext = createContext<LanguageContextType>({
	language: 'en',
	selectedLanguage: undefined,
	setLanguage: () => {},
	t: (key, params) => translate('en', key, params),
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
	configuredLanguage?: WebLanguage;
	children: React.ReactNode;
}

// The language picked in the header is a per-browser preference and takes priority over web_language in config;
// choosing Auto clears it.
const LANGUAGE_STORAGE_KEY = 'backlog-language';

const getBrowserLanguages = (): readonly string[] => {
	if (typeof navigator === 'undefined') return [];
	return navigator.languages?.length ? navigator.languages : [navigator.language];
};

const readSelectedLanguage = (): WebLanguage | undefined => {
	try {
		const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
		return isWebLanguage(stored) ? stored : undefined;
	} catch {
		return undefined;
	}
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ configuredLanguage, children }) => {
	const [selectedLanguage, setSelectedLanguage] = useState<WebLanguage | undefined>(readSelectedLanguage);
	const language = resolveWebLanguage(selectedLanguage ?? configuredLanguage, getBrowserLanguages());

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	const setLanguage = useCallback((next: WebLanguage | undefined) => {
		setSelectedLanguage(next);
		try {
			if (next) {
				localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
			} else {
				localStorage.removeItem(LANGUAGE_STORAGE_KEY);
			}
		} catch {}
	}, []);

	const t = useCallback(
		(key: MessageKey, params?: MessageParams) => translate(language, key, params),
		[language],
	);
	const value = useMemo(
		() => ({ language, selectedLanguage, setLanguage, t }),
		[language, selectedLanguage, setLanguage, t],
	);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
