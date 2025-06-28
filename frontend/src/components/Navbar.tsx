"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const session = useSession();

  return (
    <nav className="flex justify-between w-full">
      <ul className="flex list-none gap-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/perfil">Perfil</Link>
        </li>
      </ul>

      <div className="flex gap-6">
        {session?.data?.user ? (
          <button
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Salir
          </button>
        ) : (
          <Link href="/login">Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
