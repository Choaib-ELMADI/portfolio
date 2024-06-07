import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "../../config/firebase";
import "./Projects.scss";
import { Title, Reveal, Project } from "../../utils/index";
import { ProjectButtons, NoItems } from "../../components/index";
import { BsStars } from "react-icons/bs";

const Modal = () => {
	return (
		<div className="project-modal">
			<div className="project-modal__img" />
		</div>
	);
};

const Projects = () => {
	const [activeBtn, setActiveBtn] = useState("All");
	const [projects, setProjects] = useState([]);
	const [filteredProjects, setFilteredProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				let myProjects = [];
				const querySnapshot = await getDocs(
					query(collection(db, "projects"), orderBy("order", "desc"))
				);

				querySnapshot.forEach((p) => {
					myProjects.push({ ...p.data() });
				});
				setFilteredProjects(myProjects);
				setProjects(myProjects);
				setLoading(false);
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, []);

	const filterProjects = (category) => {
		if (category === "All") {
			setFilteredProjects(projects);
		} else {
			setFilteredProjects(
				projects.filter((project) => project.category === category)
			);
		}
	};

	return (
		<div id="projects" className="projects section">
			<Reveal width="100%">
				<Title title="Projects" left={false} />
			</Reveal>

			<ProjectButtons
				filterProjects={filterProjects}
				activeBtn={activeBtn}
				setActiveBtn={setActiveBtn}
			/>

			<div
				className={
					!loading && filteredProjects.length < 1
						? "projects__wrapper flex"
						: "projects__wrapper"
				}
			>
				{loading ? (
					<>
						<Modal />
						<Modal />
					</>
				) : (
					<>
						{filteredProjects.length < 1 ? (
							<NoItems key={activeBtn} name="Project" />
						) : (
							filteredProjects.length >= 1 &&
							filteredProjects.map((project) => {
								return <Project key={project.name} props={project} />;
							})
						)}
					</>
				)}
				{filteredProjects.length >= 1 && (
					<div className="new-project-goes-here">
						<BsStars size={70} fill="#dfae0e" />
						<h1>Your project goes here</h1>
						<p>Together, we'll bring your ideas to life!</p>
						<a href="#contact" className="contact">
							Get in touch
						</a>
					</div>
				)}
			</div>
		</div>
	);
};

export default Projects;
