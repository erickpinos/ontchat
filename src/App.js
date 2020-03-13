import React from 'react';
import './App.css';

import { client } from 'ontology-dapi';

client.registerClient({});

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			inputMessage: '',
			messages: [
   		]
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async send(to, amount, asset) {
		try {
			const result = await client.api.asset.send({ to, asset, amount });
//			alert('onSend finished, txHash:' + result);
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

//		console.log(event.target.name);
//		console.log(event.target.value);
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.inputMessage);

		this.send('AUr5QUfeBADq6BMY6Tp5yuMsUNGpsD7nLZ',1000000,'ONG');
	}

	render() {

    const messagesDisplay = this.state.messages.slice(0).reverse().map((message, key) =>
        <div key={key}>{message.message}</div>
    );

	  return (
	    <div className="App">
		    <div><h1>ONTChat</h1></div>

				<div className="MessageForm">
					<form onSubmit={this.handleSubmit}>
						<input name="inputMessage" type="text" value={this.state.message} onChange={this.handleChange} required />
						<button type="submit">Hello</button>
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
