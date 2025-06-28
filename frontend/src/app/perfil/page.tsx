"use client";

import { useSession } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
