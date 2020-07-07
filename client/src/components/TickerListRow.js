import React from 'react';
import Popup from 'reactjs-popup';
import '../styles/TickerListRow.css';
// import SellForm from './SellForm';

class TickerListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            ticker: '',
            shares: 0,
            shareToSell: 1,
            maxShare: 1,
            price: 0
        }
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            email: this.props.email,
            ticker: this.props.ticker,
            shares: this.props.shares,
            shareToSell: 1,
            maxShare: this.props.shares,
            price: this.props.price
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.shares !== prevProps.shares) {
            this.setState({ shares: this.props.shares });
        }

        // if (this.state.maxShare !== prevProps.shares) {
        //     this.setState({ shares: this.state.maxShare });
        // }
    }
    
    handleOnClick() {
        console.log('Click');
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
        console.log(`shareToSell: ${this.state.shareToSell}`);
        const newBalance = (parseFloat(balance) + parseFloat(price) * parseFloat(this.state.shareToSell)).toFixed(2);
        console.log(`newBalance: ${newBalance}`);
        this.setBalance(newBalance);
        // if count == maxShare then remove
        if (this.state.shareToSell === this.state.maxShare) {
            // remove
        } else {
            this.setState({ maxShare: this.state.maxShare - this.state.shareToSell });
            this.setState({ shares: this.state.maxShare });
            this.setQty();
        }
        console.log('reload');
        window.location.reload();
    }


    
    render() {
        return (
            <tr id={this.props.ticker} className="table-row">
                <td className="table-item">
                    {this.state.ticker}
                </td>
                
                <td id="shares" className="table-item">
                    {this.state.shares}
                </td>

                <td id="price" className="table-item">
                    {this.state.price}
                </td>

                <td className="table-item">
                    <Popup trigger={<button>Sell</button>} >
                        {close => (
                            <div>
                                {/* <SellForm email={this.state.email} ticker={this.state.ticker} maxShare={this.state.shares} /> */}
                                <form id="register-form" method="post" onSubmit={this.handleSubmit}>
                                    <label>Ticker:</label>
                                    <input type="text" name="ticker" value={this.state.ticker} disabled></input>

                                    <label>Shares:</label>
                                    <input type="number" name="shareToSell" min="1" max={this.state.maxShare} onChange={e => this.setState({ shareToSell: e.target.value })} required></input>
                                    
                                    <br></br>
                                    
                                    <input type="submit" name="submit" value="Sell" />
                                </form>
                                <button onClick={close}>Cancel</button>
                            </div>
                        )}
                    </Popup> 
                    {/* <button className="btn btn-remove" onClick={this.handleOnClick}>
                        Sell
                    </button> */}
                </td>
            </tr>
        );
    }
}

export default TickerListRow;
