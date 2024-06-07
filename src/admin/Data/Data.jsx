import React, { useState } from "react";
import { FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./Data.scss";
import {
	AddProject,
	Categories,
	Projects,
	AddExp,
	Exp,
} from "../AddProjects/index";
import UploadCV from "../UploadCV/UploadCV";

const Data = ({ selectedColor }) => {
	const [projectProfile, setProjectProfile] = useState(null);
	const [newProjectInfo, setNewProjectInfo] = useState({});

	return (
		<div className={`add-more-projects ${selectedColor}`}>
			<Link className="home" to="/">
				<FiHome color="var(--special__1)" size={28} />
			</Link>

			<UploadCV />

			<Categories />

			<AddProject
				newProjectInfo={newProjectInfo}
				setNewProjectInfo={setNewProjectInfo}
				projectProfile={projectProfile}
				setProjectProfile={setProjectProfile}
			/>

			<Projects
				newProjectInfo={newProjectInfo}
				setNewProjectInfo={setNewProjectInfo}
				projectProfile={projectProfile}
				setProjectProfile={setProjectProfile}
			/>

			<AddExp />

			<Exp />
		</div>
	);
};

export default Data;
