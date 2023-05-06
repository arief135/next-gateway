'use client'

import { StyledEngineProvider } from '@mui/joy/styles'
import App from './App'
import React from 'react'

export default function Home() {
    return (
        <React.StrictMode>
            <StyledEngineProvider injectFirst>
                <App />
            </StyledEngineProvider>
        </React.StrictMode>
    )
}
