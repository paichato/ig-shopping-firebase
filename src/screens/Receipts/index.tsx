import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { Container, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";

// import { photosData } from '../../utils/photo.data';
import storage from "@react-native-firebase/storage";

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState({});

  const handleShowImage = async (path: string) => {
    const urlImage = await storage().ref(path).getDownloadURL();
    const info = await storage().ref(path).getMetadata();
    setPhotoSelected({ uri: urlImage, path, info });
  };

  const handleDeleteImage = () => {};

  useEffect(() => {
    storage()
      .ref("/images")
      .list()
      .then((result) => {
        const files: FileProps[] = [];
        result.items.forEach((file) => {
          files.push({ name: file.name, path: file.fullPath });
        });
        setPhotos(files);
      });
  }, []);

  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri={photoSelected.uri} />

      <PhotoInfo>
        Upload realizado em {photoSelected?.info?.timeCreated}
      </PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowImage(item.path)}
            onDelete={() => {}}
            isSelected={photoSelected.path === item.path}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}
