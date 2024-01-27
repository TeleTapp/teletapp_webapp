import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function Page() {
  const [context] = useState<CreateBotFormContext>(() => ({
    isCreateForm: true,
  }));

  useEffect(() => {
    const app = Telegram.WebApp;
    app.enableClosingConfirmation();
    return () => app.disableClosingConfirmation();
  }, []);

  return (
    <AnimatePresence>
      <Outlet context={context} />
    </AnimatePresence>
  );
}
