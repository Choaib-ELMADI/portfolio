import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../config/firebase";
import "./Admin.scss";

const Admin = ({ selectedColor }) => {
	const [userData, setUserData] = useState({ email: "", password: "" });
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { value, name } = e.target;

		setUserData({ ...userData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		signInWithEmailAndPassword(auth, userData.email, userData.password)
			.then(() => navigate("/add-project"))
			.catch((error) => {
				console.error(error);
				setError(true);
			});
	};

	return (
		<div className={`signin ${selectedColor}`}>
			<form onSubmit={handleSubmit}>
				<div className="input-group">
					<label>Enter Your Email</label>
					<input
						name="email"
						type="email"
						placeholder="Enter Your Email"
						required
						value={userData.email}
						onChange={handleChange}
					/>
				</div>
				<div className="input-group">
					<label>Enter Your Password</label>
					<input
						name="password"
						type="password"
						placeholder="Enter Your Password"
						value={userData.password}
						required
						onChange={handleChange}
					/>
				</div>
				<button type="submit">Admin</button>
				<Link className="return-home " to="/">
					Home
				</Link>

				{error && (
					<div className="login-error">
						<h1>Error accured</h1>
						<div className="reset-error">
							<button
								onClick={() => {
									setError(false);
									setUserData({ email: "", password: "" });
								}}
							>
								Try again
							</button>
							<Link className="back-home" to="/">
								Home
							</Link>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default Admin;
