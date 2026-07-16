'use client'

import { useRef, useState, useEffect  } from 'react'
import imageCompression from 'browser-image-compression'
import { db } from "@/app/firebase";

import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query
} from "firebase/firestore";



export default function PhotoUploadCard() {
  const fileInputRef = useRef(null)

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [files, setFiles] = useState([])
  const [photos, setPhotos] = useState([])

  useEffect(() => {

  const getPhotos = async()=>{

    const q = query(
      collection(db,"photos"),
      orderBy("createdAt","desc")
    );

    const snap = await getDocs(q);

    const list = snap.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
    }));

    setPhotos(list);

  }

  getPhotos();

},[]);

  const upload = async () => {
    if (files.length === 0) {
      setMessage('Lütfen fotoğraf seçiniz.')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const uploadedPhotos = []

      for (const file of files) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 0.8,
          maxWidthOrHeight: 1600,
          useWebWorker: true,
        })

        const formData = new FormData()
        formData.append('file', compressed)
        formData.append('upload_preset', 'wedding_upload')

        const res = await fetch(
          'https://api.cloudinary.com/v1_1/q0ieidjw/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        )

        const data = await res.json()

       const photoData = {
  url: data.secure_url,
  date: new Date().toLocaleString('tr-TR'),
  createdAt: Date.now()
}


await addDoc(
  collection(db,"photos"),
  photoData
)


uploadedPhotos.push(photoData)
      }

      setPhotos((prev) => [...uploadedPhotos, ...prev])

      setMessage('Fotoğraflar başarıyla yüklendi ❤️')
      setFiles([])
      fileInputRef.current.value = ''
    } catch (err) {
      console.error(err)
      setMessage('Yükleme sırasında hata oluştu.')
    }

    setLoading(false)
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl px-8 py-10 text-center text-white">

      <h2 className="font-serif text-2xl text-yellow-50 mb-4">
        📸 Anılarınızı Paylaşın
      </h2>

      <p className="text-yellow-100/70 text-sm mb-6">
        Düğünde çektiğiniz en güzel kareleri bizimle paylaşabilirsiniz ❤️
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="rounded-full border border-yellow-200 px-6 py-2 hover:bg-yellow-600 transition"
      >
        📷 Fotoğraf Seç
      </button>

      {files.length > 0 && (
        <p className="mt-4 text-yellow-100">
          {files.length} fotoğraf seçildi
        </p>
      )}

      <button
        onClick={upload}
        disabled={loading}
        className="mt-6 block mx-auto rounded-full bg-yellow-600 px-8 py-2 hover:bg-yellow-500 transition"
      >
        {loading ? 'Yükleniyor...' : '⬆️ Fotoğrafları Gönder'}
      </button>

      {message && (
        <p className="mt-5 text-yellow-100">
          {message}
        </p>
      )}

      {photos.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-serif text-yellow-50 mb-5">
            📷 Yüklenen Fotoğraflar
          </h3>

          <div className="space-y-5">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/10"
              >
                <img
                  src={photo.url}
                  alt="Yüklenen fotoğraf"
                  className="w-full h-64 object-cover"
                />

                <div className="p-4">
                  <p className="text-yellow-100 text-sm">
                    ❤️ Misafir tarafından yüklendi
                  </p>

                  <p className="text-xs text-gray-300 mt-1">
                    {photo.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}