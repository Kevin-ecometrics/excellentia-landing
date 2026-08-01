import type { Dictionary } from "@/app/i18n";

export default function ExcellentiaDifference({
  dict,
}: {
  dict: Dictionary;
}) {
  const header = dict.difference.columns;
  const body = dict.difference.rows;

  return (
    <section className="w-full bg-default-teal px-6 py-24 text-center text-white sm:px-10 lg:px-16">
      <h2 className="font-support1 text-4xl sm:text-5xl lg:text-6xl text-default-mustard">
        {dict.difference.heading}
      </h2>
      <p className="mt-4 font-support2 font-bold text-lg sm:text-xl">
        {dict.difference.subheading}
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
                {header.feature}
              </th>
              <th className="pb-4 px-2 align-bottom text-xs font-bold uppercase tracking-widest text-white/50 sm:text-sm">
                {header.standard}
              </th>
              <th className="pb-4 pl-2 align-bottom text-xs font-bold uppercase tracking-widest text-default-mustard sm:text-sm">
                {header.excellentia}
              </th>
            </tr>
          </thead>
          <tbody className="block divide-y divide-white/10 sm:table-row-group">
            {body.map((row) => (
              <tr
                key={row.feature}
                className="block py-6 sm:table-row sm:py-0"
              >
                <td className="block pb-2 text-base font-bold text-white sm:table-cell sm:py-6 sm:pr-2 sm:pb-6 sm:align-top sm:text-base">
                  {row.feature}
                </td>
                <td className="block pb-1 text-sm text-white/50 sm:table-cell sm:py-6 sm:px-2 sm:pb-6 sm:align-top sm:text-base">
                  <span className="mr-2 text-white/30">–</span>
                  {row.standard}
                </td>
                <td className="block text-sm text-default-ivory sm:table-cell sm:py-6 sm:pl-2 sm:pb-6 sm:align-top sm:text-base">
                  <span className="mr-2 text-default-mustard">✓</span>
                  <strong className="font-bold">{row.highlight}</strong>
                  {row.rest}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
