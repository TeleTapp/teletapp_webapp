export type BotAuthResponse = {
  accessToken: string;
  refreshToken: string;
  expires: number;
  id: string;
};

export async function authBot(): Promise<BotAuthResponse> {
  return fetch("/api/bot/auth", {
    method: "POST",
    body: Telegram.WebApp.initData,
  }).then((r) => r.json());
}
