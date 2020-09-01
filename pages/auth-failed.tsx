import React from 'react';
import Link from '../components/Link/Link';
import Seo from '../components/Seo';
import { ChatBoxRightSideContent } from '../components/ChatBox/ChatBoxRightSide';

const AuthFailed = (): JSX.Element => (
  <ChatBoxRightSideContent>
    <Seo title="Anmeldung fehlgeschlagen" />
    <h1 className="text-lg">Anmeldung fehlgeschlagen</h1>
    <p>
      <Link href="/api/auth/twitter">Erneut versuchen</Link>
    </p>
  </ChatBoxRightSideContent>
);

export default AuthFailed;
