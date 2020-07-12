import React from 'react';

export default function Button(props) {
    return (
        <button
            className="btn btn-block btn-outline-light border py-4 h-100 socialBtn"
            type="button"
            disabled={!(props.nextBtnStatus === 'Twitter')}
        >   
            <p className='warning'style={{color: 'black', position: 'absolute', top: 0, right: '20px'}}>+<span> 100 RIX</span></p>
            <img className="icon mb-3" src="assets/img/arisen/twitter.png" alt="twitter" />
            <span className="h6 mb-0 d-block">Login w/ Twitter</span>
            {(props.twitStatus) && <p className="h6 mt-2 mb-0 color-grey">Logged in</p>}
        </button>
    )
}