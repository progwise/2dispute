import React from 'react';
import Link from '../components/Link/Link';
import Seo from '../components/Seo';
import { ChatBoxRightSideContent } from '../components/ChatBox/ChatBoxRightSide';
import i18n from '../utils/i18n';

const AuthFailed = (): JSX.Element => {
  const { t } = i18n.useTranslation();
  return (
    <ChatBoxRightSideContent>
      <Seo title={t('seo.title.authFailed')} />
      <h1 className="text-lg">{t('authFailed.tile')}</h1>
      <p>
        <Link href="/api/auth/twitter">{t('authFailed.tryAgain')}</Link>
      </p>
    </ChatBoxRightSideContent>
  );
};

export default AuthFailed;
