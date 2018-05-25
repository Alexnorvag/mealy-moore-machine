import React from 'react';

import Header from '../Commons/Header';
import Footer from '../Commons/Footer';

export const Root = props => (
    <React.Fragment>
    <Header />
    {props.children}
    <Footer />
    </React.Fragment>
);