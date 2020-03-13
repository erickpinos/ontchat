import React from 'react';
import './App.css';

import { client } from 'ontology-dapi';

client.registerClient({});

const ONG_USD = 0.062430;

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			inputMessage: '',
			inputMessageCost: 0,
			messages: []
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async send(to, amount, asset) {
		try {
			const result = await client.api.asset.send({ to, asset, amount });
			alert('onSend finished, txHash:' + result);
			console.log('onSend finished, txHash:' + result);

			this.setState({
				'messages' : this.state.messages.concat({ 'message': this.state.inputMessage}) 
			})

		} catch (e) {
//			alert('onSend canceled');
			// tslint:disable-next-line:no-console
			console.log('onSend error:', e);
		}
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});

		this.setState({
			inputMessageCost: event.target.value.length / 100,
		});

//		console.log(event.target.name);
		console.log(event.target.value);
		console.log(this.state.inputMessageCost);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.inputMessage);

		this.send('AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ', this.state.inputMessageCost * 1000000000,'ONG');
	}

	render() {

		const messagesDisplay = this.state.messages.slice(0).reverse().map((message, key) =>
			<div key={key}>{message.message}</div>
		);

		var ontUSDCost = this.state.inputMessageCost * ONG_USD;

		return (
			<div className="App">
				<div><h1>ONTChat</h1></div>

				<div className="MessageForm">
					<form onSubmit={this.handleSubmit}>
						<input name="inputMessage" type="text" value={this.state.message} onChange={this.handleChange} required />
						<p>This message will cost {this.state.inputMessageCost} ONG (${ontUSDCost.toFixed(3)} USD)</p>
						<button type="submit">Submit</button>
					</form>
				</div>

				<div className="Feed">
					<div><h2>Feed</h2></div>
					{messagesDisplay}
				</div>

			</div>
		);
	}
}

export default App;
