import { component$, useOnDocument, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { LangEnum } from "~/config/config";

export default component$(() => {
  const navigate = useNavigate();

  useOnDocument(
    "DOMContentLoaded",
    $(() => {
      const defaultLang = localStorage?.getItem("lang") || LangEnum.EN;
      navigate(`/${defaultLang}`);
    }),
  );

  return <></>;
});
