import { ReactNode } from "react";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row ${title ? 'justify-between' : 'justify-end'} items-start sm:items-center gap-4 mb-6`}>
      {title && (
        <div>
          <h1 className="text-2xl font-bold tracking-tight font-heading text-slate-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {actions && (
        <div className="flex flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
