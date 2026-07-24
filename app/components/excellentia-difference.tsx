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
      <strong className="font-bold">Refrigerated shelf stocking</strong> handled
      by our team
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
      <strong className="font-bold">In-store product demonstrations</strong> to
      drive traffic
    </>,
  ],
];

export default function ExcellentiaDifference() {
  const [header, ...body] = rows;

  return (
    <section className="w-full bg-default-teal px-6 py-24 text-center text-white sm:px-10 lg:px-16">
      <h2 className="font-support1 text-4xl sm:text-5xl lg:text-6xl text-default-mustard">
        The Excellentia Difference
      </h2>
      <p className="mt-4 font-support2 font-bold text-lg sm:text-xl">
        More than a distributor a retail growth partner
      </p>
      <div className="mx-auto mt-16 max-w-4xl">
        <table className="block w-full border-collapse font-support2 text-left sm:table sm:table-fixed">
          <colgroup className="hidden sm:table-column-group">
            <col className="w-[30%]" />
            <col className="w-[35%]" />
            <col className="w-[35%]" />
          </colgroup>
          <thead className="hidden sm:table-header-group">
            <tr className="border-b border-white/20">
              <th className="pb-4 pr-2 align-bottom text-xs font-bold uppercase tracking-widest text-white/50 sm:text-sm">
                {header[0]}
              </th>
              <th className="pb-4 px-2 align-bottom text-xs font-bold uppercase tracking-widest text-white/50 sm:text-sm">
                {header[1]}
              </th>
              <th className="pb-4 pl-2 align-bottom text-xs font-bold uppercase tracking-widest text-default-mustard sm:text-sm">
                {header[2]}
              </th>
            </tr>
          </thead>
          <tbody className="block divide-y divide-white/10 sm:table-row-group">
            {body.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="block py-6 sm:table-row sm:py-0"
              >
                <td className="block pb-2 text-base font-bold text-white sm:table-cell sm:py-6 sm:pr-2 sm:pb-6 sm:align-top sm:text-base">
                  {row[0]}
                </td>
                <td className="block pb-1 text-sm text-white/50 sm:table-cell sm:py-6 sm:px-2 sm:pb-6 sm:align-top sm:text-base">
                  <span className="mr-2 text-white/30">–</span>
                  {row[1]}
                </td>
                <td className="block text-sm text-default-ivory sm:table-cell sm:py-6 sm:pl-2 sm:pb-6 sm:align-top sm:text-base">
                  <span className="mr-2 text-default-mustard">✓</span>
                  {row[2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
