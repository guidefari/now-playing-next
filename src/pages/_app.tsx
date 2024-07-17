import type { AppProps } from 'next/app'

import '../styles/base.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <main className="min-h-screen flex items-center flex-col pt-10 bg-slate-800 ">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
