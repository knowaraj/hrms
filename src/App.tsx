import './index.css'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import AppRoutes from './AppRoutes'
import { ConfigProvider, theme as antdTheme } from 'antd'

function App() {
  return (
    <ThemeProvider>
      <AntDThemeWrapper>
        <AppRoutes />
      </AntDThemeWrapper>
    </ThemeProvider>
  )
}

function AntDThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme()
  const algorithm = theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm

  return (
    <ConfigProvider
      theme={{
        algorithm,
        token: {
          colorPrimary: '#F59E0B',
          colorInfo: '#3B82F6',
          colorSuccess: '#10B981',
          colorWarning: '#F59E0B',
          colorError: '#EF4444',
          borderRadius: 8,
          fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default App
