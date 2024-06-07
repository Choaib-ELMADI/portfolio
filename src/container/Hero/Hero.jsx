import React from "react";
import { useTranslation } from "react-i18next";

import "./Hero.scss";
import { Reveal } from "../../utils/index";
import { ColorTheme, LangsButtons } from "../../components";

const Hero = ({ selectedColor, setSelectedColor }) => {
	const { t, i18n } = useTranslation();

	return (
		<div id="hero" className="hero section">
			<div className="hero__top-section">
				<ColorTheme
					selectedColor={selectedColor}
					setSelectedColor={setSelectedColor}
				/>
				<div className="divider" />
				<LangsButtons />
			</div>

			<Reveal width="fit-content">
				<h1 className={i18n.language === "ar-AR" ? "rtl" : "ltr"}>
					{t("Hero.name")}
					<label>.</label>
				</h1>
			</Reveal>
			<Reveal width="fit-content">
				<p className={`domain ${i18n.language === "ar-AR" ? "rtl" : "ltr"}`}>
					<span className="domain__special">{t("Hero.firstDomain")}</span>
					<strong>,</strong>
					<br />
					<span className="domain__special">{t("Hero.secondDomain")}</span>
				</p>
			</Reveal>
			<Reveal width="fit-content">
				<p className={`intro ${i18n.language === "ar-AR" ? "rtl" : "ltr"}`}>
					{t("Hero.introduction")}
				</p>
			</Reveal>
			<Reveal width="fit-content">
				<a
					href="#contact"
					className={`contact ${i18n.language === "ar-AR" ? "rtl" : "ltr"}`}
				>
					{t("Hero.contact")}
				</a>
			</Reveal>
		</div>
	);
};

export default Hero;
