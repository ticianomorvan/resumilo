import { component$ } from '@builder.io/qwik';
import { QwikCity, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import Navbar from './components/navbar/navbar';

import './global.css';

export default component$(() => {
  return (
    <QwikCity>
      <head>
        <meta charSet="utf-8" />
        <RouterHead />
      </head>
      <body lang="es">
        <Navbar />
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCity>
  );
});
