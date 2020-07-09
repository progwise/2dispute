import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import Link from '../Link/Link';
import { useDisputeHeaderQuery } from '../../graphql/generated/frontend';

interface DisputeHeaderProps {
  disputeId: string;
  className?: string;
}

const DisputeHeader = ({
  disputeId,
  className = '',
}: DisputeHeaderProps): JSX.Element => {
  const { data } = useDisputeHeaderQuery({
    variables: { disputeId },
    fetchPolicy: 'cache-only',
  });

  return (
    <div className={`${className} flex items-center py-2`}>
      <Link href="/chat" className="p-2 text-xl md:hidden">
        <FaArrowLeft />
      </Link>
      <span className="py-2">{data?.dispute?.subject.subject}</span>
    </div>
  );
};

export default DisputeHeader;
