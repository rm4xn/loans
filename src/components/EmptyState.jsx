export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-base-content/30">
      <div className="size-16 rounded-2xl bg-base-200 flex items-center justify-center mb-5">
        <Icon className="size-8 stroke-1" />
      </div>
      <p className="text-lg font-medium text-base-content/40">{title}</p>
      {description && (
        <p className="text-sm mt-1.5 text-base-content/30">{description}</p>
      )}
    </div>
  )
}
