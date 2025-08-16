import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            Copyright © {(new Date().getFullYear())} <a href="https://amitpnk.github.io">amitpnk</a>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-right">
                            Powered by amitpnk
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
