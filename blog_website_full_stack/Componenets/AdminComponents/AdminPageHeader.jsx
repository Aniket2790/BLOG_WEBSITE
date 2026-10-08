export default function AdminPageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
          Dashboard
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h1>
        {description ? (
          <p className="text-slate-500 mt-1 max-w-xl">{description}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
