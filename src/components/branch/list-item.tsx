import { component$ } from "@builder.io/qwik";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import Button from "~/components/button";

interface Prop {
  branch: {
    id: string;
    url_name: string;
    name: string;
  };
}

export default component$((props: Prop) => {
  const location = useLocation();
  const navigator = useNavigate();

  return (
    <div class="card">
      <h6>{props.branch.name}</h6>
      <span>
        <small>{props.branch.url_name}</small>
      </span>
      <Button
        onClick$={() =>
          navigator(`/${location.params.lang}/branches/` + props.branch.id)
        }
      >
        Edit branch
      </Button>
    </div>
  );
});
