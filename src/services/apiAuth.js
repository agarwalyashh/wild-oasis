import supabase from "./supabase";
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;
  const { data: finalData, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return finalData?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signup({ email, password,fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options:{
      data:{
        fullName,
        avatar:""
      }
    }
  });
  if (error) throw new Error(error.message);
  return data;
}
