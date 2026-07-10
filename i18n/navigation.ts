import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

// Link/usePathname/useRouter que entienden los pathnames localizados:
// <Link href="/weddings"> → /es/bodas o /en/weddings según el locale, sin redirect.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
