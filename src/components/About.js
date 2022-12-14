import React, {useState} from 'react';
import About_Text from './text/about_text';
import Policy_Text from './text/policy_text';

function About(){

    const [show_policy, setShowPolicy] = React.useState(false);
    const [show_about, setShowAbout] = React.useState(false);
    const [show_contact, setShowContact] = React.useState(false);

    return(

        


        <section>



            <div class= "container">
            <p>
            <div >
                        <img width="200px" src="./icons/lfe.png"></img>
                    </div>
                    
                    </p>
        <p>
        {!show_contact && !show_policy &&
            <button type='button' onClick=
                                {
                                    ()=>{
                                        if(show_about){setShowAbout(false)}else{setShowAbout(true)}
                                    }
                                }
            class="btn btn-md btn-outline btn-primary">About
            </button>
        }
        </p>
        <p>
        {!show_about && !show_contact &&
            <button type='button' onClick=
                                {
                                    ()=>{
                                        if(show_policy){setShowPolicy(false)}else{setShowPolicy(true)}
                                    }
                                }
            class="btn btn-md btn-outline btn-primary">Policies / Data Protection
            </button>
        }
        </p>
        <p>
        {!show_about && !show_policy &&
            <button type='button' onClick=
                                {
                                    ()=>{
                                        if(show_contact){setShowContact(false)}else{setShowContact(true)}
                                    }
                                }
            class="btn btn-md btn-outline btn-primary">Contact
            </button>
        }
        </p>
                
        <div class= "about">
            <p></p>
        {show_about&& <div>
            <About_Text/>
        </div>
        }
        {show_policy && <div>
            <Policy_Text/>
        </div>
        }

        {show_contact&&<div>

                        <h1>Contact</h1>
                        <p>
                        You can reach us using the following contact details:
                        </p>
                        <p>
                        <a href="mailto:livefromeurope@outlook.com">livefromeurope@outlook.com</a>
                        </p>
                        
            </div>}
        
            </div>
            </div>


        
        </section>
    );
}

export default About;