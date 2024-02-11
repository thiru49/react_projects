import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu);
  return (
    <div className="divide-y divide-stone-200 px-2">
      {menu.map((pizz) => (
        <MenuItem pizza={pizz} key={pizz.id} />
      ))}
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
