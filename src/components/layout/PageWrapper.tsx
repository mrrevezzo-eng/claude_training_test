interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 ${className}`}>
      <div className="w-full max-w-2xl">
        {children}
      </div>
    </div>
  )
}
