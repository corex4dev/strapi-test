"use client";

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
import { yupResolver } from "@hookform/resolvers/yup";
import { register } from "module";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as Yup from "yup";
import { isValid } from "zod";
import { signIn } from "next-auth/react";
import { registerUser } from "@/actions/auth.actions";
import { Loader2 } from "lucide-react";

const generateTimestampBasedString = () => {
  return Math.floor(Date.now() * Math.random())
    .toString(36)
    .substring(0, 8);
};

const SignupForm = () => {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Debe ser una dirección de correo electrónico válida")
      .required(
        "Dirección de correo electrónico visible es un campo requerido"
      ),
    password: Yup.string()
      .required("Contraseña")
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    password_confirm: Yup.string()
      .required("Confirmar contraseña es un campo requerido")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  });

  const form = useForm<Yup.InferType<typeof formSchema>>({
    resolver: yupResolver(formSchema),
    mode: "all",
  });

  const [loading, startLoading] = useTransition();

  const onSubmit = (data: Yup.InferType<typeof formSchema>) => {
    startLoading(async () => {
      const res = await registerUser({
        email: data.email,
        password: data.password,
        username: `${
          data.email.split("@")[0]
        }_${generateTimestampBasedString()}`,
      });
      if (!res) {
        toast.error("Algo salió mal. Intenta nuevamente.");
      } else {
        const parsedData: any = JSON.parse(res);
        if (parsedData.error) {
          toast.error(String(parsedData.error.message));
        }
        if (parsedData.jwt) {
          const res = await signIn("credentials", {
            identifier: data.email,
            password: data.password,
            callbackUrl: "/perfil",
          });
          if (res && !res.ok) {
            toast.error(
              res.error ? res.error : "Algo salió mal. Intenta nuevamente."
            );
          }
        }
      }
    });
  };

  return (
    <div className="flex flex-col w-full">
      <h3 className="text-2xl font-bold mb-6">Registrarse</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección de correo electrónico</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Escribe tu dirección de correo electrónico.
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
          <FormField
            control={form.control}
            name="password_confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription>Confirma tu contraseña.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <span>Registrarse</span>
            )}
          </Button>
        </form>
      </Form>
      <p className="mx-auto mt-8">
        Ya tienes cuenta{" "}
        <Link href="/login" className="underline">
          Accede
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
