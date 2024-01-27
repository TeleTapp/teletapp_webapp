type CreateBotFormStep = "info" | "payments" | "categories" | "contacts";

type CreateBotFormContext = {
  isCreateForm?: boolean;
  info?: BotFormInfoContext;
  categories?: BotFormCategoriesContext;
  contacts?: BotFormContactsContext;
  payments?: BotFormPaymentsContext;
};

type BotFormInfoContext = {
  description?: string;
  image?: string | null;
};

type BotFormCategoriesContext = {
  products?: string[];
  selectedProducts?: string[];
  services?: string[];
  selectedServices?: string[];
};

type BotFormContactsContext = {
  whatsapp?: string;
  email?: string;
};

type BotFormPaymentsContext = {
  wallet?: boolean;
  cash?: boolean;
  cards?: boolean;
};
