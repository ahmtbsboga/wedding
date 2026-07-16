'use client'
import React, { useState, useEffect } from 'react'

const GiftTracker = () => {
  const [entries, setEntries] = useState([])
  const [side, setSide] = useState('kiz')
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('dugun-hediyeler')
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Lutfen isim girin.')
      return
    }
    if (!amount || Number(amount) <= 0) {
      setError('Lutfen gecerli bir miktar girin.')
      return
    }

    const newEntry = {
      id: Date.now(),
      side,
      name: name.trim(),
      amount: Number(amount),
    }

    const updated = [...entries, newEntry]
    setEntries(updated)
    localStorage.setItem('dugun-hediyeler', JSON.stringify(updated))

    setName('')
    setAmount('')
  }

  const kizTarafi = entries.filter((e) => e.side === 'kiz')
  const erkekTarafi = entries.filter((e) => e.side === 'erkek')

  const kizToplam = kizTarafi.reduce((sum, e) => sum + e.amount, 0)
  const erkekToplam = erkekTarafi.reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="relative overflow-hidden w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl shadow-black/40 px-8 py-10 text-center text-white before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none">
      <h2 className="relative font-serif text-2xl mb-4 text-yellow-50">Hediye</h2>
      <p className="relative text-yellow-100/70 text-sm mb-4">
        Varlığınız en büyük hediyemizdir. Dilerseniz aşağıdaki hesaplara katkıda bulunabilirsiniz.
      </p>

      {/* IBAN bilgileri */}
      <div className="relative space-y-3 mb-6">
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm">
          <p className="text-xs uppercase tracking-wider text-yellow-100/60 mb-1">Erkek Tarafı</p>
          <p className="font-medium">Ahmet BAŞBOĞAOĞLU</p>
          <p className="text-yellow-100/70 text-xs sm:text-sm">TR00 0000 0000 0000 0000 0000 00</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm">
          <p className="text-xs uppercase tracking-wider text-yellow-100/60 mb-1">Kız Tarafı</p>
          <p className="font-medium">Şeyda BAŞBOĞAOĞLU</p>
          <p className="text-yellow-100/70 text-xs sm:text-sm">TR00 0000 0000 0000 0000 0000 00</p>
        </div>
      </div>

      {/* Gonderim formu */}
      <form onSubmit={handleSubmit} className="relative space-y-3 mb-6 text-left">
        <div>
          <label className="block text-xs text-yellow-100/70 mb-1">Hangi tarafa gönderdiniz?</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSide('kiz')}
              className={`flex-1 rounded-full px-3 py-2 text-sm border transition ${
                side === 'kiz'
                  ? 'bg-yellow-50/90 text-gray-800 border-yellow-50/90'
                  : 'border-white/20 text-white/80 hover:bg-white/10'
              }`}
            >
              Kız Tarafı
            </button>
            <button
              type="button"
              onClick={() => setSide('erkek')}
              className={`flex-1 rounded-full px-3 py-2 text-sm border transition ${
                side === 'erkek'
                  ? 'bg-yellow-50/90 text-gray-800 border-yellow-50/90'
                  : 'border-white/20 text-white/80 hover:bg-white/10'
              }`}
            >
              Erkek Tarafı
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs text-yellow-100/70 mb-1">Adınız Soyadınız</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ayşe Yılmaz"
            className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-yellow-100/50"
          />
        </div>

        <div>
          <label className="block text-xs text-yellow-100/70 mb-1">Gönderdiğiniz Miktar (TL)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="500"
            className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-yellow-100/50"
          />
        </div>

        {error && (
          <p className="text-xs text-red-300 bg-red-900/20 border border-red-300/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-full bg-yellow-50/90 text-gray-800 px-6 py-2 text-sm font-medium hover:bg-white transition"
        >
          Gönderdim
        </button>
      </form>

      {/* Liste - Kiz ve Erkek tarafi yan yana */}
      <div className="relative grid grid-cols-2 gap-3 text-left">
        <div>
          <p className="text-xs uppercase tracking-wider text-yellow-100/60 mb-2 text-center">
            Kız Tarafı
          </p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {kizTarafi.length === 0 ? (
              <p className="text-xs text-yellow-100/40 text-center">Henüz gönderim yok</p>
            ) : (
              kizTarafi.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs flex justify-between items-center"
                >
                  <span className="truncate">{entry.name}</span>
                  <span className="font-medium text-yellow-100/90 ml-1 whitespace-nowrap">
                    {entry.amount} TL
                  </span>
                </div>
              ))
            )}
          </div>
          {kizTarafi.length > 0 && (
            <p className="text-xs text-yellow-100/70 mt-2 text-center font-medium">
              Toplam: {kizToplam} TL
            </p>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-yellow-100/60 mb-2 text-center">
            Erkek Tarafı
          </p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {erkekTarafi.length === 0 ? (
              <p className="text-xs text-yellow-100/40 text-center">Henüz gönderim yok</p>
            ) : (
              erkekTarafi.map((entry) => (
                <div
                  key={entry.id}
                  className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1.5 text-xs flex justify-between items-center"
                >
                  <span className="truncate">{entry.name}</span>
                  <span className="font-medium text-yellow-100/90 ml-1 whitespace-nowrap">
                    {entry.amount} TL
                  </span>
                </div>
              ))
            )}
          </div>
          {erkekTarafi.length > 0 && (
            <p className="text-xs text-yellow-100/70 mt-2 text-center font-medium">
              Toplam: {erkekToplam} TL
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default GiftTracker