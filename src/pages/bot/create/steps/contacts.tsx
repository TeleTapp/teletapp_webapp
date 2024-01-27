import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/form/form-input";
import { MainButton, BackButton } from "@vkruglikov/react-telegram-web-app";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const context = useOutletContext<CreateBotFormContext>();

  const methods = useForm<BotFormContactsContext>({
    defaultValues: {
      ...context.contacts,
    },
  });

  const onSubmit = useCallback((data: BotFormContactsContext) => {
    context.contacts = data;

    const app = Telegram.WebApp;
    app.disableClosingConfirmation();
    app.close();
  }, []);

  return (
    <>
      <BackButton onClick={() => navigate("/bot/create/steps/payments")} />
      <MainButton
        text={t("common.continue").toUpperCase()}
        onClick={() => methods.handleSubmit(onSubmit)()}
      />

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>{t("screens.bot.create.contacts.title")}</div>

          <FormInput
            itemClassName="mt-8"
            name="whatsapp"
            label="Whatsapp"
            placeholder="@nickname"
            size="md"
          />

          <FormInput
            itemClassName="mt-8"
            name="email"
            label={t("screens.bot.create.contacts.emailLabel")}
            placeholder="email"
            type="email"
            size="md"
          />
        </form>
      </Form>
    </>
  );
}
