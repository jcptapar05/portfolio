/* eslint-disable @next/next/no-img-element */
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Cards({
 img,
 lang,
 url,
}: {
 img: string;
 lang: any[];
 url: string;
}) {
 return (
  <a
   href={url}
   target="_blank"
  >
   <Card className="w-full cursor-pointer hover:scale-95 transition-all overflow-hidden">
    <CardContent className="p-0">
     <img
      src={img}
      alt=""
      className="w-full h-[240px] object-cover"
     />
     <div className="p-5 flex gap-2 text-xs">
      {lang?.map((item, i) => (
       <div key={i}>
        <div className="bg-slate-100 dark:bg-secondary p-2 rounded-lg uppercase ">
         {item}
        </div>
       </div>
      ))}
     </div>
    </CardContent>
   </Card>
  </a>
 );
}
