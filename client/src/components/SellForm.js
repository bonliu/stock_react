import React from 'react';

class SellForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ticker: '',
            share: 1,
            maxShare: 1
        };
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            ticker: this.props.ticker,
            maxShare: this.props.maxShare
        })
    }

    handleSubmit = async e => {
        e.preventDefault();
        console.log('Sell');
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
