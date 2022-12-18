import React from 'react';
import Scroll_To_Top from './Scroll_To_Top';

function Footer(){
    return(
        <section>
            <div class="lfe_footer">
                <div class="col-11">
                </div>
                <div class="row">
                            <div class= "col">
                                <div className='col_footer'>
                                    <a href="www.livefromeurope.com">
                                        <img src="../icons/lfe.png" alt=""></img>
                                    </a>
                                </div>
                            </div>
                            <div class= "col">
                                <div className='col_footer'>
                                <a href="https://github.com/livefromeurope">
                                    <img src='https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo.png' />
                                </a>
                                </div>
                            </div>
                            
                            {/*
                            <div class= "col">
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