import {
  defaultVehicleSize,
  formatPrice,
  vehicleSizes,
  type SizePrices,
} from "@/config/services";

/**
 * Vehicle size picker. A plain radio group, so it is keyboard and screen
 * reader accessible out of the box. It needs no JavaScript: every <SizePrice>
 * on the page renders all three prices, and CSS in globals.css shows the one
 * matching the checked radio. Use one SizeToggle per page.
 */
export function SizeToggle() {
  return (
    <fieldset className="mx-auto mb-8 w-fit max-w-full text-center">
      <legend className="mx-auto mb-3 text-sm font-semibold text-muted-text">
        What are we cleaning? Prices update below.
      </legend>
      <div className="inline-flex flex-wrap justify-center gap-1 rounded-[1.75rem] bg-white p-1.5 shadow-card ring-1 ring-line">
        {vehicleSizes.map((size) => (
          <label key={size.id} className="cursor-pointer">
            <input
              type="radio"
              name="vehicle-size"
              value={size.id}
              defaultChecked={size.id === defaultVehicleSize}
              className="peer sr-only"
            />
            <span className="block rounded-full px-4 py-2.5 font-heading text-[0.95rem] font-bold transition-colors peer-checked:bg-charcoal peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-charcoal">
              {size.shortLabel}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** The price for whichever size is selected in the SizeToggle. */
export function SizePrice({ prices }: { prices: SizePrices }) {
  return (
    <>
      {vehicleSizes.map((size) => (
        <span key={size.id} data-size-price={size.id}>
          {formatPrice(prices[size.id])}
        </span>
      ))}
    </>
  );
}

/** The name of whichever size is selected, e.g. "SUV / Truck". */
export function SizeLabel() {
  return (
    <>
      {vehicleSizes.map((size) => (
        <span key={size.id} data-size-price={size.id}>
          {size.label}
        </span>
      ))}
    </>
  );
}
