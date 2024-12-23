import React from "react";
import Image from "next/image";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <div className="relative size-full min-h-screen">
          <div className="absolute inset-0 -z-10">
            <Image
              alt="Background"
              src="/images/AuthBackGroundLight.png"
              quality={100}
              fill
              sizes="100vw"
              style={{
                objectFit: "fill",
              }}
            />
          </div>
          <div className="mx-auto mt-auto max-w-5xl gap-2 text-2xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
