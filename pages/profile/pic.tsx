import { Button, Form, Input } from 'reactstrap'
import styles from '../../styles/profile.module.scss'
import Head from "next/head"
import profileService from '@/services/profileService';
import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react'
import HeaderAuth from '@/components/homeAuth/headerAuth';
import Link from 'next/link';

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { firebaseConfig } from '@/services/firebase';


firebase.initializeApp(firebaseConfig);

const Pic = () => {
    const storage = firebase.storage();
    const [image, setImage] = useState('');

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          try {
            const storageRef = storage.ref();
            const fileName = generateUniqueFileName(file.name);
            const fileRef = storageRef.child(fileName); // Substitua pelo caminho desejado para o arquivo
            
            await fileRef.put(file);
            const imageUrl = await fileRef.getDownloadURL();
    
            setImage(imageUrl);
            localStorage.setItem('imageUrl', imageUrl);
          } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
          }
        }
    };  

    const generateUniqueFileName = (originalFileName: string) => {
        const uniqueIdentifier = Date.now().toString(); // Utiliza o timestamp atual como identificador único
        const fileExtension = originalFileName.split('.').pop(); // Obtém a extensão do arquivo original
        return `${uniqueIdentifier}.${fileExtension}`;
    };     

    const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const imageUrl = localStorage.getItem('imageUrl');
          await profileService.getUpdate({ image: imageUrl! });
    
          console.log('Imagem atualizada com sucesso!');
          
        } catch (error) {
          console.error('Erro ao atualizar a imagem:', error);
        }
    };

    return(
        <>
            <Head>
                <title>Neko Animes - Trocar Senha</title>
            </Head>
            <HeaderAuth/>
            <main>
                <div className={styles.container}>
                    <div className={styles.containerContent}>
                        <div className={styles.containerLeft}>
                            <div className={styles.containerContentLeft}>
                                <p className={styles.title}>Minha conta</p>
                                <div className={styles.containerBtn}>
                                    <Link href={'/profile/'}><Button className={styles.btn}>Dados Pessoais</Button></Link>
                                    <Button className={styles.btn}>Trocar Senha</Button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerRight}>
                            <div className={styles.containerContentRight}>
                                <p className={styles.title}>Altere sua Foto</p>
                                <div className={styles.containerContentImg}>
                                    <Form className={styles.form} onSubmit={handleUpdateProfile}>
                                        <div className={styles.container_img}>
                                            <img src={image} alt="" className={styles.img}/>
                                        </div>

                                        <div className={styles.container_btn}>
                                            <Input type="file" className={styles.input} onChange={handleImageChange}/>
                                            <Button type='submit' className={styles.btn}>Salvar</Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Pic
