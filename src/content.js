import React from 'react';

export default function Content({ className, ...props }) {
  return (
    <div className={['Content', className].join(' ')} {...props} />
  )
};
