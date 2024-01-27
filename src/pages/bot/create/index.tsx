import { MainButton } from "@vkruglikov/react-telegram-web-app";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Page() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <MainButton
        text={t("screens.bot.create.welcome.button").toUpperCase()}
        onClick={() => navigate("/bot/create/steps/info")}
      />

      <div className="font-bold text-3xl">
        {t("screens.bot.create.welcome.title", { bot: "@bot" })}
      </div>
      <div className="mt-3">{t("screens.bot.create.welcome.description")}</div>
      <div className="mt-8">
        <Step number={1}>{t("screens.bot.create.welcome.step1")}</Step>
        <Step number={2}>{t("screens.bot.create.welcome.step2")}</Step>
        <Step number={3}>{t("screens.bot.create.welcome.step3")}</Step>
        <Step number={4}>{t("screens.bot.create.welcome.step4")}</Step>
      </div>
    </>
  );
}

function Step({
  number,
  children,
}: React.PropsWithChildren<{ number: number }>) {
  return (
    <div className="flex mt-4">
      <div className="bg-secondary w-8 h-8 rounded-lg text-xl font-medium flex items-center justify-center">
        {number}
      </div>
      <div className="ml-4 pt-1.5 text-sm">{children}</div>
    </div>
  );
}
