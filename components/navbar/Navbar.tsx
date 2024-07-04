"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
 NavigationMenu,
 NavigationMenuContent,
 NavigationMenuItem,
 NavigationMenuLink,
 NavigationMenuList,
 NavigationMenuTrigger,
 navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "../ModeToggle";

export function Navbar() {
 return (
  <div className="w-screen overflow-x- overflow-y-auto">
   <div className=" flex justify-between items-center container mx-auto py-2">
    <div>
     <Link
      href="/"
      className="md:text-2xl font-bold"
     >
      JT
     </Link>
    </div>
    <NavigationMenu>
     <NavigationMenuList>
      <NavigationMenuItem>
       <Link
        href="/"
        legacyBehavior
        passHref
       >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
         Home
        </NavigationMenuLink>
       </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
       <Link
        href="/about"
        legacyBehavior
        passHref
       >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
         About
        </NavigationMenuLink>
       </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
       <Link
        href="/my_works"
        legacyBehavior
        passHref
       >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
         My Works
        </NavigationMenuLink>
       </Link>
      </NavigationMenuItem>
      {/* <NavigationMenuItem>
       <Link
        href="/contact"
        legacyBehavior
        passHref
       >
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
         Contact
        </NavigationMenuLink>
       </Link>
      </NavigationMenuItem> */}
      <NavigationMenuItem>
       <ModeToggle></ModeToggle>
      </NavigationMenuItem>
     </NavigationMenuList>
    </NavigationMenu>
   </div>
  </div>
 );
}
