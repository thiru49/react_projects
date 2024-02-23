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
export async function createEditCabin(newcabin, id) {
  console.log(newcabin, id);
  const hasImagePath = newcabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newcabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newcabin?.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  /*  // https://nukrckwtzedwylkpsieu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-02-19T06%3A56%3A59.054Z //*/

  // Create/Edit  Cabin
  let query = supabase.from("cabins");

  //Create Cabin
  console.log([{ ...newcabin, image: imagePath }]);
  if (!id) query = query.insert([{ ...newcabin, image: imagePath }]);

  //Edit Cabin
  if (id) query = query.update({ ...newcabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //upload Image
  if (hasImagePath) return data;
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
