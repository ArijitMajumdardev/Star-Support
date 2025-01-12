import { supabase } from "@/lib/supabaseClient";

export async function uploadToS3(formData: FormData): Promise<{url:string}>{
    
    const file = formData.get('file') as File;

    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = `${Date.now()}-${file.name}`;
    const bucketName = 'buymeacoke';

    const { data, error } = await supabase.storage.from(bucketName).upload(fileName, file)
    
    if (error) {
        console.error('Error uploading file:', error.message);
        throw error;
    }
    
    const { publicUrl } = supabase.storage.from(bucketName).getPublicUrl(fileName).data;

    if (!publicUrl) {
        throw new Error('Unable to get public URL for the uploaded file');
      }
    
      return { url: publicUrl };
  
}