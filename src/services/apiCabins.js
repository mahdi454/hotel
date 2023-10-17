import supabase, { supabaseUrl } from "./supaBase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("unable to load");
  }
  return data;
}

export async function createCabins(cabin, id) {
  const hasImage=cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath =hasImage ? cabin.image: `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;
  let query = supabase.from("cabins");
  if (!id)query= query.insert([{ ...cabin, image: imagePath }]);
  if (id)query= query.update({ ...cabin, image: imagePath }).eq("id", id).select();
  const { data, error } = await query.select().single();
  
  if (error) {
    console.log(error);
    throw new Error("unable to create new cabin");
  }
  
  if(hasImage)return data;
  const { error: storageError } = await supabase.storage
    .from("cabins-image")
    .upload(imageName, cabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("unable to upload the image and cabin not created");
  }
  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("unable to delete");
  }
  return data;
}
