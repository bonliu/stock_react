import React from 'react';

class SellForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            ticker: '',
            share: 1,
            maxShare: 1
        };
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            email: this.props.email,
            ticker: this.props.ticker,
            maxShare: this.props.maxShare
        })
    }

    componentDidUpdate() {
        
    }

    getCurrentPrice = async () => {
        const iex_token = 'pk_b13cf33210f742ffb6860aa0f6ade3b0';
        let api = 'https://cloud.iexapis.com/stable/stock/TICKER/quote?token=TOKEN&filter=symbol,latestPrice,change';
        api = api.replace('TICKER', this.state.ticker).replace('TOKEN', iex_token);
        const response = await fetch(api);
        const data = await response.json();
        
        return data.latestPrice;
    }

    setPrice = async p => {
        const response = await fetch('/api/stock/update/price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: p,
                email: this.state.email,
                ticker: this.state.ticker
            })
        });

        const data = await response.json();
        console.log(data);
        return data;
    }

    getBalance = async () => {
        const response = await fetch('/api/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email
            })
        });

        const data = await response.json();
        return data.balance;
    }

    setBalance = async p => {
        const response = await fetch('/api/balance/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.props.email,
                balance: p
            })
        });

        const data = await response.json();
        this.setState({ balance: data.balance });
    }

    setQty = async () => {
        const response = await fetch('/api/stock/update/count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                ticker: this.state.ticker,
                qty: parseInt(this.state.maxShare)
            })
        });
        const data = await response.json();
        console.log(data);
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log('Sell');

        // Get current price
        const price = await this.getCurrentPrice();
        // Get balance
        const balance = await this.getBalance();
        // balance -= price * count
        console.log(`balance: ${balance}`);
        console.log(`price: ${price}`);
        console.log(`share: ${this.state.share}`);
        const newBalance = (parseFloat(balance) + parseFloat(price) * parseFloat(this.state.share)).toFixed(2);
        console.log(`newBalance: ${newBalance}`);
        this.setBalance(newBalance);
        // if count == maxShare then remove
        if (this.state.share === this.state.maxShare) {
            // remove
        } else {
            this.setState({ maxShare: this.state.maxShare - this.state.share });
            this.setQty();
        }
    }
    
    render() {
        return(
            <form id="register-form" method="post" onSubmit={this.handleSubmit}>
                <label>Ticker:</label>
                <input type="text" name="ticker" value={this.state.ticker} disabled></input>

                <label>Shares:</label>
                <input type="number" name="share" min="1" max={this.state.maxShare} onChange={e => this.setState({ share: e.target.value })} required></input>
                
                <br></br>
                
                <input type="submit" name="submit" value="Sell" />
            </form>
        );
    }
}

export default SellForm;
