import React from 'react';
import Scroll_To_Top from './Scroll_To_Top';

function Footer(){
    return(
        <section>
            <div className="lfe_footer">
                <div className="col-11">
                </div>
                <div className="row">
                            <div className= "col">
                                <div className='col_footer'>
                                    <a href="/">
                                        <img src="../icons/lfe.png" alt=""></img>
                                    </a>
                                </div>
                            </div>
                            <div className= "col">
                                <div className='col_footer'>
                                <a href="https://github.com/livefromeurope">
                                    <img src='https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo.png' />
                                </a>
                                </div>
                            </div>

                            {/*
                                <div className= "col">
                                    <div className='col_footer'>
                                    <a >
                                        <Scroll_To_Top/>
                                    </a>
                                    </div>
                                </div>
                            */}
                </div>
                </div>
            
        </section>
    );
}

export default Footer;