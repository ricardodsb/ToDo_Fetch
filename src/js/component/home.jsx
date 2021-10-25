import React, { useState, useEffect} from "react";

useEffect(() => {
	fetch("https://assets.breatheco.de/apis/fake/todos/user/ricardodsb", {
		method: "GET",
		body: JSON.stringify(inputList),
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
			console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
		})
		.catch(error => {
			//manejo de errores
			console.log(error);
		});
}, []);

const Todo = () => {
	const [inputTask, setInputTask] = useState("");
	const [inputList, setInputList] = useState([]);

	function delItem(index) {
		let setInput = inputList.filter((inputTask, i) => i !== index);
		setInputList(setInput);
	}
	function addItem(e) {
		if (e.keyCode == 13) {
			setInputTask(inputTask);
			const list = inputList.concat({ label: inputTask, done: false });
			setInputList(list);
			setInputTask("");
		}
	}
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
						<li>
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
