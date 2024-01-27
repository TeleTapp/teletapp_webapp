import Plus from "@/assets/icons/plus.svg?react";
import { Form } from "@/components/ui/form";
import { FormTextarea } from "@/components/ui/form/form-textarea";
import { MainButton, BackButton } from "@vkruglikov/react-telegram-web-app";
import { Button } from "@nextui-org/button";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const context = useOutletContext<CreateBotFormContext>();

  const methods = useForm<BotFormInfoContext>({
    defaultValues: {
      ...context.info,
    },
  });

  const onSelectFile = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const file = e.currentTarget.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        Telegram.WebApp.showAlert("invalid file format");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        methods.setValue("image", reader.result as string);
      };
    },
    []
  );

  const onSubmit = useCallback((data: BotFormInfoContext) => {
    context.info = data;
    console.log(data);

    navigate("/bot/create/steps/categories");
  }, []);

  const image = methods.watch("image");

  return (
    <>
      <BackButton onClick={() => navigate("/bot/create")} />
      <MainButton
        text={t("common.continue").toUpperCase()}
        onClick={() => methods.handleSubmit(onSubmit)()}
      />

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>{t("screens.bot.create.info.title")}</div>

          <Button
            className="mt-8 w-full h-auto text-base bg-cover bg-center aspect-[342/120]"
            type="button"
          >
            <div className="absolute flex flex-col justify-center items-center w-full h-full">
              {image ? (
                <img src={image} className="block w-full h-full object-cover" />
              ) : (
                <>
                  <Plus />
                  <span>{t("screens.bot.create.info.addImage")}</span>
                </>
              )}
            </div>

            <input
              type="file"
              className="cursor-pointer absolute block opacity-0 w-full h-full"
              onChange={onSelectFile}
              accept="images/*"
            />
          </Button>

          {image && (
            <Button
              fullWidth
              className="mt-4 h-10 font-medium text-base relative"
              type="button"
            >
              {t("screens.bot.create.info.editImage")}
              <input
                type="file"
                className="cursor-pointer absolute block opacity-0 w-full h-full"
                onChange={onSelectFile}
                accept="images/*"
              />
            </Button>
          )}

          <FormTextarea
            itemClassName="mt-8"
            name="description"
            label={t("screens.bot.create.info.descriptionLabel")}
            placeholder={t("screens.bot.create.info.descriptionPlaceholder")}
            minRows={4}
            maxRows={8}
          />
        </form>
      </Form>
    </>
  );
}
