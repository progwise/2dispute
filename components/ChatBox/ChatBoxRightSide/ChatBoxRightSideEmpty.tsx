import React from 'react';
import Link from '../../Link/Link';
import { useTranslation, Trans } from '../../../utils/i18n';
import LogoSVG from './Logo.svg';

const ChatBoxRightSideEmpty = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full items-center justify-center space-y-4">
      <img src={LogoSVG} className="w-24 h-24" />
      <p className="text-center">
        <Trans t={t} i18nKey="emptyScreen">
          Wähle ein Dispute aus der linken Liste aus oder{' '}
          <Link href="/new" className="whitespace-no-wrap">
            erstelle ein neuen
          </Link>
          .
        </Trans>
      </p>
    </div>
  );
};

export default ChatBoxRightSideEmpty;
