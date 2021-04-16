import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React from 'react'
import { supabase } from '../../common/initSupabase'
import type { User } from '../../common/types'
import UserData from '../../components/pre-interview/UserData'
import { Heading } from '@chakra-ui/react'
import isAdmin from '../../common/isAdmin'

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
