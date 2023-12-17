import Nav from '@components/Nav';
import '@styles/globals.css'
import { ReactElement, ReactNode } from 'react'

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & share AI Prompts'
}

type MeuComponenteProps = {
  children: ReactElement;
};

const RootLayout = ({children}: MeuComponenteProps) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient'/>
        </div>
        <main className='app'>
          <Nav />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout