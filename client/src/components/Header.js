import React from 'react';
import Auth from '../Auth';
import { useHistory } from 'react-router-dom'

function Header() {

    let history = useHistory();

    const onLogout = () => {
        Auth.onLogout(() => {
            history.push('/')
        })
    }

    return (
        <div style={styles.header}>
            <div style={{ height: '100%', width: '8%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <h4 style={{cursor: 'pointer'}} onClick={onLogout}>Logout</h4>
            </div>
        </div>
    )
};

const styles = {
    header: {
        width: '100%',
        height: '70px',
        backgroundColor: '#313131',
        display: 'flex',
        flexDirection: 'row-reverse',
        color: 'white',
        
    }
}

export default Header;