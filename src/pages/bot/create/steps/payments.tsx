import { Form } from "@/components/ui/form";
import { FormCheckbox } from "@/components/ui/form/form-checkbox";
import { MainButton, BackButton } from "@vkruglikov/react-telegram-web-app";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const context = useOutletContext<CreateBotFormContext>();

  const methods = useForm<BotFormPaymentsContext>({
    defaultValues: {
      ...context.payments,
    },
  });

  const onSubmit = useCallback((data: BotFormPaymentsContext) => {
    context.payments = data;
    console.log(data);

    navigate("/bot/create/steps/contacts");
  }, []);

  return (
    <>
      <BackButton onClick={() => navigate("/bot/create/steps/categories")} />
      <MainButton
        text={t("common.continue").toUpperCase()}
        onClick={() => methods.handleSubmit(onSubmit)()}
      />

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>{t("screens.bot.create.payments.title")}</div>
          <div className="mt-8 space-y-1">
            <div>
              <FormCheckbox
                name="wallet"
                label="Telegram Wallet"
                color="primary"
              />
            </div>

            <div>
              <FormCheckbox
                name="cash"
                label={t("screens.bot.create.payments.cash")}
              />
            </div>

            <div>
              <FormCheckbox
                name="cards"
                label={t("screens.bot.create.payments.cards")}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
