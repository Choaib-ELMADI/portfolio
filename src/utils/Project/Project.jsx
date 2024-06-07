import React, { useState, useEffect } from "react";
import { AiOutlineGithub, AiOutlineDeliveredProcedure } from "react-icons/ai";

import "./Project.scss";
import Details from "../Details/Details";

const Project = ({ props }) => {
	const [viewDetails, setViewDetails] = useState(false);

	useEffect(() => {
		if (viewDetails) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [viewDetails]);

	const { name, description, technologies, link, image } = props;

	const handleProjectClicked = () => {
		setViewDetails(true);
	};

	return (
		<div className="project">
			<div className="project__profile" onClick={() => handleProjectClicked()}>
				<img
					src={image}
					loading="lazy"
					alt="Project Profile"
					draggable="false"
				/>
			</div>
			<div className="project__info">
				<div className="project__info__title-link">
					<h1>{name}</h1>
					<div className="project__info__title-link__link">
						<div className="line" />
						<a
							href="https://www.github.com/Choaib-ELMADI"
							target="_blank"
							rel="noreferrer"
						>
							<AiOutlineGithub size={28} />
						</a>
						<a href={link} target="_blank" rel="noreferrer">
							<AiOutlineDeliveredProcedure size={28} />
						</a>
					</div>
				</div>
				<div className="project__info__languages">
					{technologies.split("; ").map((lang, i) => (
						<label key={lang}>
							<span>{lang}</span>
							{i !== technologies.split("; ").length - 1 && (
								<span className="langs-separator">-</span>
							)}
						</label>
					))}
				</div>
				<div className="project__info__desc">
					<p>
						{description}
						<button onClick={() => handleProjectClicked()}>
							Learn more <label>&#8250;</label>
						</button>
					</p>
				</div>
			</div>

			{viewDetails && (
				<Details
					project={props}
					setViewDetails={setViewDetails}
					viewDetails={viewDetails}
				/>
			)}
		</div>
	);
};

export default Project;
