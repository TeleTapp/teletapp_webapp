import Plus from "@/assets/icons/plus.svg?react";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/form/label";
import { MainButton, BackButton } from "@vkruglikov/react-telegram-web-app";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useCallback, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Page() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const context = useOutletContext<CreateBotFormContext>();

  const methods = useForm<BotFormCategoriesContext>({
    defaultValues: {
      products: ["Люстры", "Коляски"],
      selectedProducts: [],
      services: [],
      selectedServices: [],
      ...context.categories,
    },
  });

  const onSubmit = useCallback((data: BotFormCategoriesContext) => {
    context.categories = data;
    console.log(data);

    navigate("/bot/create/steps/payments");
  }, []);

  return (
    <>
      <BackButton onClick={() => navigate("/bot/create/steps/info")} />
      <MainButton
        text={t("common.continue").toUpperCase()}
        onClick={() => methods.handleSubmit(onSubmit)()}
      />

      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div>{t("screens.bot.create.categories.title")}</div>

          <ProductCategories
            dataKey="products"
            selectDataKey="selectedProducts"
            inputPlaceholder={t(
              "screens.bot.create.categories.inputPlaceholder"
            )}
          >
            {t("screens.bot.create.categories.categories")}
          </ProductCategories>
        </form>
      </Form>
    </>
  );
}

function ProductCategories({
  children,
  dataKey,
  selectDataKey,
  inputPlaceholder,
}: React.PropsWithChildren<{
  dataKey: keyof BotFormCategoriesContext;
  selectDataKey: keyof BotFormCategoriesContext;
  inputPlaceholder: string;
}>) {
  const { t } = useTranslation();
  const { setValue, watch } = useFormContext<BotFormCategoriesContext>();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");

  const selected = watch(selectDataKey) as string[];
  const all = watch(dataKey) as string[];

  const addTag = useCallback(() => {
    const value = text.trim();
    if (value.length > 0) {
      setValue(dataKey, Array.from(new Set([...all, value])));
      setValue(selectDataKey, Array.from(new Set([...selected, value])));
      setText("");
      setEdit(false);
    }
  }, [text]);

  return (
    <>
      <Label className="mt-8" asChild>
        <div>{children}</div>
      </Label>

      <div className="flex flex-wrap">
        {all.map((i) => (
          <Button
            key={i}
            variant="flat"
            color={selected.includes(i) ? "primary" : "default"}
            className="rounded-[32px] h-8 mr-2 mt-2 max-w-72"
            onClick={() => {
              setValue(
                selectDataKey,
                selected.includes(i)
                  ? selected.filter((p) => i !== p)
                  : [...selected, i]
              );
            }}
          >
            <span className="text-ellipsis overflow-hidden">{i}</span>
          </Button>
        ))}
      </div>

      {edit ? (
        <Input
          className="mt-6"
          placeholder={inputPlaceholder}
          value={text}
          autoFocus
          classNames={{
            input: "text-base",
            inputWrapper: "h-10",
          }}
          onChange={(e) => setText(e.target.value)}
          endContent={
            <Button
              color="primary"
              isIconOnly
              className="-mr-2 mt-0.5"
              size="sm"
              variant={!text.trim().length ? "flat" : "solid"}
              disabled={!text.trim().length}
              onClick={addTag}
            >
              <Plus />
            </Button>
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
      ) : (
        <Button
          fullWidth
          className="mt-6 h-10 font-medium text-base "
          onClick={() => setEdit(true)}
          type="button"
        >
          <Plus />
          <span>{t("common.add")}</span>
        </Button>
      )}
    </>
  );
}
