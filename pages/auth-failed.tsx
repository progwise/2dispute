import React from 'react';
import Link from '../components/Link/Link';
import Seo from '../components/Seo';

const AuthFailed = (): JSX.Element => (
  <>
    <Seo title="Anmeldung fehlgeschlagen" />
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
