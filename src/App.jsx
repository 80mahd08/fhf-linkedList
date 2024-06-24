import React from "react";
import LinkedList from "./fhf-linkedlist";
import reactLogo from "./assets/react.svg";
import fhfLinkedlist from "./assets/fhf-linkedlist.png";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	(async () => {
		const list = new LinkedList();
		await list.append(1);
		await list.append(2);
		await list.append(3);
		await list.append(4);
		const len = await list.length();
		for (let index = 0; index < len; index++) {
			const value = await list.get(index);
			console.log(value);
		}
		await list.freeList();
	})();

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
				<a href="https://github.com/80mahd08/fhf-linkedList" target="_blank">
					<img src={fhfLinkedlist} className="logo" alt="fhf-linkedlist logo" />
				</a>
			</div>
		</>
	);
}

export default App;
