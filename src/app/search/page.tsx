import { Suspense } from "react";
import SearchClient from "./SearchClient";

export const metadata = {
  title: "Search — Embedded",
};

export default function SearchPage() {
  return (
    <Suspense>
      <SearchClient />
    </Suspense>
  );
}
