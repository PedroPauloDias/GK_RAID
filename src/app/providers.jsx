// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function Providers({children}) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark">
        <NextUIProvider>
      {children}
    </NextUIProvider>
      </NextThemesProvider>
  )
}