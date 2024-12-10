import React, {lazy} from 'react';
import Routes from './routes';
import {BrowserRouter, Router} from 'react-router-dom';
import i18n from 'i18n';

import ENlanguages from './definitions/translations/en.json';
import ARlanguages from './definitions/translations/ar.json';

i18n.addResourceBundle('en', 'translation', ENlanguages, true);
i18n.addResourceBundle('ar', 'translation', ARlanguages, true);

function WorkOrder() {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
}

export default WorkOrder;
