import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import {
	type MessageKey,
	type MessageParams,
	type WebLanguage,
	resolveWebLanguage,
	translate,
} from '../../i18n';

interface LanguageContextType {
	language: WebLanguage;
	t: (key: MessageKey, params?: MessageParams) => string;
}

// Components rendered without a provider (e.g. in isolation) display English.
const LanguageContext = createContext<LanguageContextType>({
	language: 'en',
	t: (key, params) => translate('en', key, params),
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
	configuredLanguage?: WebLanguage;
	children: React.ReactNode;
}

const getBrowserLanguages = (): readonly string[] => {
	if (typeof navigator === 'undefined') return [];
	return navigator.languages?.length ? navigator.languages : [navigator.language];
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ configuredLanguage, children }) => {
	const language = resolveWebLanguage(configuredLanguage, getBrowserLanguages());

	useEffect(() => {
		document.documentElement.lang = language;
	}, [language]);

	const t = useCallback(
		(key: MessageKey, params?: MessageParams) => translate(language, key, params),
		[language],
	);
	const value = useMemo(() => ({ language, t }), [language, t]);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
