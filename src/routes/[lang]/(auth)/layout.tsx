import { component$, Slot } from "@builder.io/qwik";
import { LangEnum } from "~/config/config";

export function getI18nText(name: string, lang: LangEnum, validator: string) {
  const [typeV, value] = validator.split("-");
  switch (lang) {
    case LangEnum.RU:
      switch (typeV) {
        case "email":
          return { message: `Неверный ${name}` };
        case "min":
          return {
            message: `Строка должна содержать не менее ${value} символов.`,
          };
      }
      break;
    case LangEnum.UZ:
      switch (typeV) {
        case "email":
          return { message: `Noto'g'ri ${name}` };
        case "min":
          return {
            message: `Satr kamida ${value} ta belgidan iborat boʻlishi kerak`,
          };
      }
  }
}

// AUTH layout
export default component$(() => {
  return (
    <div class="card mx-auto w-3/4 max-w-md">
      <Slot />
    </div>
  );
});
