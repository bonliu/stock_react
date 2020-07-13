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
        };
    }

    componentDidMount() {
        this.setState({ email: this.props.location.state.email });

        this.getBalance()
            .then(currentBalance => this.setState({ balance: currentBalance }));
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
                email: this.props.location.state.email
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
                email: this.props.location.state.email,
                balance: p
            })
        });

        const data = await response.json();
        this.setState({ balance: data.balance });
    }

    buyStock = async p => {
        const response = await fetch('/api/stock/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                ticker: this.state.ticker,
                qty: this.state.qty,
                price: p
            })
        });

        const data = await response.json();
        console.log(data);
        return data.data;
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
                qty: parseInt(this.state.qty)
            })
        });
        const data = await response.json();
        console.log(data);
    }

    handleSubmit = async e => {
        e.preventDefault();
        // Find out if the user have the stock already
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
        const count = await data.count;

        // Update user's balance
        let price = '';
        try {
            price = await this.getCurrentPrice();
        } catch (err) {
            // console.log(err);
            alert('Invalid ticker');
        } finally {
            if (price !== '') {
                const cost = this.state.qty * price;
                if (cost > this.state.balance) {
                    alert('Insufficient balance');
                } else if (count === 0) {
                    // Buy
                    this.buyStock(price);
                    this.setBalance(this.state.balance - this.state.qty * price);
                } else {
                    // Update number of shares
                    this.setBalance(this.state.balance - parseInt(this.state.qty) * price);
                    const newQty = count + parseInt(this.state.qty);
                    this.setState({ qty: newQty });
                    this.setQty();
                    this.setPrice(price);
                    window.location.reload();
                }
            }
        }
    }

    render() {
        return (
            <div className='portfolio-ui'>
                <div className='rowC'>

                    <TickerList email={this.props.location.state.email} balance={this.state.balance} />

                    <div className='buyingForm'>
                        <p>Cash - {parseFloat(this.state.balance).toFixed(2)}</p>
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
