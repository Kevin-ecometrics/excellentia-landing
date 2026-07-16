const rows: [React.ReactNode, React.ReactNode, React.ReactNode][] = [
  [
    "Service Feature",
    "Standard Drop-Off Distributors",
    "Excellentia Foods (Retail Growth Partner)",
  ],
  [
    "Delivery Model",
    "Drop-off at loading dock",
    <>
      <strong className="font-bold">Direct Store Delivery (DSD)</strong>{" "}
      directly to aisles
    </>,
  ],
  [
    "Shelf Stocking",
    "Left to your busy store staff",
    <>
      <strong className="font-bold">Refrigerated shelf stocking</strong>{" "}
      handled by our team
    </>,
  ],
  [
    "Freshness Control",
    "High risk of shrinkage/expired stock",
    <>
      <strong className="font-bold">Strict FIFO rotation</strong> (First In,
      First Out)
    </>,
  ],
  [
    "Sales Velocity",
    "Passive wholesale catalog",
    <>
      <strong className="font-bold">In-store product demonstrations</strong>{" "}
      to drive traffic
    </>,
  ],
];

export default function ExcellentiaDifference() {
  return (
    <section className="w-full bg-default-rust px-6 py-24 text-center text-white">
      <h2 className="font-main text-4xl sm:text-5xl lg:text-6xl text-default-mustard">
        The Excellentia Difference
      </h2>
      <p className="mt-4 font-support2 font-bold text-lg sm:text-xl">
        More than a distributor a retail growth partner
      </p>
      <div className="mx-auto mt-12 max-w-3xl overflow-x-auto">
        <table className="w-full border-collapse font-support2 text-sm sm:text-base">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td
                    key={colIndex}
                    className={`h-12 border border-white/20 px-4 py-4 text-center align-middle ${
                      rowIndex === 0 || colIndex === 0 ? "font-bold" : ""
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
