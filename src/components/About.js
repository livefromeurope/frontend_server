import React, { useState } from 'react';
import About_Text from './text/about_text';
import Policy_Text from './text/policy_text';

function About() {
    const [show_policy, setShowPolicy] = React.useState(false);
    const [show_about, setShowAbout] = React.useState(false);
    const [show_contact, setShowContact] = React.useState(false);

    return (
        <section>
            <div className="container">
                <div>
                    <img width="200px" src="./icons/lfe.png" alt="lfe-icon" />
                </div>

                <div>
                    {!show_contact && !show_policy &&
                        <button type='button' onClick={() => setShowAbout(!show_about)} className="btn btn-md btn-outline btn-primary">About</button>
                    }
                </div>
                <div>
                    {!show_about && !show_contact &&
                        <button type='button' onClick={() => setShowPolicy(!show_policy)} className="btn btn-md btn-outline btn-primary">Policies / Data Protection</button>
                    }
                </div>
                <div>
                    {!show_about && !show_policy &&
                        <button type='button' onClick={() => setShowContact(!show_contact)} className="btn btn-md btn-outline btn-primary">Contact</button>
                    }
                </div>

                <div className="about">
                    {show_about && <About_Text />}
                    {show_policy && <Policy_Text />}
                    {show_contact &&
                        <div>
                            <h1>Contact</h1>
                            <p>You can reach us using the following contact details:</p>
                            <p><a href="mailto:livefromeurope@outlook.com">livefromeurope@outlook.com</a></p>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default About;
