import React from "react";
import { motion } from "framer-motion";
import { SiCodeproject } from "react-icons/si";

import "./NoItems.scss";

const NoItems = ({ name }) => {
	return (
		<motion.div
			className="no-items"
			variants={{
				hidden: { y: 30 },
				visible: { y: 0 },
			}}
			initial="hidden"
			animate="visible"
			transition={{ type: "spring", damping: 15, stiffness: 200 }}
		>
			<SiCodeproject size={90} className="icon" />
			<h1>{`No ${name} Yet`}</h1>
		</motion.div>
	);
};

export default NoItems;
