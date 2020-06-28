import React from 'react';
import '../styles/TickerList.css';

import TickerListRow from './TickerListRow';

class TickerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            stocks: [],
            profit: 0,
            balance: 0
        }
    }
    
    getTickerList = async () => {
        const response = await fetch('/api/stocks/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.props.email
            })
        });

        const data = await response.json();
        console.log(data);
        return data.data;
    }

    setProfit = async tickerList => {
        let p = 0;
        tickerList.forEach(stock => {
            p += stock.price * stock.count;
        });
        this.setState({ profit: p });
        console.log(`Profit: ${this.state.profit}`);
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({ email: this.props.email });
        this.getTickerList()
            .then(res => {
                this.setState({ stocks: res });
                console.log(this.state.stocks);
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.balance !== prevProps.balance) {
            this.getTickerList()
                .then(res => {
                    this.setState({ stocks: res })
                    this.setProfit(res);
                });
        }
    }

    render() {
        return (
            <div className='stockTable'>
                <h2>Portfolio $ {this.state.profit}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Number of shares</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.stocks.map(item => (
                            <TickerListRow key={item.ticker} ticker={item.ticker} shares={item.count} price={item.price} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default TickerList;
