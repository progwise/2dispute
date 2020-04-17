import React from 'react';
import { ChatPersonFragment } from '../../../graphql/generated/graphql';

interface ChatPartnersProps {
  partnerA?: ChatPersonFragment;
  partnerB?: ChatPersonFragment;
}

const randomKey = (): string => Math.random().toString();

const ChatPartners = ({
  partnerA,
  partnerB,
}: ChatPartnersProps): JSX.Element => (
  <>
    {[partnerA, partnerB].map(partner => (
      <div
        key={partner?.id ?? randomKey()}
        className="col-span-2 flex flex-col items-center py-4"
      >
        {partner?.picture && (
          <img src={partner.picture} className="rounded-full" />
        )}
        <span>{partner?.name ?? '???'}</span>
      </div>
    ))}
  </>
);

export default ChatPartners;
