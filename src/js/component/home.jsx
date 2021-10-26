import React, { useState, useEffect } from "react";

const Todo = () => {
	const [inputTask, setInputTask] = useState("");
	const [inputList, setInputList] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardodsb", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
				console.log(resp.status); // el código de estado = 200 o código = 400 etc.
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				setInputList(data);
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	}, []);

	const updateList = list => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardodsb", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(list)
		});
	};

	let delItem = index => {
		let setInput = inputList.filter((inputTask, i) => i !== index);
		setInputList(setInput);
	};
	let addItem = e => {
		if (e.keyCode == 13) {
			setInputTask(inputTask);
			if (!inputTask) {
				alert("You need to insert a task");
				list(false);
			}
			const list = inputList.concat({ label: inputTask, done: false });
			setInputList(list);
			setInputTask("");
		}
	};
	return (
		<div className="text-center mt-5">
			<h1>{"ToDo's"}</h1>
			<input
				type="text"
				value={inputTask}
				placeholder="What needs to be done?"
				onChange={e => setInputTask(e.target.value)}
				onKeyUp={addItem}
			/>
			<div id="listbar">
				{inputList.map((todo, i) => (
					<>
						<li key={todo}>
							{todo.label}
							<button
								className="btn btn-danger"
								id="delete"
								onClick={() => delItem(i)}>
								<i
									className="fa fa-times"
									aria-hidden="true"></i>
							</button>
						</li>
					</>
				))}
				<div className="row">
					<div className="col mx-auto">
						<ul className="list-group">
							{inputList.length == 0 ? (
								<li className="list-group-item">
									Add your task...
								</li>
							) : (
								""
							)}
							<li
								id="last"
								className="list-group text-muted text-start counter">
								{inputList.length} Items left
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Todo;
