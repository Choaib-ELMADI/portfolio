import { AiFillCode, AiFillSmile } from "react-icons/ai";
import { MdOutlineElectricBolt } from "react-icons/md";
import React, { useRef, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";

import "./About.scss";
import { Title, Reveal } from "../../utils/index";
import { SocialLinks } from "../../components/index";
const frameworks = [
	{
		icon: <MdOutlineElectricBolt color="var(--special__1)" />,
		title: "Electronics",
		items: [
			"Arduino",
			"ESP32",
			"Raspberry PI",
			"ESP82",
			"FPGA",
			"SoC",
			"ASIC",
			"PCB",
			"AI",
			"ML",
			"Altium Designer",
			"Embedded C",
			"Matlab",
			"Simulink",
			"Microcontrollers",
			"Assembly",
			"Python",

			"Computer Vision",
			"Step7",
			"FluidSim",
		],
	},
	{
		icon: <AiFillCode color="var(--special__1)" />,
		title: "Web Dev",
		items: [
			"HTML",
			"CSS",
			"SASS",
			"Tailwind",
			"Git",
			"Github",
			"JavaScript",
			"TypeScript",
			"Reactjs",
			"Nextjs",
			"Nodejs",
			"Express",
			"Firebase",
			"MongoDB",
		],
	},
	{
		icon: <AiFillSmile color="var(--special__1)" />,
		title: "Use for Fun",
		items: ["KiCad", "Proteus 8", "Canva", "Figma", "Threejs", "Sanity"],
	},
];

const About = () => {
	const aboutRef = useRef(null);

	useEffect(() => {
		if (aboutRef.current) {
			setTimeout(() => {
				aboutRef.current.scrollIntoView({ behavior: "smooth" });
			}, 1000);
		}
	}, []);

	return (
		<div id="about" className="about section" ref={aboutRef}>
			<Reveal width="100%">
				<Title title="About" left={true} />
			</Reveal>
			<div className="about__content">
				<div className="about__content__introduction">
					<p className="first">
						Hey, I'm Choaib ELMADI, currently immersed in the world of Embedded
						Systems Engineering, fueled by a passion for crafting innovative
						solutions. As a full-stack developer, I've not only dabbled in
						creating captivating user interfaces but also delved deep into the
						intricacies of embedded systems.
					</p>

					<p>
						My journey into the realm of robotics and electronics has been
						driven by a strong interest in exploring the possibilities of
						embedded systems. Through hands-on experimentation, I've ventured
						into building small-scale robots, leveraging Python and Machine
						Learning to enhance their functionality and integration into daily
						life.
					</p>

					<p>
						These projects have provided invaluable experience in seamlessly
						integrating hardware and software components within embedded
						systems, ensuring optimal performance ☁️.
					</p>

					<p>
						Guided by a methodical approach and an unwavering attention to
						detail, I'm confident in my ability to deliver high-quality work.
						I'm enthusiastic about applying my skills and knowledge to make
						meaningful contributions to innovative projects in both embedded
						systems and web development. If you have an opportunity that
						resonates with my interests, let's connect 🔗.
					</p>

					<div className="mylinks">
						<p>
							My links <BsArrowRight />
						</p>
						<SocialLinks />
					</div>
				</div>
				<div className="about__content__frameworks">
					{frameworks.map((item, i) => (
						<div className="category" key={`category-${i}`}>
							<h1>
								{item.icon} {item.title}
							</h1>
							<div className="items">
								{item.items.map((f) => (
									<label key={f}>{f}</label>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default About;
