import { AuthClient } from './AuthClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AuthPage() {
  return <AuthClient />;
}
