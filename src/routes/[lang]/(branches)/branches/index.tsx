import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  DocumentHead,
  routeAction$,
  zod$,
} from "@builder.io/qwik-city";
import { axiosInstance } from "~/utils.request";
import ListItem from "~/components/branch/list-item";
import CreateBranch from "~/components/branch/create-branch";
import { LangEnum } from "~/config/config";
import { getI18nText } from "~/routes/[lang]/(auth)/layout";

interface Branch {
  id: string;
  url_name: string;
  name: string;
}

export const useCurrency = routeLoader$(async (eve) => {
  try {
    const { data } = await axiosInstance(eve.request).get(
      "/dictionary/currency",
    );
    return data;
  } catch (e: any) {
    console.log("[25]:", e?.response?.data);
  }
});

export const useLanguage = routeLoader$(async (eve) => {
  try {
    const { data } = await axiosInstance(eve.request).get(
      "/dictionary/language",
    );
    return data;
  } catch (e: any) {
    console.log("[34]:", e?.response?.data);
  }
});

export const useBranchForm = routeAction$(
  async (data, event) => {
    try {
      const response = await axiosInstance(event.request).post("/branch", data);

      return response.data;
    } catch (e: any) {
      console.log("[50]:", e?.response?.data);
    }
  },
  zod$((z, ev) => {
    const lang = ev.params.lang as LangEnum;

    return z.object({
      name: z.string().min(3, getI18nText("name", lang, "min-3")),
      url_name: z.string().min(3, getI18nText("url_name", lang, "min-3")),
      currency_id: z.string().min(3, getI18nText("currency_id", lang, "min-3")),
      default_language_id: z
        .string()
        .min(3, getI18nText("language_id", lang, "min-3")),
    });
  }),
);

export const useBranches = routeLoader$(async (event) => {
  try {
    const user = JSON.parse(event.cookie.get("user")!.value);

    const response = await axiosInstance(event.request).get(
      "branch/by-user/" + user.id,
    );

    return response.data as Branch[];
  } catch (e: any) {
    console.log("[15]:");
    e?.response?.data;
  }
});

export default component$(() => {
  const branches = useBranches();
  const branchForm = useBranchForm();
  const currencies = useCurrency();
  const languages = useLanguage();

  return (
    <div class="grid grid-cols-4 gap-2">
      {branches.value?.map((branch) => (
        <ListItem key={branch.id} branch={branch} />
      ))}
      <CreateBranch
        action={branchForm}
        currencies={currencies}
        languages={languages}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Branch",
};
