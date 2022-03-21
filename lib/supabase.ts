import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseImagesPath =
  'https://igomfvlbailflqrocfpv.supabase.in/storage/v1/object/public/public/images';

export const supabase = createClient(supabaseUrl, supabaseKey);

export function getImageUrl(
  image: string,
  width: number,
  height: number,
  format: string = 'png'
) {
  return `${supabaseImagesPath}/${image}@${width}x${height}.${format}`;
}
