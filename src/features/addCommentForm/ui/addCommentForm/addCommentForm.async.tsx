import { FC, lazy } from 'react';
import { addCommentFormProps } from './addCommentForm';

export const AddCommentFormAsync = lazy<FC<addCommentFormProps>>(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import('./addCommentForm')), 3000);
    }),
);
