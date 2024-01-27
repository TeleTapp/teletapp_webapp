import { useEffect } from "react";
import { hex } from "color-convert";
import { useThemeParams } from "@vkruglikov/react-telegram-web-app";

function formatHSL(colors: number[]) {
  return `${colors[0]} ${colors[1]}% ${colors[2]}%`;
}

function applyStyle(style: Record<string, string | undefined>) {
  for (const [key, value] of Object.entries(style)) {
    value && document.body.style.setProperty(key, formatHSL(hex.hsl(value)));
  }
}

export default function TelegramThemeProvider({
  children,
}: React.PropsWithChildren) {
  const [schema, theme] = useThemeParams();

  useEffect(() => {
    if (schema === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    applyStyle({
      "--nextui-primary": theme.button_color,
      "--nextui-foreground": theme.text_color,
      "--nextui-background": theme.bg_color,
      "--nextui-secondary": theme.secondary_bg_color,
      "--nextui-secondary-foreground": theme.hint_color,
      "--nextui-default": theme.secondary_bg_color,
      "--nextui-default-50": theme.secondary_bg_color,
      "--nextui-default-100": theme.secondary_bg_color,
      "--nextui-default-200": theme.secondary_bg_color,
      "--nextui-default-foreground": theme.text_color,
      "--nextui-foreground-500": theme.hint_color,
    });

    theme.text_color &&
      document.body.style.setProperty("color", theme.text_color);
  }, [schema, theme]);

  return children;
}
