import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";

export const uploadImages = (data: any[]): Promise<void[]> => {
  const storage = getStorage();

  const uploadPromises = data.map(async (item) => {
    if (item && item.pictures.length > 0 && item.pictures.img !== null) {
      for (let i = 0; i < item.pictures.length; i++) {
        const picture = item.pictures[i];

        if (picture.img && picture.img.name) {
          const storageRef = ref(storage, `zuma/${picture.img.name}`);

          try {
            await uploadBytes(storageRef, picture.img);

            const url = await getDownloadURL(storageRef);

            delete picture.img;
            picture.urlImg = url;
          } catch (e) {
            toast.error(`Error uploading image: ${e}`);
          }
        }
      }
    }
  });

  return Promise.all(uploadPromises);
};
