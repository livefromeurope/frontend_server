import React, {useState} from 'react';

function About(){

    const [show_policy, setShowPolicy] = React.useState(false);
    const [show_about, setShowAbout] = React.useState(false);
    const [show_contact, setShowContact] = React.useState(false);

    return(

        


        <section>



            <div class= "container">
            <p>
            <div >
                        <img width="200px" src="/lfe.png"></img>
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
        <h1>About</h1>
        <p>
        1. <strong>livefromeurope:</strong> is a place for young and critical minds who want europe to evolve in a bright and social future. 
        the main goal for livefromeurope is to get informed about different european countries their local habits, events, politics, jokes or opinions. 
        </p>
        <p>
        the more we know about each other the more we will approach and understand each other.
        
        </p>
        <p>
        2.<strong> livefromeurope:</strong> out of historic learnings – europe must be a positive example for democracy, social structures, innovative economics, 
        the environment, working immigration and transnational cooperation.
        </p>
        <p>
        3.<strong> livefromeurope:</strong> can be seen as a tiny partisanian webapp – opposing the big, data collecting tech giants.
        </p>
        <p>
        4.<strong> livefromeurope:</strong> is hosted in europe. livefromeurope doesn`t collect any data, it is merely here to inform and entertain.
        </p>
        <p>
        5.<strong> livefromeurope:</strong> is open source: https://github.com/livefromeurope.
        <p >
        <a href="https://github.com/livefromeurope">
            <img width="200px"  src='https://miro.medium.com/max/1400/0*c43pw7UiQgpfjDCl.jpg' />
        </a>
        </p>
        </p>
        <p>
        <h1>Current Mission:</h1>
        </p>
        <p>
        livefromeurope is currently implementing the activitypub protocol to be part of a decentralized network of social media platforms.
        </p>
        </div>
        }
        {show_policy && <div>
            <p>
            <h1>Policies</h1>
            </p>
            <p>
            <strong>POLICIES</strong>: at livefromeurope we condemn hate speech, discrimination, racism or any political far-right or far-left opinions.
            </p>
            <p><strong>CONTENT</strong>: links to or images embedded from external, or third party web-sites, are provided solely for visitors convenience. 
            livefromeurope accepts no liability for any linked sites or their content.
            </p>
            <p>
            Any material you send or post to this Website shall be considered non-proprietary and not confidential.
            </p>
            <p>
            When using this website you shall not post or send to or from this Website any material for which you have not obtained all necessary consents, 
            is discriminatory, obscene, pornographic, defamatory, liable to incite racial hatred, in breach of confidentiality or privacy, 
            which may cause annoyance or inconvenience to others, which encourages or constitutes conduct that would be deemed a criminal offence, 
            give rise to a civil liability.
            </p>
            <p>
            <h1>Data Protection</h1>
            </p>
            <p>
            <strong>Duty to provide information about data protection</strong></p>
            <p>
            The protection of your personal data is very important to us and to a modern european union. 
            We therefore process your data exclusively on the basis of the legal provisions (GDPR, TKG 2003). 
            In this data protection information we inform you about the most important aspects of data processing on this website.
            </p>
            <p>
            When you visit our website, your IP address, start and end of the session are recorded for the duration of this session. 
            This is due to technical reasons and therefore represents a legitimate interest within the meaning of Art 6 (1) (f) GDPR. 
            Unless otherwise regulated below, we will not process this data further.
            </p>
            <p>
            <strong>Cookies</strong></p>
            <p>Our website uses so-called cookies. These are small text files that are stored on your device using the browser. They do no harm.
            </p>
            <p>We use cookies to make our site user-friendly. Some cookies remain on your device until you delete them. 
            They enable us to recognize your browser the next time you visit and help us to load our page faster.
            </p>
            <p>
            If you do not want this, you can set up your browser so that it informs you about the setting of cookies and you only allow this in individual cases.
            </p>
            <p>
            If cookies are deactivated, the functionality of our website may be restricted.
            </p>
            <p>
            <strong>Web analysis</strong>
            </p>
            <p>Our website uses functions of the web analysis service google analytics / monsterinsides. 
            Cookies are used for this purpose, which enable an analysis of the use of the website by your users. 
            The information generated in this way is transferred to the provider`s server and stored there.
            </p>
            <p>
            You can prevent this by setting up your browser so that no cookies are saved.
            </p>
            <p>
            Data processing takes place on the basis of the legal provisions of Section 96 (3) TKG and Art 6 (1) lit a (consent) and / or f (legitimate interest) of the GDPR.
            </p>
            <p>
            Our concern within the meaning of the GDPR (legitimate interest) is the improvement of our offer and our website. Since the privacy of our users is important to us, 
            the user data is pseudonymized.
            </p>
            <p>
            <strong>Your rights</strong></p>
            <p>You have the right to information, correction, deletion, restriction, data portability, revocation and objection regarding data stored by us. 
            If you believe that the processing of your data violates data protection law or your data protection claims have otherwise been violated in any way, you can complain to us  
            <a href="mailto:livefromeurope@outlook.com">livefromeurope@outlook.com</a>.
            </p>

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