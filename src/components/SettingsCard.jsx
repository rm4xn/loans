export default function SettingsCard({ icon: Icon, title, description, children }) {
  return (
    <div className="card card-border bg-base-100 mb-4">
      <div className="card-body">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{title}</p>
            {description && (
              <p className="text-xs text-base-content/40 mt-0.5">{description}</p>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
