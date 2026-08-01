import NotFoundContent from "@/app/components/not-found-content";
import { getDictionary } from "@/app/i18n";

export default function NotFound() {
  return <NotFoundContent locale="es" dict={getDictionary("es")} />;
}
