import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useTranslation } from "react-i18next";

import { db } from "../../config/firebase";
import images from "../../constants/images";
import "./Navbar.scss";
import { SocialLinks } from "../../components/index";

const Navbar = () => {
	const [resume, setResume] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		const getResume = async () => {
			try {
				let myResume = [];
				const querySnapshot = await getDocs(collection(db, "resumes"));
				querySnapshot.forEach((doc) => {
					myResume.push({ ...doc.data() });
				});
				setResume(myResume[0]);
			} catch (err) {
				console.error(err);
			}
		};

		getResume();
	}, []);

	const handleDownloadResume = () => {
		if (!resume) return;
		const downloadLink = document.createElement("a");
		downloadLink.setAttribute("target", "_blank");
		downloadLink.download = "resume.pdf";
		downloadLink.href = resume.resume;
		downloadLink.click();
	};

	return (
		<div className="navbar">
			<SocialLinks />
			<button onClick={handleDownloadResume}>
				<div className="main">
					<img src={images.resume__64} alt="resume icon" />
					<span>{t("Navbar.resume")}</span>
				</div>
			</button>
		</div>
	);
};

export default Navbar;
