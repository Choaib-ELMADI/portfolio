import React from "react";
import { motion } from "framer-motion";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { TbBrandGithub } from "react-icons/tb";
import { SiLeetcode } from "react-icons/si";

import "./SocialLinks.scss";
const socialLinks = [
	{
		name: "github",
		link: "https://www.github.com/Choaib-ELMADI",
		icon: <TbBrandGithub size={24} />,
	},
	{
		name: "instagram",
		link: "https://www.instagram.com/choaib_elmadi",
		icon: <BsInstagram size={21} />,
	},
	{
		name: "leetcode",
		link: "https://leetcode.com/Choaib-ELMADI/",
		icon: <SiLeetcode size={22} />,
	},
	{
		name: "linkedin",
		link: "https://www.linkedin.com/in/choaib-elmadi",
		icon: <BsLinkedin size={22} />,
	},
];

const SocialLinks = () => {
	return (
		<div className="social-links">
			{socialLinks.map((s, i) => (
				<motion.a
					className="social-links__icon"
					key={s.name}
					href={s.link}
					target="_blank"
					rel="noreferrer"
					variants={{
						hidden: { y: -40, opacity: 0 },
						visible: { y: 0, opacity: 1 },
					}}
					initial="hidden"
					animate="visible"
					transition={{ duration: 0.35, delay: 0.08 * (i + 1) }}
				>
					{s.icon}
				</motion.a>
			))}
		</div>
	);
};

export default SocialLinks;
