import { component$, $, Signal } from "@builder.io/qwik";
import LinkHref from "~/components/link-href";
import { LangEnum } from "~/config/config";
import { useNavigate, useLocation } from "@builder.io/qwik-city";
import HeaderProfile from "~/components/header/header-profile";
import Select from "~/components/select";

interface HeaderDic {
  signIn: string;
  signUp: string;
}

export const headerDic: Record<LangEnum, HeaderDic> = {
  [LangEnum.EN]: {
    signIn: "Sign In",
    signUp: "Sign Up",
  },
  [LangEnum.RU]: {
    signIn: "Логин",
    signUp: "Регистрация",
  },
  [LangEnum.UZ]: {
    signIn: "Kirish",
    signUp: "Ro'yxatdan O'tish",
  },
};

interface Prop {
  lang: LangEnum;
  user: Readonly<Signal<{ [p: string]: any }>>;
}

export default component$(({ lang, user }: Prop) => {
  const dic = headerDic[lang];
  const location = useLocation();
  const navigate = useNavigate();

  const changeNavigate = $((lang: LangEnum) => {
    if (localStorage.setItem) localStorage.setItem("lang", lang);
    const changedUrl = location.url?.pathname?.replace(
      /\b(?:en|ru|uz)\b/,
      lang,
    );
    if (changedUrl) navigate(changedUrl);
  });

  return (
    <header class="sticky left-0 top-0 flex w-full items-center justify-around p-4  shadow-custom">
      <h2>
        <LinkHref href={`/${lang}`}>LOGO</LinkHref>
      </h2>

      <HeaderProfile lang={lang} dic={dic} user={user} />

      <div>
        <Select
          onChange$={(event: any) => {
            changeNavigate(event.target.value);
          }}
        >
          <option selected={lang == LangEnum.EN} value={LangEnum.EN}>
            {LangEnum.EN}
          </option>
          <option selected={lang == LangEnum.RU} value={LangEnum.RU}>
            {LangEnum.RU}
          </option>
          <option selected={lang == LangEnum.UZ} value={LangEnum.UZ}>
            {LangEnum.UZ}
          </option>
        </Select>
      </div>
    </header>
  );
});
