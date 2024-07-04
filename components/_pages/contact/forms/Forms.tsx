"use client";
import React from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
 name: z.string().min(2, {
  message: "Name must be at least 2 characters.",
 }),
 message: z.string().min(2, {
  message: "Message must be at least 2 characters.",
 }),
 email: z.string().min(2, {
  message: "Email must be at least 2 characters.",
 }),
});

const Forms = () => {
 const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
   name: "",
   message: "",
   email: "",
  },
 });

 function onSubmit(values: z.infer<typeof formSchema>) {
  console.log(values);
 }

 return (
  <Form {...form}>
   <form
    onSubmit={form.handleSubmit(onSubmit)}
    className="space-y-8"
   >
    <FormField
     control={form.control}
     name="name"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Name</FormLabel>
       <FormControl>
        <Input {...field} />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="email"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Email</FormLabel>
       <FormControl>
        <Input {...field} />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <FormField
     control={form.control}
     name="message"
     render={({ field }) => (
      <FormItem>
       <FormLabel>Message</FormLabel>
       <FormControl>
        <Input {...field} />
       </FormControl>
       <FormMessage />
      </FormItem>
     )}
    />
    <Button type="submit">Submit</Button>
   </form>
  </Form>
 );
};

export default Forms;
