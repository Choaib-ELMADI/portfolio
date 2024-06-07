import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc, getDoc } from "firebase/firestore";

import { db, store } from "../../config/firebase";
import "./UploadCV.scss";
import images from "../../constants/images";
const revealVariants = {
	hidden: {
		opacity: 0,
		y: 15,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			type: "spring",
			stiffness: 120,
			staggerChildren: 0.2,
		},
	},
};

const UploadCV = () => {
	const [resume, setResume] = useState(null);
	const [currentResume, setCurrentResume] = useState(null);
	const [resumeFile, setResumeFile] = useState({
		resume: "",
		name: "",
		size: "",
	});
	const [loading, setLoading] = useState(0);

	useEffect(() => {
		const uploadFile = () => {
			const storageRef = ref(store, "/resumes/Choaib__ELMADI.pdf");
			const uploadTask = uploadBytesResumable(storageRef, resume);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setLoading(progress);
				},
				(error) => console.error(error),
				() => {
					getDownloadURL(uploadTask.snapshot.ref)
						.then((downloadURL) =>
							setResumeFile({
								resume: downloadURL,
								name: resume.name,
								size: resume.size,
							})
						)
						.catch((err) => console.error(err));
				}
			);
		};

		resume && uploadFile();
	}, [resume]);

	useEffect(() => {
		const fetchCurrentResume = async () => {
			try {
				const querySnapshot = await getDoc(
					doc(db, "resumes", "Choaib__ELMADI.pdf")
				);
				setCurrentResume(querySnapshot.data());
			} catch (err) {
				console.error(err);
			}
		};

		fetchCurrentResume();
	}, []);

	const handleSubmit = () => {
		setDoc(doc(db, "resumes", "Choaib__ELMADI.pdf"), { ...resumeFile })
			.then(() => setLoading(0))
			.catch((err) => console.error(err));
	};

	return (
		<div className="app__cv-wrapper">
			<h1>Upload Resume</h1>
			<div className="upload-container">
				<div>
					<img src={images.resume__64} alt="file icon" draggable="false" />
					<motion.div
						className="upload-details"
						variants={revealVariants}
						initial="hidden"
						animate="visible"
						key={currentResume ? currentResume.name : "file"}
					>
						<motion.p variants={revealVariants}>
							{currentResume ? currentResume.name.toLowerCase() : "File name"}
						</motion.p>
						<motion.p variants={revealVariants}>
							{currentResume
								? `${Math.floor(currentResume.size / 1_000)} KB`
								: "File size (KB)"}
						</motion.p>
					</motion.div>
					<input
						type="file"
						id="cv"
						required
						onChange={(e) => setResume(e.target.files[0])}
						hidden
					/>
					{loading !== 100 && (
						<motion.label
							htmlFor="cv"
							className="upload"
							variants={revealVariants}
							initial="hidden"
							animate="visible"
						>
							Upload CV
						</motion.label>
					)}
					{loading === 100 && (
						<motion.label
							className="done"
							onClick={handleSubmit}
							variants={revealVariants}
							initial="hidden"
							animate="visible"
						>
							DONE
						</motion.label>
					)}
				</div>
				<div className="loading">
					<div className="progress" style={{ width: `${loading}%` }} />
				</div>
			</div>
		</div>
	);
};

export default UploadCV;
