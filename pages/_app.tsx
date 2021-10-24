import type { AppProps } from 'next/app'

import '../styles/base.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <main className="min-h-screen px-5 bg-slate-800 ">
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
