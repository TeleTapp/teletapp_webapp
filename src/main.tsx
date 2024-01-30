import { Spinner } from "@nextui-org/spinner";
import { NextUIProvider } from "@nextui-org/system";
import i18n from "i18next";
import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";
import TelegramThemeProvider from "./components/providers/telegram-theme-provider";

import routes from "~react-pages";
import "./index.css";
import { resources } from "./locales";
import { authBot } from "./lib/api/auth-bot";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: import.meta.env.DEV,
  resources,
});

function AppRouter() {
  return <Suspense fallback={<Spinner />}>{useRoutes(routes)}</Suspense>;
}

function App() {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    authBot().then((res) => {
      console.log(res);

      setLoaded(true);
    });
  }, []);

  return (
    <div className="px-6 py-6 bg-background">
      {loaded ? <AppRouter /> : <Spinner />}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WebAppProvider
      options={{
        smoothButtonsTransition: true,
      }}
    >
      <TelegramThemeProvider>
        <I18nextProvider i18n={i18n}>
          <NextUIProvider>
            <Router>
              <App />
            </Router>
          </NextUIProvider>
        </I18nextProvider>
      </TelegramThemeProvider>
    </WebAppProvider>
  </React.StrictMode>
);
