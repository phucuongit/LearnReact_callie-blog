import React, {Component} from 'react';


class Contact extends Component {
    render() {
        return (
            <div>
                <div className="section-row">
                    <div className="section-title">
                        <h2 className="title">Contact Information</h2>
                    </div>
                    <p>Malis debet quo et, eam an lorem quaestio. Mea ex quod facer decore, eu nam mazim postea. Eu
                        deleniti pertinacia ius. Ad elitr latine eam, ius sanctus eleifend no, cu primis graecis
                        comprehensam eum. Ne vim prompta consectetuer, etiam signiferumque ea eum.</p>
                    <ul className="contact">
                        <li><i className="fa fa-phone"></i> 202-555-0194</li>
                        <li><i className="fa fa-envelope"></i> <a href="#">callie@email.com</a></li>
                        <li><i className="fa fa-map-marker"></i> 123 6th St.Melbourne, FL 32904</li>
                    </ul>
                </div>

                <div className="section-row">
                    <div className="section-title">
                        <h2 className="title">Mail us</h2>
                    </div>
                    <form>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input className="input" type="email" name="email" placeholder="Email"/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <input className="input" type="text" name="subject" placeholder="Subject"/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea className="input" name="message" placeholder="Message"></textarea>
                                </div>
                                <button className="primary-button">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Contact;