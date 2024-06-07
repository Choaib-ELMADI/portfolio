import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { AiOutlineGithub, AiOutlineDeliveredProcedure } from "react-icons/ai";

import "./Details.scss";

const Details = ({ project, setViewDetails, viewDetails }) => {
	useEffect(() => {
		if (viewDetails) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [viewDetails]);

	return (
		<div className="details-wrapper" onClick={() => setViewDetails(false)}>
			<button onClick={() => setViewDetails(false)}>
				<IoClose size={26} />
			</button>
			<motion.div
				className="main"
				variants={{
					hidden: { y: 75 },
					visible: { y: 0 },
				}}
				initial="hidden"
				animate="visible"
				transition={{ type: "spring", damping: 15, stiffness: 200 }}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="project-picture">
					<img
						src={project.image}
						loading="lazy"
						alt="Project Profile"
						draggable="false"
					/>
				</div>
				<div className="project-data">
					<div className="project-title-category">
						<h1 className="project-title">{project.name}</h1>
						<p className="project-category">{project.category}</p>
					</div>
					<div className="langs">
						{project.technologies.split("; ").map((lang, i) => (
							<label key={lang}>
								<span>{lang}</span>
								{i !== project.technologies.split("; ").length - 1 && (
									<span className="langs-separator">-</span>
								)}
							</label>
						))}
					</div>
					<p className="project-data__description">{project.paragraph_01}</p>
					<p className="project-data__description">{project.paragraph_02}</p>
					<p className="project-data__description">{project.paragraph_03}</p>
					<p className="project-data__description">{project.paragraph_04}</p>
					<h2 className="links-project">
						Project Links<label>.</label>
					</h2>
					<div className="the-links">
						<a
							href="https://www.github.com/Choaib-ELMADI"
							target="_blank"
							rel="noreferrer"
						>
							<AiOutlineGithub size={20} /> Github Profile
						</a>
						{project.link.toLowerCase() === "private" ? (
							<p className="private-project">[ This is a private project ]</p>
						) : (
							<a href={project.link} target="_blank" rel="noreferrer">
								<AiOutlineDeliveredProcedure size={20} /> Project Live
							</a>
						)}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Details;
