import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
export const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export function createClearkWithSuperbaseClient(getToken:()=>Promise<string| null>){
    return createClient(supabaseUrl, supabaseKey,{
       async accessToken (){
        return await getToken();
       }
    })
}