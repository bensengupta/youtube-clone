import * as React from "react";

export function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative">
      <main className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-8 p-5">
        {children}
      </main>
    </div>
  );
}

export function HomeVideoCardContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-w-[320px] flex-1 md:max-w-[360px]">{children}</div>
  );
}
