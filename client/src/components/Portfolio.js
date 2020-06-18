import React from 'react';
import '../styles/Portfolio.css';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            balance: '',
            profit: '',
            stocks: [],
            ticker: '',
            qty: 0
        }
    }

    componentDidMount() {
        // Load user's stock and price
        this.setState({ email: this.props.email });
        // Extract user's stock
        // Update user's stock value (total asset)
    }

    // componentDidUpdate() {
    //     // Load user's updated stock and price
    // }

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
    }

    // TODO: Get balance
    // TODO: Update balance
    // TODO: Get current price (for stock)


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
            this.buyStock();
        } else {
            console.log('In Progress....');
            const newQty = data.count + parseInt(this.state.qty);
            this.setState({ qty: newQty });
            this.updateQty();
        }
    }

    render() {
        return (
            <div className='portfolio-ui'>
                <div className='rowC'>

                    <div className='stockTable'>
                        <h2>Portfolio {this.state.profit}</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Ticker</th>
                                    <th>Number of shares</th>
                                    <th>Buy at</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.stocks.map((item) => {
                                    return (
                                        <tr key={item.ticker}>
                                            <td>{item.ticker}</td>
                                            <td>{item.shares}</td>
                                            {/* <td>{item.currentPrice}</td> */}
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className='buyingForm'>
                        <p>Cash - {this.state.balance}</p>
                        <form onSubmit={this.handleSubmit}>
                            <input type="text" id="ticker" name="ticker" placeholder="Ticker"
                                    onChange={e => this.setState({ ticker: e.target.value })} />
                            <br></br>
                            <input type="number" id="shares" min="1" placeholder="Qty"
                                    onChange={e => this.setState({ qty: e.target.value })} />
                            <br></br>
                            <input type="submit" value="Buy" />
                        </form>
                    </div>
                </div>

            </div>
            // <h1>Hello, {this.state.email}</h1>
        );
    }
}

export default Portfolio;
