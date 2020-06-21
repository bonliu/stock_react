import React from 'react';
import '../styles/TickerList.css';

import TickerListRow from './TickerListRow';

class TickerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            stocks: [],
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

    componentDidMount() {
        console.log(this.props);
        this.setState({ email: this.props.email });
        this.getTickerList()
            .then(res => this.setState({ stocks: res }));
    }

    componentDidUpdate(prevProps) {
        if (this.props.balance !== prevProps.balance) {
            this.getTickerList()
                .then(res => this.setState({ stocks: res }));
        }
    }

    render() {
        return (
            <div className='stockTable'>
                <h2>Portfolio {this.state.profit}</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Number of shares</th>
                            {/* <th>Buy at</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.stocks.map(item => (
                            <TickerListRow key={item.ticker} ticker={item.ticker} shares={item.count} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default TickerList;
