import React from 'react';
import { WEB_LANGUAGES, WEB_LANGUAGE_NAMES, isWebLanguage } from '../../i18n';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
	const { selectedLanguage, setLanguage, t } = useLanguage();

	return (
		<select
			value={selectedLanguage ?? 'auto'}
			onChange={(e) => setLanguage(isWebLanguage(e.target.value) ? e.target.value : undefined)}
			aria-label={t('nav.language')}
			title={t('nav.language')}
			className="h-9 px-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-stone-500 dark:focus:ring-stone-400 transition-colors duration-200"
		>
			<option value="auto">{t('nav.languageAuto')}</option>
			{WEB_LANGUAGES.map((option) => (
				<option key={option} value={option}>{WEB_LANGUAGE_NAMES[option]}</option>
			))}
		</select>
	);
};

export default LanguageSwitcher;
