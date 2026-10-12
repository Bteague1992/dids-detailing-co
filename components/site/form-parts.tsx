/** Shared look for every text input, select, and textarea on the site. */
export const fieldClass =
  "w-full rounded-xl border-2 border-line bg-white px-3.5 py-2.5 text-base focus:border-charcoal focus:outline-none";

/**
 * Honeypot field: visually hidden off-screen (not display:none, which some
 * bots detect and skip). Real visitors never see or tab into it; any value
 * here flags the submission as spam server-side (lib/spam-filter.ts).
 */
export function Honeypot({ id }: { id: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-9999px",
        width: "1px",
        height: "1px",
        overflow: "hidden",
      }}
    >
      <label htmlFor={id}>Company</label>
      <input type="text" id={id} name="company" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
