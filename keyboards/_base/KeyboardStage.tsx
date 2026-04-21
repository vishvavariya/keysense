'use client';

import React from 'react';
import { getModel } from './registry';
import { ModelProps } from './types';

interface KeyboardStageProps extends ModelProps {
  keyboardId: string;
}

export const KeyboardStage: React.FC<KeyboardStageProps> = ({ keyboardId, ...rest }) => {
  const model = getModel(keyboardId);
  if (!model) {
    return (
      <div className="flex items-center justify-center p-8 rounded-xl border border-white/10 text-white/40 text-sm">
        Keyboard model &quot;{keyboardId}&quot; not registered
      </div>
    );
  }
  const Component = model.Component;
  return <Component {...rest} />;
};
