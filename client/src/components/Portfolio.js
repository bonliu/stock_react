import React from 'react';
import '../styles/Portfolio.css';

import TickerList from './TickerList';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            balance: 0,
            profit: '',
            stocks: [],
            ticker: '',
            qty: 0
        }
    }

    componentDidMount() {
        // Load user's stock and price
        this.setState({ email: this.props.email });
        this.getBalance()
            .then(res => this.setState({ balance: res }));

        // Update user's stock value (total asset)
    }

    buyStock = async () => {
        const response = await fetch('/api/stock/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                ticker: this.state.ticker,
                qty: parseInt(this.state.qty)
            })
        });

        const data = await response.json();
        console.log(data);
        return data.data;
    }

    updateQty = async () => {
        const response = await fetch('/api/stock/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                ticker: this.state.ticker,
                qty: parseInt(this.state.qty)
            })
        });

        const data = await response.json();
        console.log(data);
        // return data.data;
    }

    // TODO: Get balance
    getBalance = async e => {
        const response = await fetch('/api/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.props.email
            })
        });

        const data = await response.json();
        return parseFloat(data.balance / 100);
    }
    // TODO: Update balance
    // TODO: Get current price (for stock)
    getCurrentPrice = async () => {
        const iex_token = 'pk_b13cf33210f742ffb6860aa0f6ade3b0';
        let api = 'https://cloud.iexapis.com/stable/stock/TICKER/quote?token=TOKEN&filter=symbol,latestPrice,change';
        api = api.replace('TICKER', this.state.ticker).replace('TOKEN', iex_token);
        const response = await fetch(api);
        const data = await response.json();
        console.log(data);
        this.updatePrice(data.latestPrice);
    }

    updatePrice = async p => {
        const response = await fetch('/api/stock/update/price', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                price: parseInt(p*100),
                email: this.state.email,
                ticker: this.state.ticker
            })
        });

        const data = await response.json();
        console.log(data);
    }


    handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/api/stock/count', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                ticker: this.state.ticker
            })
        });

        const data = await response.json();
        console.log(data);
        if (data.count === 0) {
            this.buyStock()
                .then(res => {
                    // this.setState({stocks: this.state.stocks.concat([res])});
                    this.setState({balance: this.state.balance + 1});
                    console.log(this.state.stocks);
                    this.getCurrentPrice();
                    // console.log(this.state.ticker);
                });
                // .then(() => this.getCurrentPrice());
        } else {
            const newQty = data.count + parseInt(this.state.qty);
            this.setState({ qty: newQty });
            this.updateQty()
                .then(() => {
                    // document.getElementById('form').reset();
                    this.setState({ qty: 0 })
                    this.setState({balance: this.state.balance + 1});
                });
        }
    }

    render() {
        return (
            <div className='portfolio-ui'>
                <div className='rowC'>

                    <TickerList email={this.props.email} balance={this.state.balance} />

                    <div className='buyingForm'>
                        <p>Cash - {this.state.balance}</p>
                        <form id="form" onSubmit={this.handleSubmit}>
                            <input type="text" id="ticker" name="ticker" placeholder="Ticker"
                                    value={this.state.ticker}
                                    onChange={e => this.setState({ ticker: e.target.value })}
                                    required />
                            <br></br>
                            <input type="number" id="shares" min="1" placeholder="Qty"
                                    value={this.state.qty}
                                    onChange={e => this.setState({ qty: e.target.value })} 
                                    required />
                            <br></br>
                            <input type="submit" value="Buy" />
                        </form>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Portfolio;
