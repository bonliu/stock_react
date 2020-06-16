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
            ticker: ''
        }
    }

    componentDidMount() {
        // Load user's stock and price
        this.setState({ email: this.props.email });
    }

    // componentDidUpdate() {
    //     // Load user's updated stock and price
    // }

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
                            <input type="text" id="ticker" name="ticker" placeholder="Ticker" onChange={e => this.setState({ ticker: e.target.value })} />
                            <br></br>
                            <input type="text" id="shares" min="0" placeholder="Qty" />
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
