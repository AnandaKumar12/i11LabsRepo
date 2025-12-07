import React from 'react'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <div className="min-h-screen p-6 
        bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      <div className="max-w-6xl mx-auto 
          bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/40">

        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-wide text-black">
            <span className="text-red-600 font-extrabold">i</span>
            11Labs Company & Driver Management
          </h1>
        </header>

        <Navbar />

        <main className="mt-6 animate-fadeIn">
          <AppRoutes />
        </main>

      </div>
    </div>
  )
}
