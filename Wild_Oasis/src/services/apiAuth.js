import supabase from "./supabase";

export async function login({email,password}){
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
    if(error){
        throw new Error(error.message)
    }
    return data  
}

export async function getCurrentUser(){
  
    const {data:sesstion} = await supabase.auth.getSession();

    if(!sesstion.session) return null;

    const {data,error} = await supabase.auth.getUser();
    console.log(data)

    if(error){
        throw new Error(error.message)
    }
    return data
}
export async function getLogout(){
  
    const {error} = await supabase.auth.signOut()
    if(error){
        throw new Error(error.message)
    }
  
}