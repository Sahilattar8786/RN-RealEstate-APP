import { useUserStore } from "@/store/useStore";
import { useUser } from "@clerk/expo";
import { useCallback, useEffect, useRef } from "react";
import { useSuperbase } from "./useSuperbase";

export const useUserSync = () => {
  const { user } = useUser();
  const setIsAdmin = useUserStore((state) => state.setIsAdmin);
  const authSupabase = useSuperbase();
  const isSyncing = useRef(false);

  const syncUser = useCallback(async () => {
    if (!user?.id || isSyncing.current) return;
    isSyncing.current = true;

    try {
      // Check if user already exists
      const { data: existing } = await authSupabase
        .from("users")
        .select("is_admin")
        .eq("clerk_id", user.id)
        .maybeSingle();

      if (existing) {
        setIsAdmin(existing.is_admin ?? false);
        return;
      }

      // Insert new user
      const { data: newUser, error: insertError } = await authSupabase
        .from("users")
        .insert({
          clerk_id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          first_Name: user.firstName,
          last_Name: user.lastName,
          avatar_url: user.imageUrl,
        })
        .select("is_admin")
        .single();

      if (insertError) {
        console.warn("[useUserSync] insert error:", insertError.message);
        return;
      }

      setIsAdmin(newUser?.is_admin ?? false);
    } finally {
      isSyncing.current = false;
    }
  }, [authSupabase, user?.id, setIsAdmin]);

  useEffect(() => {
    if (!user) return;
    void syncUser();
  }, [user, syncUser]);
};