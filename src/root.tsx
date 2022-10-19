import { component$ } from '@builder.io/qwik';
import { QwikCity, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router_head';
import { Navbar } from './components/navbar';

import './global.css';

export default component$(() => {
  return (
    <QwikCity>
      <head>
        <meta charSet="utf-8" />
        <script src={import.meta.env.VITE_FONTAWESOME} crossOrigin="anonymous" />
        <RouterHead />
      </head>
      <body class="container m-auto font-sans" lang="es">
        <Navbar />
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCity>
  );
});
