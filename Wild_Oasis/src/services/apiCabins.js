import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
export async function createCabin(newcabin) {
  console.log(newcabin);
  const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll(
    "/",
    ""
  );
  console.log(imageName);
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  /*  // https://nukrckwtzedwylkpsieu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-02-19T06%3A56%3A59.054Z //*/
  console.log(imageName);
  // create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newcabin, image: imagePath }]);
  console.log(data);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newcabin.image);
  //any error on upload the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(`canin image could not be upload`);
  }
  return data;
}
