"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const formSchema = Yup.object().shape({
    identifier: Yup.string().required(
      "Escribe tu nombre de usuario o correo electrónico"
    ),
    password: Yup.string().required("Escribe tu contraseña"),
  });

  const form = useForm<Yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    mode: "all",
  });

  const [loading, startLoading] = useTransition();
  const router = useRouter();

  const onSubmit = (data: Yup.InferType<typeof formSchema>) => {
    startLoading(async () => {
      const res = await signIn("credentials", {
        identifier: data.identifier,
        password: data.password,
        callbackUrl: "/perfil",
      });
      if (res && !res.ok) {
        toast.error(
          res.error ? res.error : "Algo salió mal. Intenta nuevamente."
        );
      }
    });
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-2xl font-bold mb-6">Acceder</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario o correo electrónico</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Escribe tu nombre de usuario o correo electrónico.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>Escribe tu contraseña.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Acceder</span>
            )}
          </Button>
        </form>
      </Form>
      <p className="mx-auto mt-8">
        Sin cuenta{" "}
        <Link href="/register" className="underline">
          Registrate
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
