import React from 'react';
import { Translate } from 'react-jhipster';

import { NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';


export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/all_in_one.png" alt="Logo"/>
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <Translate contentKey="global.title">All In One</Translate>
    </span>
  </NavbarBrand>
);
