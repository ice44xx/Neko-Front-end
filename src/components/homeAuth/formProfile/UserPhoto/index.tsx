import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from '../../../../../styles/profile.module.scss'
import profileService from '@/services/profileService';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { firebaseConfig } from '@/services/firebase';
import { Button, Form, Input } from 'reactstrap';
import useSWR from 'swr';

firebase.initializeApp(firebaseConfig);

const UserPhoto = () => {
    const storage = firebase.storage();
    const [image, setImage] = useState('');

    const { data, error } = useSWR('/users/current', profileService.getUser)
    if(!data) return null
    if(error) return error

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        try {
          const storageRef = storage.ref();
          const userId = data.id
          const fileName = generateUniqueFileName(file.name, userId);
          const fileRef = storageRef.child(`Profile/${fileName}`); // Substitua pelo caminho desejado para o arquivo

          await fileRef.put(file);
          const imageUrl = await fileRef.getDownloadURL();
    
          setImage(imageUrl);
          localStorage.setItem('imageUrl', imageUrl);
        } catch (error) {
          console.error('Erro ao fazer upload da imagem:', error);
        }
      }
    };  

    const generateUniqueFileName = (originalFileName: string, userId: string) => {
      const fileExtension = originalFileName.split('.').pop();
      return `${userId}.${fileExtension}`;
    };      

    const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      try {
        const imageUrl = localStorage.getItem('imageUrl');
        await profileService.getUpdate({ image: imageUrl! });

        setTimeout(() => {
          window.location.reload();
        }, 1000 * 2);

      } catch (error) {
        console.error('Erro ao atualizar a imagem', error);
      }
    };

    return(
      <>
        <Form className={styles.form} onSubmit={handleUpdateProfile}>
          <div className={styles.container_img}>
            {image ? (
              <img src={image} alt="" className={styles.img}/>
            ) : (
              <p className={styles.upload}>Upload aqui...</p>
            )}
          </div>

          <div className={styles.container_btn}>
            <p className={styles.rule}>Tamanho máximo de imagem 1MB.</p>
            <Input type="file" className={styles.inputFile} onChange={handleImageChange}/>
            <div className={styles.container_submit}>
              <Button type='submit' className={styles.btn}>Salvar</Button>
            </div>
          </div>
        </Form>
      </>
    )
}

export default UserPhoto