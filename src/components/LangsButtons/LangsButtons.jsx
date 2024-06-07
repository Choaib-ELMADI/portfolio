import React from "react";
import { useTranslation } from "react-i18next";

import "./LangsButtons.scss";
const languages = [
	{ name: "EN", code: "en-US" },
	{ name: "FR", code: "fr-FR" },
	{ name: "AR", code: "ar-AR" },
];

const LangsButtons = () => {
	const { i18n } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div className="langs-container">
			{languages.map((lng) => (
				<button
					key={lng.name}
					className={`langs-container__lng ${
						i18n.language === lng.code && "active"
					}`}
					onClick={() => changeLanguage(lng.code)}
				>
					{lng.name}
				</button>
			))}
		</div>
	);
};

export default LangsButtons;
