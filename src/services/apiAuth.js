import supabase from "./supabase";
const supabaseURL = "https://imviylxjncalgzqebxsf.supabase.co";
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

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function updateUserData({ fullName, avatar }) {
  let updateData = { fullName };
  const { data, error } = await supabase.auth.updateUser({
    data: updateData,
  });
  if (error) throw new error(error.message);
  if (!avatar) return data;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new error(storageError.message);
  const { data: updatedData, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseURL}/storage/v1/object/public/avatars//${fileName}`,
    },
  });
  if (error2) throw new error(error.message);
  return updatedData;
}

export async function updatePassword(password) {
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  if (error) throw new error(error.message);
  return data;
}
