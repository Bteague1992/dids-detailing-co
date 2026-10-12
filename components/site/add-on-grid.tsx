import { addOnsConfig } from "@/config/services";

/** Add-ons with prices from config/services.ts. Pass `ids` to show a subset. */
export function AddOnGrid({ ids }: { ids?: string[] }) {
  const items = ids
    ? addOnsConfig.items.filter((item) => ids.includes(item.id))
    : addOnsConfig.items;

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-card bg-white p-5 shadow-card ring-1 ring-line"
        >
          <h3 className="text-lg">{item.name}</h3>
          <p className="mt-1 font-heading font-bold text-orange-dark">
            {item.price}
          </p>
        </li>
      ))}
    </ul>
  );
}
