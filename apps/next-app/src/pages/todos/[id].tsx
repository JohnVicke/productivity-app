import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import React from 'react';
import { useTodo } from '../../hooks/useTodo';

const Workout: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { data } = useTodo(id);

  return (
    <p>
      Title: {data?.title}, id: {data?.id}
    </p>
  );
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  if (!context?.params) {
    return { props: { error: 'error' } };
  }
  const { id } = context.params;
  return { props: { id } };
};

export default Workout;
