import supabase from "./supabase";
const supabaseURL = "https://imviylxjncalgzqebxsf.supabase.co";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new error("Cabins could not be loaded");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new error("Cabins could not be deleted");
  }
  return data;
}
export async function createCabin(newCabin) {
  // https://imviylxjncalgzqebxsf.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseURL}/storage/v1/object/public/cabin-images//${imageName}`;
  //1.Create a Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new error("Cabins could not be created");
  }
  //2.Upload an image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin if there was an error
  if (storageError) await supabase.from("cabins").delete().eq("id", data.id);
  return data;
}
export async function editCabin(newCabin, id) {
  // console.log(newCabin);
  
  // https://imviylxjncalgzqebxsf.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseURL}/storage/v1/object/public/cabin-images//${imageName}`;
  //1.Edit a Cabin

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin,image:imagePath })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new error("Cabins could not be created");
  }
  //2.Upload an image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin if there was an error
  if (storageError) await supabase.from("cabins").delete().eq("id", data.id);
  return data;
}
