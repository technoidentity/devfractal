import { Heading } from '@chakra-ui/react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import type { User } from '../../common'
import { isAdmin, supabase } from '../../common'
import { UserData } from '../../components/pre-interview'

interface UserListProps {
  readonly userDetails: readonly User[]
}

export const getServerSideProps: GetServerSideProps<UserListProps> = async () => {
  const { data: userDetails } = await supabase
    .from('useranswers')
    .select(`email,score`)

  if (!userDetails) {
    return {
      notFound: true,
    }
  }
  return { props: { userDetails } }
}

const UserList: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userDetails }) => {
  if (userDetails && isAdmin()) {
    return <UserData userDetails={userDetails} />
  } else {
    return <Heading> Permission Denied</Heading>
  }
}

export default UserList
