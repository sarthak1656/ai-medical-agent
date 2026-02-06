import React from 'react'
import AppHeader from './_component/AppHeader';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <AppHeader />
        {children}</div>
  )
}

export default DashboardLayout