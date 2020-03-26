import React from 'react';

const Support = () => (
    <div className="modal fade" id="support" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content bg-white">
                <div className="modal-header pb-1">
                    <button type="button" className="close position-absolute p-0 r-40 t-30" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title text-center">Contact Us</h4>
                </div>
                <div className="modal-body py-2">
                    <p className="mb-0">If you are facing any issues in completing the steps or have any kind of problem.<br /> Please contact us via email, send us a descriptive issue on <span className="h5 color-orange">dpeepsproject@gmail.com</span></p>
                </div>
                <div className="modal-footer justify-content-center">
                    <button type="button" className="btn btn-custom h-2 w-8" data-dismiss="modal">Okay</button>
                </div>
            </div>
        </div>
    </div>
)

export default Support;