import React from 'react';
import Link from '../components/Link/Link';

const AuthFailed = (): JSX.Element => (
  <>
    <h1 className="text-lg">Anmeldung fehlgeschlagen</h1>
    <p>
      <Link href="/api/auth/twitter">Erneut versuchen</Link>
    </p>
    <p>
      <Link href="/">zur Startseite</Link>
    </p>
  </>
);

export default AuthFailed;
