import React from 'react';

const Help = () => (
    <div className="modal fade" id="help" role="dialog">
        <div className="modal-dialog" style={{maxWidth:650}}>
            <div className="modal-content bg-white">
                <div className="modal-header pb-1 b-1">
                    <button type="button" className="close position-absolute p-0 r-40 t-30" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title text-left">Air-Drop Help Section <br/><p className="h6 c-red">All the steps and fields are mandatory and User only have 30 minutes to complete all the steps.</p></h4> 
                </div>
                <div className="modal-body py-1">
                    <div className="py-2 pl-3 pr-3">
                        <p className="h5 mt-2 mb-2"> Join The Revolution (Step-1)</p>
                        <p className="mb-0 fs-1">1. User have to login with all four platforms serially (Facebook -> Twitter -> Google).</p>
                        <p className="mb-0 fs-1">2. User have to Join our Telegram Community after logged in with the platforms given above.</p>
                        <p className="mb-0 fs-1">3. If User successfully done given steps then press Next button to proceed further.</p>
                        <p className="mb-0 fs-1 h6 color-orange">Important:- Make sure your browser don't block our platform's Popup.</p>
                    </div>
                    <div className="py-2 pl-3 pr-3">
                        <p className="h5 mt-2 mb-2"> Get Linked (Step-2)</p>
                        <p className="mb-0 fs-1">1. After successfully done "Join The Revolution" step then user have to Like Arisen's Facebook page.</p>
                        <p className="mb-0 fs-1">2. After Facebook, User have to Follow Arisen on Twitter.</p>
                        {/* <p className="mb-0 fs-1">3. After Twitter, User have to Follow Arisen on Instagram.</p> */}
                        <p className="mb-0 fs-1">3. After Twitter, User have to Subscribe Arisen Youtube Channel.</p>
                        <p className="mb-0 fs-1 h6 color-orange">Important:- These all should be done with the accounts which user logged in Air-Drop Setup.</p>
                    </div>
                    <div className="py-2 pl-3 pr-3">
                        <p className="h5 mt-2 mb-2"> Share The Revolution (Step-3)</p>
                        <p className="mb-0 fs-1">1. After successfully done "Get Linked" step then user have to Share pre-written post on Facebook.</p>
                        <p className="mb-0 fs-1">2. After Facebook, User have to Tweet pre-written message on Twitter</p>
                        <p className="mb-0 fs-1 h6 color-orange">Important:- These all should be done with the accounts which user already logged in.</p>
                    </div>
                    <div className="py-2 pl-3 pr-3">
                        <p className="h5 mt-2 mb-2"> Your PeepsID (Step-4)</p>
                        <p className="mb-0 fs-1">1. After successfully done "Share The Revolution" step then user have to enter Arisen Account to recieve bonus RIX.</p>
                        <p className="mb-0 fs-1">2. If user don't have Arisen Account then user can create one by clicking on SIGNUP button and enter account name in the given field.</p>
                        <p className="mb-0 fs-1">3. After entering Arisen Account then press Next button to proceed Transaction, this may take a while to complete it.</p>
                    </div>
                    <div className="py-2 pl-3 pr-3">
                        <p className="h5 mt-2 mb-2"> You Got Coins</p>
                        <p className="mb-0 fs-1">This screen Appears when the transaction is completed successfully and you can check your transaction from here also.</p>
                    </div>
                </div>
                <div className="modal-footer justify-content-center">
                    <button type="button" className="btn btn-custom h-2 w-8" data-dismiss="modal">Okay</button>
                </div>
            </div>
        </div>
    </div>
)

export default Help;