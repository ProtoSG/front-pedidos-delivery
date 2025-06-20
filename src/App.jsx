import { Toaster } from 'sonner'
import { AuthProvider } from './context/AuthContext.jsx'
import AppRouter from './routes/AppRouter.jsx'
import NotificationManager from './components/NotificationManager'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <NotificationManager />
      <Toaster richColors position="bottom-right" />
    </AuthProvider>
  )
}

export default App
