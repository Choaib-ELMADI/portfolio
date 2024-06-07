import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import Admin from "./admin/Admin/Admin";
import Data from "./admin/Data/Data";
import { auth } from "./config/firebase";

const App = () => {
	const [selectedColor, setSelectedColor] = useState(() => {
		return localStorage.getItem("selectedColor") || "#6b2fef";
	});

	useEffect(() => {
		localStorage.setItem("selectedColor", selectedColor);
	}, [selectedColor]);

	const RequireAuth = ({ children }) => {
		return auth.currentUser ? children : <Navigate to="/" />;
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							selectedColor={selectedColor}
							setSelectedColor={setSelectedColor}
						/>
					}
				/>
				<Route
					path="/admin"
					element={<Admin selectedColor={selectedColor} />}
				/>
				<Route
					path="/add-project"
					element={
						<RequireAuth>
							<Data selectedColor={selectedColor} />
						</RequireAuth>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
