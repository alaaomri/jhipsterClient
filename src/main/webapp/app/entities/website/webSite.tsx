import React from 'react';
import { connect } from 'react-redux';

export const WebSite = () => {

  return (
    <div>
      Hello Im WebSite
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WebSite);
