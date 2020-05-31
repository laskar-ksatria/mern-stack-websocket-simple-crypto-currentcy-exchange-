import React from 'react';
import { store } from 'react-notifications-component';

import { buyOrder, sellOrder } from './function';

function PriceCard(props) {

    const [amount, setAmount] = React.useState("");

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const sendOrder = (type) => {
        if (type === 'buy') {
            buyOrder(`${props.symbol}`, amount, props[`${props.symbol}_marketPrice`])
                .then(data => {
                    store.addNotification({
                        title: "Wonderful!",
                        message: data.message,
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                          duration: 3000,
                        }
                      });
                      setAmount("")
                      props.getMyData();
                      props.getListMyOrder();
                })
                .catch(err => {
                    console.log(err);
                })
        }else if (type === 'sell') {
            sellOrder(`${props.symbol}/USDT`, amount, props[`${props.symbol}_marketPrice`])
                .then(data => {
                    store.addNotification({
                        title: "Wonderful!",
                        message: data.message,
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                          duration: 3000,
                        }
                      });
                      props.getMydata();
                      props.getListMyOrder();
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div style={{width: '300px',display: 'flex', flexDirection: 'column' ,height: '220px', background: 'white', border: '1px solid grey', borderRadius: '5px', boxShadow: '3px 6px #888888'}}>
                
        <div style={{boxSizing: 'border-box',padding: '5px 10px 0px 10px', width: '100%', height: '15px', display: 'flex', justifyContent: 'space-between'}}>
            <div style={{fontWeight: '600'}}>
                {props.symbol} - USD
            </div>
            <div style={{fontSize: 'smaller'}}>
            Vol: {props[`${props.symbol}_vol`]}
            </div>
        </div>
        
        <div style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '19px'}}>

            {props[`${props.symbol}_marketPrice`] ? 

                <p>$  <span style={{color: props[`${props.symbol}_css`].marketColor, fontWeight: '500'}}>
                    {props[`${props.symbol}_marketPrice`]}
                </span></p>
            
            : <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>}

        </div>


        <div style={{height: '15px',display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input value={amount} onChange={handleChange} style={{border: '1px solid whitesmoke',marginBottom: '2px'}} type="text" placeholder="Enter amount" />
        </div>


        <div style={{marginTop: '12px',padding: '0 10px 0 10px', marginBottom: '10px',display: 'flex', justifyContent: 'center'}}>
            <div onClick={() => sendOrder('buy')} style={{textDecoration: 'none', cursor: 'pointer', fontWeight: '600', color: 'green', marginRight: '70px'}}>Buy</div>
            <div onClick={() => sendOrder('sell')} style={{textDecoration: 'none', cursor: 'pointer', fontWeight: '600', color: 'red'}}>Sell</div>
        </div>


        <div style={{color: props[`${props.symbol}_css`].color,cursor: 'pointer',fontWeight: '500',background: props[`${props.symbol}_css`].background, height: '38px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            See detail
        </div>

    </div>
    )
};

export default PriceCard;