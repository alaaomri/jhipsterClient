import { NavItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const NotificationComponent = ({ notifcationsCount, notificationItems }) => (
  <NavItem>
    <a className="d-flex align-items-center nav-link">
      <FontAwesomeIcon icon="bell"/>
      <span className="badge bg-danger">
          {notifcationsCount}
      </span>
    </a>
  </NavItem>

);
