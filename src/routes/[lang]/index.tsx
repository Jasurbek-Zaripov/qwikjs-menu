import { component$ } from "@builder.io/qwik";
import { useLocation, routeLoader$ } from "@builder.io/qwik-city";
import { dictionary } from "~/routes/[lang]/layout";
import { LangEnum } from "~/config/config";

export const useLang = routeLoader$(async ({ params, status }) => {
  if (!Object.values(LangEnum).includes(params.lang as LangEnum)) {
    status(404);
    return null;
  }

  return {};
});

export default component$(() => {
  const location = useLocation();
  const _ = useLang();
  if (!_.value) {
    return <h3 class="text-red-700">Not found</h3>;
  }
  const dic = dictionary[location?.params?.lang as LangEnum];

  return <p class="my-p">{dic?.title}</p>;
});
