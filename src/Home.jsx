import React from "react";

import "./Home.scss";
import {
	Sidebar,
	Navbar,
	Hero,
	About,
	Projects,
	Exp,
	Contact,
} from "./container/index";
import { Dots } from "./components/index";

const Home = ({ selectedColor, setSelectedColor }) => {
	return (
		<div className={` home ${selectedColor} `}>
			<Sidebar />
			<div className="home__container">
				<Dots />
				<Navbar />
				<Hero
					selectedColor={selectedColor}
					setSelectedColor={setSelectedColor}
				/>
				<About />
				<Projects />
				<Exp />
				<Contact />
			</div>
		</div>
	);
};

export default Home;
