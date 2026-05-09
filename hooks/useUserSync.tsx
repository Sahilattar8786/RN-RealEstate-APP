import { useUserStore } from "@/store/useStore";
import { useUser } from "@clerk/expo";
import { useEffect } from "react";
import { useSuperbase } from "./useSuperbase";

export const useUserSync = () => {
  const { user } = useUser();
  const setIsAdmin = useUserStore((state) => state.setIsAdmin);
  const authSupabase = useSuperbase();

  

  const syncUser=async()=>{
    const { data, error } = await authSupabase
      .from("users")
      .select("clerk_id,is_admin")
      .eq("clerk_id", user?.id)
      .single();
    if (error) {
      console.warn("[useUserSync]", error.message);
      return;
    }
    if(data){
         setIsAdmin(data.is_admin??false)
    }

    const {data: newUser} = await authSupabase.from("users").insert({
        clerk_id: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        first_name: user?.firstName,
        last_name: user?.lastName,
        avatar_url: user?.imageUrl,
    }).select("is_admin").single();
    setIsAdmin(newUser?.is_admin??false)
  }

  useEffect(() => {
    if (!user) return;
    syncUser();
  }, [user, syncUser]);
};