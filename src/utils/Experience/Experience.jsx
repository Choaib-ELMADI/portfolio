import React from "react";

import "./Experience.scss";

const Experience = ({ data }) => {
    return (
        <div className="experience-wrapper">
            <div className="experience-wrapper__content">
                <div className="experience-wrapper__content__company">
                    <h2>{data.company}</h2>
                    <p>{data.year}</p>
                </div>
                <div className="experience-wrapper__content__job">
                    <h2>{data.job}</h2>
                    <p>{data.place}</p>
                </div>

                <p className="experience-wrapper__content__desc">
                    {data.description}
                </p>
                <div className="experience-wrapper__content__langs">
                    {data.technologies.split("; ").map((l) => (
                        <label key={l}>{l}</label>
                    ))}
                </div>
            </div>
            <div className="line" />
        </div>
    );
};

export default Experience;
