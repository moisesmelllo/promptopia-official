import Nav from '@components/Nav';
import '@styles/globals.css'
import { ReactElement } from 'react'
import Provider from '@components/Provider';

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
        <Provider>
          <div className='main'>
            <div className='gradient'/>
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout