import { useAuth } from "@clerk/expo";
import { useMemo } from "react";
import { createClearkWithSuperbaseClient } from "../lib/superbase";
export function useSuperbase(){
  const {getToken}=useAuth();

  const client = useMemo(
    () => createClearkWithSuperbaseClient(() => getToken()),
    [getToken]
  );

  return client;
}