import { component$, Slot } from "@builder.io/qwik";
import Header from "~/components/header/header";
import { useLocation, routeLoader$ } from "@builder.io/qwik-city";
import { LangEnum } from "~/config/config";

export const useLoginStatus = routeLoader$(async ({ cookie }) => {
  return cookie.get("user")?.value
    ? JSON.parse(cookie.get("user")!.value)
    : null;
});

export const dictionary: Record<LangEnum, any> = {
  [LangEnum.EN]: { title: "HELLO" },
  [LangEnum.RU]: { title: "привет" },
  [LangEnum.UZ]: { title: "Salom" },
};

export default component$(() => {
  const location = useLocation();
  const user = useLoginStatus();
  const currentLang = location?.params?.lang as LangEnum;

  return (
    <div>
      <Header lang={currentLang} user={user} />
      <div class="container mx-auto flex min-h-[90vh] items-center justify-center">
        <Slot />
      </div>
    </div>
  );
});
