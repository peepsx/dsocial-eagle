import React, { useState } from 'react';

export default function Button(props) {
    console.log('props value',props)
    const [click,changeClick] = useState(false);
    return (
        <button
            className="btn btn-block btn-outline-light border py-4 h-100"
            type="button"
            disabled={!(props.nextBtnStatus === 'Twitter') || click}
            onClick={()=> changeClick(true)}
        >
            <img className="icon mb-3" src="assets/img/arisen/twitter.png" alt="twitter" />
            <span className="h6 mb-0 d-block">Twitter</span>
            {(props.twitStatus) && <p className="h6 mt-2 mb-0 color-grey">Logged in</p>}
        </button>
    )
}