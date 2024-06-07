import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiAdminLine } from "react-icons/ri";
import { motion } from "framer-motion";

import "./Sidebar.scss";
const listItems = ["About", "Projects", "Exp.", "Contact"];

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState("");
    const [vueSidebar, setVueSidebar] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll(".section");

        const options = {
            threshold: 0.3,
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        sections.forEach((section) => observer.observe(section));
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setVueSidebar(false);
        });
    }, []);

    return (
        <motion.div
            className={vueSidebar ? "sidebar active" : "sidebar"}
            variants={{
                hidden: { x: -80 },
                visible: { x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.35, type: "tween" }}
        >
            <motion.div
                className="logo"
                onClick={() => setVueSidebar(!vueSidebar)}
            >
                <h2>C</h2>
            </motion.div>
            <div className="links">
                {listItems.map((item, i) => (
                    <motion.a
                        className={
                            activeLink === item.toLowerCase()
                                ? "link active"
                                : "link"
                        }
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setActiveLink(item.toLowerCase())}
                        variants={{
                            hidden: { x: -80 },
                            visible: { x: 0 },
                        }}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            duration: 0.25,
                            type: "spring",
                            delay: 0.08 * (i + 1),
                        }}
                    >
                        {item}
                    </motion.a>
                ))}
            </div>
            <Link className="login-admin" to="/admin">
                <RiAdminLine fill="var(--special__1)" size={24} />
            </Link>
        </motion.div>
    );
};

export default Sidebar;
